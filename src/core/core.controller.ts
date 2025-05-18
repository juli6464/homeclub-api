import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { CoreService } from './core.service';
import { Apartamento } from './entities/apartamento.entity';

@Controller('apartamentos')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Post()
  create(@Body() dto: Partial<Apartamento>) {
    return this.coreService.create(dto);
  }

  @Get()
  findAll() {
    return this.coreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coreService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<Apartamento>) {
    return this.coreService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coreService.remove(id);
  }

  @Get('propiedades-cercanas')
  async propiedadesCercanas(@Query() query) {
  return this.coreService.listarPropiedadesCercanasSimple({
    lat: parseFloat(query.lat),
    lng: parseFloat(query.lng),
    tipo: query.tipo,
    min: query.min ? parseFloat(query.min) : undefined,
    max: query.max ? parseFloat(query.max) : undefined,
    page: query.page ? parseInt(query.page) : 1,
    limit: query.limit ? parseInt(query.limit) : 5,
  });
}
}
