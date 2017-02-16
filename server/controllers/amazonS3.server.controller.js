const AWS = require('aws-sdk'),
    s3 = new AWS.S3(),
    awsConfig = require('./../../awsConfig');

const myBucket = awsConfig.bucket;
const myKey = awsConfig.accessKey;


module.exports = {
    upload(req, res) {
      console.log('Body', req.body);
        // s3.createBucket({
        //     Bucket: myBucket
        // }, function(err, data) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         params = {
        //             Bucket: myBucket,
        //             Key: myKey,
        //             Body: 'Hello!'
        //         };
        //
        //         s3.putObject(params, function(err, data) {
        //             if (err) {
        //                 console.log(err)
        //             } else {
        //                 console.log("Successfully uploaded data to myBucket/myKey");
        //             }
        //         });
        //     }
        // });
        res.status(200).send('File(s) uploaded successfully');
    }
}
