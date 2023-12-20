const express = require('express');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
const app = express();

// Middleware for parsing form data and file uploads
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', (req, res) => {
    // Extract AWS credentials from the form data
    const accessKeyId = req.body.accessKeyId;
    const secretAccessKey = req.body.secretAccessKey;

    if (!accessKeyId || !secretAccessKey) {
        return res.status(400).send('AWS credentials are missing.');
    }

    // Configure AWS with the provided credentials
    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: 'us-east-1' // Replace with your AWS region
    });

    const s3 = new AWS.S3();

    if (!req.files || !req.files.image) {
        return res.status(400).send('No image was uploaded.');
    }

    const image = req.files.image;
    const originalBucketName = 'ORIGINAL_BUCKET'; // Replace with your bucket name
    const uploadParams = {
        Bucket: originalBucketName,
        Key: `original/${Date.now()}_${image.name}`,
        Body: image.data,
        ContentType: image.mimetype,
        ACL: 'public-read'
    };

    // Upload the original image to S3
    s3.upload(uploadParams, (err, data) => {
        if (err) {
            console.error('Error uploading to S3:', err);
            return res.status(500).send(err.message);
        }

        TODO:  
        // Add logic to resize the image and upload to a separate bucket
        // You would typically call a Python script or another service to handle resizing

        res.send({ message: 'Image uploaded successfully!', data });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
