// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();

// exports.handler = async (event, context) => {
//     const bucket = event.Records[0].s3.bucket.name;
//     const key = event.Records[0].s3.object.key;

//     if (key === 'AnimeImage/images.json') {
//     } else if (key.startsWith('AnimeImage/images/')) {

//         const params = { Bucket: bucket, Key: 'AnimeImage/images.json' };
//         let images = [];

//         try {
//             const data = await s3.getObject(params).promise();
//             images = JSON.parse(data.Body.toString('utf-8'));
//         } catch (error) {
//             images = [];
//         }

//         const fileName = key.substring(key.lastIndexOf('/') + 1);
//         const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
//         const fileSize = 'your size';

//         const newImageMetadata = {
//             Name: fileName,
//             Size: fileSize,
//             Type: fileType,
//         };

//         const existingImageIndex = images.findIndex(image => image.Name === newImageMetadata.Name);
//         if (existingImageIndex !== -1) {
//             images[existingImageIndex] = newImageMetadata;
//         } else {
//             images.push(newImageMetadata);
//         }

//         await s3.putObject({
//             Bucket: bucket,
//             Key: 'AnimeImage/images.json',
//             Body: JSON.stringify(images),
//             ContentType: 'application/json',
//         }).promise();
//     }

//     return 'Image processing complete.';
// };

const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const { S3 } = require("@aws-sdk/client-s3");

const s3 = new S3({
  credentials: fromIni({ profile: "ryomazen" }),
  region: "us-west-2",
});

exports.handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;

  if (key === 'AnimeImage/images.json') {
  } else if (key.startsWith('AnimeImage/images/')) {
    const params = {
      Bucket: bucket,
      Key: 'AnimeImage/images.json',
    };
    let images = [];

    try {
      const data = await s3.send(new GetObjectCommand(params));
      images = JSON.parse(data.Body.toString('utf-8'));
    } catch (error) {
      images = [];
    }

    const fileName = key.substring(key.lastIndexOf('/') + 1);
    const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);
    const fileSize = 'your size';

    const newImageMetadata = {
      Name: fileName,
      Size: fileSize,
      Type: fileType,
    };

    const existingImageIndex = images.findIndex(image => image.Name === newImageMetadata.Name);
    if (existingImageIndex !== -1) {
      images[existingImageIndex] = newImageMetadata;
    } else {
      images.push(newImageMetadata);
    }

    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: 'AnimeImage/images.json',
      Body: JSON.stringify(images),
      ContentType: 'application/json',
    }));
  }

  return 'Image processing complete.';
};
