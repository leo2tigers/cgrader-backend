export class FileDto {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export class FileDetail {
    contentType: string;
    signedUrl: string;
}