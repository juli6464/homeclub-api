import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MediaService } from './media.service';
import { PropiedadInfo } from './entities/propiedad-info.entity';

@Controller('propiedades')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  create(@Body() data: PropiedadInfo) {
    return this.mediaService.create(data);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mediaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: Partial<PropiedadInfo>) {
    return this.mediaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mediaService.remove(id);
  }
}
