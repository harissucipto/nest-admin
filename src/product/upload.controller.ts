import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/posix';
import { Response } from 'express';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename(_, file, cb) {
          const randomName = Array(16)
            .fill(null)
            .map(() => (Math.random() * 16) | 0)
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file) {
    return {
      url: `http://localhost:8000/api/${file.path}`,
    };
  }

  @Get('uploads/:path')
  async getImage(@Param('path') path, @Res() res: Response) {
    return res.sendFile(path, { root: 'uploads' });
  }
}
