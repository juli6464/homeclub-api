import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartamento } from './entities/apartamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoreService {
  constructor(
    @InjectRepository(Apartamento, 'core')
    private readonly apartamentoRepo: Repository<Apartamento>,
  ) {}

  create(data: Partial<Apartamento>) {
    return this.apartamentoRepo.save(data);
  }

  findAll() {
    return this.apartamentoRepo.find();
  }

  findOne(id: number) {
    return this.apartamentoRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<Apartamento>) {
    return this.apartamentoRepo.update(id, data);
  }

  remove(id: number) {
    return this.apartamentoRepo.delete(id);
  }
}
