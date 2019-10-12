import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import {
    Bucket,
    Storage,
    File,
    GetSignedUrlResponse,
    GetFileMetadataResponse,
} from '@google-cloud/storage';
import { FileDto, FileDetail } from './file.dto';
import { removeSync } from 'fs-extra';

@Injectable()
export class FileService {
    private readonly bucket: Bucket;

    constructor(configService: ConfigService) {
        const storage = new Storage({
            projectId: configService.gcloudProjectId,
            credentials: configService.gcloudAppCredentials,
        });
        this.bucket = storage.bucket(configService.gcloudBucketName);
    }

    async getFileUrl(name: string): Promise<FileDetail> {
        const file: File = this.bucket.file(name);
        const HOUR_IN_MSEC = 60 * 60 * 1000;
        const [
            { contentType },
        ]: GetFileMetadataResponse = await file.getMetadata();
        const [signedUrl]: GetSignedUrlResponse = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + HOUR_IN_MSEC,
        });
        return { contentType, signedUrl };
    }

    async uploadFile(name: string, file: FileDto) {
        await this.bucket.upload(file.path, {
            destination: name,
            contentType: file.mimetype,
            resumable: false,
        });
        removeSync(file.path);
    }
}
