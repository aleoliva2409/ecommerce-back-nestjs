import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';

import { Image } from '../entities';

export class ImagesService {
  constructor(
    @InjectRepository(Image) private readonly imagesRepository: Repository<Image>,
  ) {}

  async findAll(): Promise<string> {
    //TODO: pasarlo a base 64 al file para mandarlo a cloudinary(hacerlo como FH o stackoverflow)
    const file = await cloudinary.uploader.upload('images');

    // TODO: VER LO DE LOS PRESETS PARA MANDARLO A UNA CARPETA ESPECIFICA
    // const file = await cloudinary.uploader.upload('images', { upload_preset: 'front-courses-journal-app' });

    //TODO: guardar en db
    return file.secure_url;
  }

  //TODO: agregar upload y remove para las imagenes(usar cloudinary)
}
