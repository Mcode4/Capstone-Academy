import os
import uuid
import boto3

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f'https://{BUCKET_NAME}.s3.us-east-1.amazonaws.com'

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET")
)

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f'{unique_filename}.{ext}'

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                'ACL': acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        print('\n full error: ', e, '\n')
        return {"errors": str(e)}
    
    return {"url": f'{S3_LOCATION}/{file.filename}'}


def remove_file_from_s3(image_url):
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
            Bucket=BUCKET_NAME,
            Key=key
        )
    except Exception as e:
        return {"errors": str(e)}
    return True