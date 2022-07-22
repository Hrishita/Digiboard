from decimal import Decimal
import os
import base64
import boto3
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

from logging.config import dictConfig

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://sys.stdout',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

app = Flask(__name__)
CORS(app)

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")

S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "digiboard-data")
S3_BUCKET_PASSPORT_FOLDER_NAME = os.getenv("S3_BUCKET_PASSPORT_FOLDER_NAME", "passport")
S3_BUCKET_CAPTURE_FOLDER_NAME = os.getenv("S3_BUCKET_CAPTURE_FOLDER_NAME", "capture")

REKOGNITION_SIMILARITY_THRESHOLD = int(os.getenv("REKOGNITION_SIMILARITY_THRESHOLD", 90))

DYNAMO_DB_TABLE_NAME = os.getenv("DYNAMO_DB_TABLE_NAME", "digiboard-data")

@app.route("/comparator", methods = ["GET"])
def hi():
  logging.info("/comparator route.")
  return "Comparator is working!"

@app.route("/comparator/compare", methods = ["POST"])
def start_process():
  logging.info("/comparator/compare route.")
  
  # Extract data from request payload as JSON
  json_payload = request.get_json()

  username = json_payload.get("username", None)
  if username is None:
    return jsonify({"error": "username is missing"}), 400

  tar_image = json_payload.get("target_image", None)
  if tar_image is None or tar_image == "":
    return jsonify({"error": "Image is missing. Send data URI for image"}), 400

  logging.info("Username: " + username)

  try:
    tar_image = base64.b64decode(tar_image.split(",", 1)[1])
    TARGET_IMAGE_KEY = S3_BUCKET_CAPTURE_FOLDER_NAME + "/" + username
    SOURCE_IMAGE_KEY = S3_BUCKET_PASSPORT_FOLDER_NAME + "/" + username

    # src_image = read_source_image_from_s3(SOURCE_IMAGE_KEY)
    # if src_image is None:
    #   return jsonify({"error": "Error while reading source image from S3"}), 500

    is_uploaded = upload_target_image_to_s3(TARGET_IMAGE_KEY, tar_image)
    if not is_uploaded:
      return jsonify({"error": "Error while uploading target image to S3"}), 500

    # compare_result = compare_images_with_bytes(src_image, tar_image)
    compare_result = compare_images_with_s3(SOURCE_IMAGE_KEY, TARGET_IMAGE_KEY)
    if compare_result is None:
      return jsonify({"error": "Error while comparing images"}), 500

    face_matched = compare_result.get("face_matched")
    similarity = compare_result.get("similarity")

    is_data_updated = update_data_in_dynamodb(username, similarity)
    if not is_data_updated:
      return jsonify({"error": "Error while updating data in DynamoDB"}), 500

    return jsonify({ "face_matched": face_matched, "similarity": similarity }), 200

  except Exception as e:
    logging.error("Exception: " + str(e))
    return jsonify({ "exception": str(e) }), 500

@app.route("/")
def home():
  logging.info("Comparator is ready to take requests!")
  return "Comparator is ready to take requests.", 200

def read_source_image_from_s3(key):
  try:
    s3_client = boto3.client(service_name="s3", region_name = AWS_REGION)
    
    response = s3_client.get_object(Bucket=S3_BUCKET_NAME, Key=key)
    file_content = response.get('Body').read()
    return file_content
  except Exception as e:
    logging.error("Exception while reading file from S3: " + str(e))
    return None

def upload_target_image_to_s3(key, file):
  try:
    s3_client = boto3.client(service_name="s3", region_name = AWS_REGION)

    # Write file on S3
    s3_client.put_object(Body=file, Bucket=S3_BUCKET_NAME, Key=key, ContentType='text/plain')
    logging.info("Uploaded target image to S3")
    return True

  except Exception as e:
    logging.error("Exception while uploading file to S3: " + str(e))
    return False

def compare_images_with_bytes(src_image, tar_image):
  try:
    rekognition_client = boto3.client(service_name="rekognition", region_name = AWS_REGION)
    
    logging.info("Hit AWS Rekognition API with bytes of images")
    response = rekognition_client.compare_faces(
      SourceImage={'Bytes': src_image},
      TargetImage={'Bytes': tar_image},
      SimilarityThreshold=REKOGNITION_SIMILARITY_THRESHOLD
    )
    face_matched = len(response['FaceMatches']) > 0

    similarity = 0
    if face_matched:
      similarity = response['FaceMatches'][0]['Similarity']

    data = { "face_matched": face_matched, "similarity": Decimal(similarity) }

    logging.info('Face matched: ' + str(face_matched))
    logging.info('Similarity: ' + str(similarity))

    return data
  except Exception as e:
    logging.error("Exception while comparing images with Rekognition: " + str(e))
    return None

def compare_images_with_s3(source_image_key, target_image_key):
  try:
    rekognition_client = boto3.client(service_name="rekognition", region_name=AWS_REGION)

    # S3 Object option
    source_image = { "S3Object": { "Bucket": S3_BUCKET_NAME, "Name": target_image_key }}
    target_image = { "S3Object": { "Bucket": S3_BUCKET_NAME, "Name": source_image_key }}

    logging.info("Hit AWS Rekognition API with s3 objects")
    response = rekognition_client.compare_faces(
      SimilarityThreshold=REKOGNITION_SIMILARITY_THRESHOLD,
      SourceImage=source_image,
      TargetImage=target_image
    )

    face_matched = len(response['FaceMatches']) > 0

    similarity = 0
    if face_matched:
      similarity = response['FaceMatches'][0]['Similarity']

    data = { "face_matched": face_matched, "similarity": Decimal(similarity) }

    logging.info('Face matched: ' + str(face_matched))
    logging.info('Similarity: ' + str(similarity))

    return data

  except Exception as e:
    logging.error("Exception while comparing images with Rekognition: " + str(e))
    return None

def update_data_in_dynamodb(username, similarity):
  try:
    dynamodb = boto3.resource('dynamodb', region_name=AWS_REGION)
    table = dynamodb.Table(DYNAMO_DB_TABLE_NAME)
    table.update_item(
      Key={'username': username},
      UpdateExpression="set rekognition_similarity_threshold = :rekognition_similarity_threshold, similarity = :similarity",
      ExpressionAttributeValues={
        ':rekognition_similarity_threshold': REKOGNITION_SIMILARITY_THRESHOLD,
        ':similarity': similarity
      }
    )
    logging.info("Updated data in DynamoDB.")
    return True
  except Exception as e:
    logging.error("Exception while updating data in DynamoDB: " + str(e))
    return False
