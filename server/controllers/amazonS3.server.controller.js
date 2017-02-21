const AWS = require('aws-sdk');
AWS.config.loadFromPath('./awsJsonConfig.json');
const s3 = new AWS.S3(),
    awsConfig = require('./../../awsConfig'),
    myBucket = awsConfig.bucket;

var bucketParams = {
    Bucket: myBucket
};
s3.createBucket(bucketParams);
const s3Bucket = new AWS.S3({
    params: {
        Bucket: myBucket
    }
});

function uploadImage(imageName, imageBody, imageType) {
    let params = {
        Key: imageName,
        Body: imageBody,
        ContentType: 'image/' + imageType,
        ACL: 'public-read'
    };
    s3Bucket.putObject(params, function(err, data) {
        if (err) {
            console.log('Error uploading data: ', data);
        } else {
            console.log('Succesfully uploaded the image!');
        }
    });
}

function makeUniqueString() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports = {
    upload(req, res) {
        let linkArray = [];
        let linkPrefix = 'https://s3-us-west-2.amazonaws.com/fox-briar-properties/';
        let photoArray = req.body;

        for (let i = 0; i < photoArray.length; i++) {
            let buffer = new Buffer(photoArray[i].imageBody.replace(/^data:image\/\w+;base64,/, ""), 'base64');
            let imageName = photoArray[i].imageName + makeUniqueString() + '.' + photoArray[i].imageExtension;

            uploadImage(imageName, buffer, photoArray[i].imageExtension);

            let linkName = linkPrefix + imageName;
            linkArray.push(linkName);
        }

        res.status(200).json(linkArray);
    }
}
