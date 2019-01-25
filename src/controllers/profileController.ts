import { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import * as formidable from 'formidable';
import * as sharp from 'sharp';

const ORG_PATH = path.resolve(__dirname, '../../', 'uploads/profile/org');
const THUMB_PATH = path.resolve(__dirname, '../../', 'uploads/profile/thumb');

export class ProfileController {

  public profile(req: Request, res: Response, next: NextFunction) {

  }

  public updateProfile(req: Request, res: Response, next: NextFunction) {

  }

  public uploadPhoto(req, res: Response, next: NextFunction) {
    let MB = 1024 * 1024;
    let form = new formidable.IncomingForm();
    let fileName = '';
    form.maxFileSize = 100 * MB;//default maxFileSize is 200MB
    form.multiples = true;//default false
    form.parse(req);

    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        return res.status(400).json({
          status: 'error',
          message: part.filename + ' is not allowed.'
        })
      }
    }

    form.on('fileBegin', function (name, file) {
      const splitFileName = file.name.split('.');
      fileName = new Date().getTime().toString() + '.' + splitFileName[splitFileName.length - 1];
      file.path = ORG_PATH + '/' + fileName;
    });

    form.on('file', function (name, file) {
      sharp(file.path)
        .resize(200, 200)
        .toFile(THUMB_PATH + '/' + fileName, function (err) {
          if (err) {
            res.statusCode = 400;
            return next(err);
          }
          return res.status(200)
            .json({
              status: 'success',
              message: 'File uploaded successfully'
            });
        });
    });

    form.on('error', function () {
      throw new Error('There is some error. Please try after sometime.');
    });
  }

}
