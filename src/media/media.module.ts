import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropiedadInfo } from './entities/propiedad-info.entity';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PropiedadInfo], 'media'), 
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
