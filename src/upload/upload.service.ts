import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  saveFile(file: Express.Multer.File) {
    // Implement your file saving logic here
    console.log(file);
    return { message: 'File uploaded successfully', filename: file.originalname };
  }
}
