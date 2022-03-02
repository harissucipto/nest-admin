import { Response } from 'express';
export declare class UploadController {
    uploadFile(file: any): {
        url: string;
    };
    getImage(path: any, res: Response): Promise<void>;
}
