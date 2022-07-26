from doctest import OutputChecker
from lib2to3 import refactor
from urllib import response
from urllib.request import Request
from fastapi import FastAPI, HTTPException, Request, status
import requests
import os
import boto3
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TABLE_NAME = "digiboard-data"

client_id=  '65bjfhpbf90ljaetnt7jvfmpcd',

client = boto3.client('cognito-idp',
        region_name = 'us-east-1')

db_client = boto3.resource('dynamodb',
        region_name = 'us-east-1')

table = db_client.Table(TABLE_NAME)

#https://github.com/parisnakitakejser/video-tutorial-python-code

@app.get("/authenticator", status_code=status.HTTP_200_OK)
async def sign_up():
    return "Cognito container is working"

@app.post("/authenticator/sign-up")
async def sign_up_cognito(request: Request):
    try:
        print("Sign up request")
        response_dict = dict(await request.json())
        username = response_dict['email']
        password  =response_dict['password']

        response = client.sign_up(
            ClientId = '65bjfhpbf90ljaetnt7jvfmpcd',
            Username = username,
            Password = password,

        )
        print(response)
        # if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        #     print("Sign up successful")
        #     db_response = table.put_item(
        #         Item = {
        #             'username': response['UserSub'],
        #             'email': username
        #         }
        #     )
        #     print(db_response)
        #     return {'status': 'success', 'message': 'User created successfully','response':response}
        # else:
        #     return {'status': 'error', 'message': 'User creation failed','response':response}

    except Exception as e:
        print("Exception: ", e)
        raise HTTPException(status_code=400, detail=e)
        # return e
    
@app.post("/authenticator/confirm-code",status_code=status.HTTP_200_OK)
async def confirm_signup(request:Request):
    try:
        print("Confirm sign up request")
        response_dict = dict(await request.json())
        username = response_dict['email']
        confirm_code = response_dict.get('confirmation_code')
        print(confirm_code)
        response = client.confirm_sign_up(
            ClientId = '65bjfhpbf90ljaetnt7jvfmpcd',
            Username = username,
            ConfirmationCode = confirm_code

        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            print("Confirm sign up successful")
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}
    except Exception as e:
        print(e)
        return e

@app.post("/authenticator/forgot-password",status_code=status.HTTP_200_OK)
async def forgot_password(request:Request):
    try:
        print("Forgot password request")
        response_dict = dict(await request.json())
        username = response_dict['email']
        response = client.forgot_password(
            ClientId = '65bjfhpbf90ljaetnt7jvfmpcd',
            Username = username

        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}
    except Exception as e:
        print(e)
        return e

@app.post("/authenticator/confirm-forgot-password",status_code=status.HTTP_200_OK)
async def confirm_forgot_password(request:Request):
    try:
        print("Confirm forgot password request")
        response_dict = dict(await request.json())
        email = response_dict['email']
        print(email)
        password = response_dict['password']
        confirmation_code = response_dict['confirmation_code']
        
        response = client.confirm_forgot_password(
            ClientId = '65bjfhpbf90ljaetnt7jvfmpcd',
            Username = email,
            ConfirmationCode = confirmation_code,
            Password = password

        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}
    except Exception as e:
        print(e)
        return e

@app.post("/authenticator/login",status_code=status.HTTP_200_OK)
async def login(request:Request):
    try:
        print("Login request")
        response_dict = dict(await request.json())
        email = response_dict['email']
        password = response_dict['password']    
        response = client.initiate_auth(
            ClientId = '65bjfhpbf90ljaetnt7jvfmpcd',
            AuthFlow = 'USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME' : email,
                'PASSWORD' : password
            }
        
        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}
    except Exception as e:
        print(e)
        return e

