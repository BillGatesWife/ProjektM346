import boto3
import sys
from PIL import Image
import io

# Initialisieren Sie den S3-Client
s3_client = boto3.client(
    's3',
    aws_access_key_id='IHR_ACCESS_KEY_ID',
    aws_secret_access_key='IHR_SECRET_ACCESS_KEY',
    region_name='IHR_REGION_CODE'
)

def resize_image(image_path, output_path):
    with Image.open(image_path) as image:
        image.thumbnail((800, 800))  # Beispiel für die neue Größe
        buffer = io.BytesIO()
        image.save(buffer, 'JPEG')  # Oder welches Format das Originalbild auch immer hat
        buffer.seek(0)
        s3_client.upload_fileobj(
            buffer,
            'IHR_VERKLEINERTER_BUCKET_NAME',
            output_path,
            ExtraArgs={'ContentType': 'image/jpeg', 'ACL': 'public-read'}
        )

if __name__ == '__main__':
    resize_image(sys.argv[1], sys.argv[2])
