import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import fs from 'fs';

@Injectable()
export class CloudinaryService {
  cloudinaryService: any;
  constructor() {
    this.cloudinaryService = v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  removeTmp(path) {
    try {
      fs.unlink(path, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImageToCloudinary(file: any) {
    return await this.cloudinaryService.uploadImage(file).catch(async () => {
      try {
        const result = await this.cloudinaryService.uploader.upload(
          file.tempFilePath,
          {
            folder: 'pasal',
          },
        );
        this.removeTmp(file.tempFilePath);
        return result;
      } catch (error) {
        throw error;
      }
    });
  }

  async deleteImage(public_id: string) {
    try {
      return await this.cloudinaryService.uploader.destroy(public_id);
    } catch (error) {
      throw error;
    }
  }
}
