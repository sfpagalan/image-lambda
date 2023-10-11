const AWS = require('aws-sdk-mock');
const lambda = require('./index');

describe('Image Processing Lambda', () => {
    beforeAll(() => {
        AWS.mock('S3', 'getObject', (params, callback) => {
            callback({ code: 'NoSuchKey' }, null);
        });

        AWS.mock('S3', 'putObject', (params, callback) => {
            callback(null, {});
        });
    });

    afterAll(() => {
        AWS.restore('S3', 'getObject');
        AWS.restore('S3', 'putObject');
    });

    it('should process and update image metadata when "images.json" does not exist', async () => {
        const event = {
            Records: [
                {
                    s3: {
                        bucket: {
                            name: 'your-bucket-name',
                        },
                        object: {
                            key: 'AnimeImage/images/TensuraSlimeDiaries.webp',
                        },
                    },
                },
            ],
        };

        const result = await lambda.handler(event, null);

        expect(result).toBe('Image processing complete.');
    });

    it('should process and update image metadata when "images.json" exists', async () => {
        AWS.remock('S3', 'getObject', (params, callback) => {
            callback(null, {
                Body: JSON.stringify([
                    {
                        Name: 'TensuraSlimeDiaries.webp',
                        Size: 'your size',
                        Type: 'webp',
                    },
                ]),
            });
        });

        const event = {
            Records: [
                {
                    s3: {
                        bucket: {
                            name: 'your-bucket-name',
                        },
                        object: {
                            key: 'AnimeImage/images/TensuraSlimeDiaries.webp',
                        },
                    },
                },
            ],
        };

        const result = await lambda.handler(event, null);

        expect(result).toBe('Image processing complete.');
    });
});
