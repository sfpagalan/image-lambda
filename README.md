# Image Processing Lambda

This AWS Lambda function is designed to process and update image metadata in response to new image uploads to an S3 bucket. The Lambda function is triggered when an image is uploaded or modified in the specified S3 bucket. It then updates the `images.json` file with image metadata, including name, size, and type.

## How to Use the Lambda

1. **Set Up the S3 Bucket:**

   - Create an S3 bucket and configure it to trigger the Lambda function when images are uploaded or modified.
   - Ensure the S3 bucket has read permissions, allowing anyone to see the images/files in their browser.

2. **Upload Images:**

   - Upload image files of any size to the S3 bucket. The Lambda function will automatically process them.

3. **Triggering the Lambda:**

   - When an image is uploaded to the S3 bucket, the Lambda function is triggered.
   - It checks if the `images.json` file exists in the bucket.
   - If the file exists, it downloads the file and updates it with the metadata of the newly uploaded image. If the file does not exist, it creates a new `images.json` file and adds the metadata.

4. **Image Metadata:**

   - The Lambda function collects metadata for each image, including the image name, size, and type (e.g., JPEG, PNG).

5. **Images.json File:**

   - The Lambda function uploads the updated `images.json` file back to the S3 bucket. You can access the `images.json` file in the S3 bucket to view the metadata for all uploaded images.

## Deployment Issues

During the deployment of this Lambda function, you might encounter the following issues:

- **Configurations Overlap:** If you set up your S3 bucket to trigger the Lambda function on every file uploaded or modified, it will run the Lambda function every time the `images.json` file is re-uploaded, potentially causing an infinite loop. Ensure that the event trigger for the Lambda function is configured to run only on files with image extensions (e.g., jpg, png) to avoid this issue.

- **Endpoint Configuration:** When using AWS SDK v3, you may need to specify the correct endpoint for your S3 bucket if it's not automatically detected. If you encounter "PermanentRedirect" errors, ensure that the endpoint configuration in your Lambda function code matches your S3 bucket's endpoint.

## Images.json File

You can access the `images.json` file with image metadata [here](https://anime-image.s3.us-west-2.amazonaws.com/AnimeImage/).

For more information on how to use this Lambda function, refer to the code and documentation in this repository.
