FROM python:3.9-alpine

WORKDIR /app
COPY requirements.txt ./
COPY app.py ./
COPY wsgi.py ./

RUN pip install -r requirements.txt
EXPOSE 5000

CMD [ "gunicorn", "--workers=5", "--threads=2", "--timeout", "120", "--keep-alive", "120" , "--bind", "0.0.0.0:5000", "wsgi:app" ]
# CMD [ "gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app" ]