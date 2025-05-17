import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaModule } from './media/media.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [
    // Conexión a BD1: homeclub_core
    TypeOrmModule.forRoot({
      name: 'core',
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'posgre',
      database: 'homeclub_core',
      autoLoadEntities: true,
      synchronize: false,
    }),
    // Conexión a BD2: homeclub_media
    TypeOrmModule.forRoot({
      name: 'media',
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'posgre',
      database: 'homeclub_media',
      autoLoadEntities: true,
      synchronize: false,
    }),
    CoreModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
