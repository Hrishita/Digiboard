import boto3
import json
import os
import csv

TABLE_NAME = "digiboard-data"
OUTPUT_BUCKET = "digiboard-s3-bucket"
TEMP_FILENAME = '/tmp/report.csv'
OUTPUT_KEY = 'admin-report/report.csv'

s3_resource = boto3.resource('s3')
sns = boto3.client("sns", region_name="us-east-1")
dynamodb_resource = boto3.resource('dynamodb')
table = dynamodb_resource.Table(TABLE_NAME)

def lambda_handler(event, context):
    response = table.scan()

    keys = response['Items'][0].keys()
    print(keys)
    with open(TEMP_FILENAME, 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(response['Items'])
    
    # Upload temp file to S3
    s3_resource.Bucket(OUTPUT_BUCKET).upload_file(TEMP_FILENAME, OUTPUT_KEY)
 
    bucket = s3_resource.Bucket(OUTPUT_BUCKET)
   # obj = bucket.Object(OUTPUT_KEY)

    for obj in bucket.objects.all():
        url = f'https://{OUTPUT_BUCKET}.s3.amazonaws.com/{obj.key}'
        print(url)

    topic_arn= "arn:aws:sns:us-east-1:813278360641:digiboard-report-generation-topic"


    sns.publish(TopicArn=topic_arn, 
            Message="Hey Admin! The onboarding report is ready. Have a look by visiting the URL : "+url, 
            Subject="Report Generation Completed")
    
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": True,
            "content-type": "application/json"
        },
        'body': json.dumps('OK')
    }

