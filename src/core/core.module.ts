import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartamento } from './entities/apartamento.entity';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { Tarifa } from './entities/tarifa.entity';
import { TarifaService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Apartamento, Tarifa], 'core')],
  providers: [CoreService, TarifaService],
  controllers: [CoreController, TarifaController],
})
export class CoreModule {}
