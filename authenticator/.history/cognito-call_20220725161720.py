from doctest import OutputChecker
from lib2to3 import refactor
from urllib import response
from urllib.request import Request
from fastapi import FastAPI, Request, status
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

client_id=  '6pefv6hpf6agulgnf1tgbkrtfk',

client = boto3.client('cognito-idp',
        region_name = 'us-east-1')

db_client = boto3.resource('dynamodb',
        region_name = 'us-east-1')

table = db_client.Table(TABLE_NAME)

#https://github.com/parisnakitakejser/video-tutorial-python-code

@app.get("/", status_code=status.HTTP_200_OK)
async def sign_up():
    return "Cognito container is working"

@app.post("/authenticator/sign-up")
async def sign_up_cognito(request: Request):
    try:
        response_dict = dict(await request.json())
        username = response_dict['email']
        password  =response_dict['password']

        response = client.sign_up(
            ClientId = '6pefv6hpf6agulgnf1tgbkrtfk',
            Username = username,
            Password = password,

        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            db_response = table.put_item(
                Item = {
                    'username': response['UserSub'],
                    'email': username
                }
            )
            print(db_response)
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}

    except Exception as e:
        print(e)
        return e
    
@app.post("/authenticator/confirm-code")
async def confirm_signup(request:Request):
    try:
        response_dict = dict(await request.json())
        username = response_dict['email']
        confirm_code = response_dict.get('confirmation_code')
        print(confirm_code)
        response = client.confirm_sign_up(
            ClientId = '6pefv6hpf6agulgnf1tgbkrtfk',
            Username = username,
            ConfirmationCode = confirm_code

        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}
    except Exception as e:
        print(e)
        return e

@app.post("/authenticator/forgot-password")
async def forgot_password(request:Request):
    try:

        response_dict = dict(await request.json())
        username = response_dict['email']
        response = client.forgot_password(
            ClientId = '6pefv6hpf6agulgnf1tgbkrtfk',
            Username = username

        )
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {'status': 'success', 'message': 'User created successfully','response':response}
        else:
            return {'status': 'error', 'message': 'User creation failed','response':response}
    except Exception as e:
        print(e)
        return e

@app.post("/authenticator/confirm-forgot-password")
async def confirm_forgot_password(request:Request):
    try:
        response_dict = dict(await request.json())
        email = response_dict['email']
        print(email)
        password = response_dict['password']
        confirmation_code = response_dict['confirmation_code']
        
        response = client.confirm_forgot_password(
            ClientId = '6pefv6hpf6agulgnf1tgbkrtfk',
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

@app.post("/authenticator/login")
async def login(request:Request):
    try:
        response_dict = dict(await request.json())
        email = response_dict['email']
        password = response_dict['password']    
        response = client.initiate_auth(
            ClientId = '6pefv6hpf6agulgnf1tgbkrtfk',
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

