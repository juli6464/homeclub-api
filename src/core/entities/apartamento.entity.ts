import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Apartamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column({ type: 'enum', enum: ['corporativo', 'turistico'] })
  tipo: 'corporativo' | 'turistico';

  @Column()
  ciudad: string;

  @Column()
  pais: string;

  @Column('decimal', { precision: 10, scale: 6 })
  latitud: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitud: number;

  @Column({ default: true })
  estado: boolean;
}
