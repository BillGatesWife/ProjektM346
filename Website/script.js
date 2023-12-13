document.querySelector('.upload-btn-wrapper input[type=file]').addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      // Update button text or perform other actions
      document.querySelector('.btn').textContent = this.files[0].name;
    }
  });
  
// Load the AWS SDK for JavaScript
var AWS = require('aws-sdk');

// Set the region
AWS.config.update({region: 'us-east-1'});

// Create an S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Set the bucket name and key
var bucketName = 'ImagesToResize';
var keyName = 'KEY';

// Create a new FormData object
var formData = new FormData();

// Add the file to the FormData object
formData.append('file', file);

// Upload the file to the S3 bucket
s3.upload({
    Bucket: bucketName,
    Key: keyName,
    Body: file,
    ACL: 'public-read'
}, function(err, data) {
    if (err) {
        console.log('Error uploading file:', err);
    } else {
        console.log('File uploaded successfully:', data.Location);
    }
});
