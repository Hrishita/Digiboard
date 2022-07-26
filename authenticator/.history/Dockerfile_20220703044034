FROM python:3.8-slim
 
WORKDIR /code

COPY . .

RUN apt-get update \
    && apt-get clean

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


CMD [ "uvicorn", "cognito-call:app", "--reload", "--host", "0.0.0.0", "--port", "5001" ]
