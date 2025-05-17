import {Controller, Get, Post, Body, Param, Put, Delete} from '@nestjs/common';
import { TarifaService } from './tarifa.service';
import { Tarifa } from './entities/tarifa.entity';

@Controller('tarifas')
export class TarifaController {
  constructor(private readonly tarifaService: TarifaService) {}

  @Post()
  create(@Body() dto: Partial<Tarifa>) {
    return this.tarifaService.create(dto);
  }

  @Get()
  findAll() {
    return this.tarifaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tarifaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<Tarifa>) {
    return this.tarifaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tarifaService.remove(+id);
  }
}
