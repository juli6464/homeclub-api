import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropiedadInfo } from './entities/propiedad-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(PropiedadInfo, 'media')
    private readonly propiedadRepo: Repository<PropiedadInfo>,
  ) {}

  create(data: PropiedadInfo) {
    return this.propiedadRepo.save(data);
  }

  findAll() {
    return this.propiedadRepo.find();
  }

  findOne(id: number) {
    return this.propiedadRepo.findOneBy({ codigo_propiedad: id });
  }

  update(id: number, data: Partial<PropiedadInfo>) {
    return this.propiedadRepo.update(id, data);
  }

  remove(id: number) {
    return this.propiedadRepo.delete(id);
  }
}
