aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $1.dkr.ecr.us-east-1.amazonaws.com

# docker build -t digiboard-ui ./digiboard-ui/
docker tag digiboard-ui:latest $1.dkr.ecr.us-east-1.amazonaws.com/digiboard-ui:latest
docker push $1.dkr.ecr.us-east-1.amazonaws.com/digiboard-ui:latest

# docker build -t authenticator ./authenticator/
docker tag authenticator:latest $1.dkr.ecr.us-east-1.amazonaws.com/authenticator:latest
docker push $1.dkr.ecr.us-east-1.amazonaws.com/authenticator:latest

# docker build -t extractor ./extractor/
docker tag extractor:latest $1.dkr.ecr.us-east-1.amazonaws.com/extractor:latest
docker push $1.dkr.ecr.us-east-1.amazonaws.com/extractor:latest

# docker build -t comparator ./comparator/
docker tag comparator:latest $1.dkr.ecr.us-east-1.amazonaws.com/comparator:latest
docker push $1.dkr.ecr.us-east-1.amazonaws.com/comparator:latest
