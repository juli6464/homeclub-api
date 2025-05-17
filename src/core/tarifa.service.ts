// src/core/tarifa.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarifa } from './entities/tarifa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TarifaService {
  constructor(
    @InjectRepository(Tarifa, 'core')
    private readonly tarifaRepo: Repository<Tarifa>,
  ) {}

  create(data: Partial<Tarifa>) {
    return this.tarifaRepo.save(data);
  }

  findAll() {
    return this.tarifaRepo.find({ relations: ['apartamento'] });
  }

  findOne(id: number) {
    return this.tarifaRepo.findOne({
      where: { id },
      relations: ['apartamento'],
    });
  }

  update(id: number, data: Partial<Tarifa>) {
    return this.tarifaRepo.update(id, data);
  }

  remove(id: number) {
    return this.tarifaRepo.delete(id);
  }
}
