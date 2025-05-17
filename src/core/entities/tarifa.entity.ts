import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Apartamento } from './apartamento.entity';

@Entity()
export class Tarifa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apartamento_id: number;

  @ManyToOne(() => Apartamento)
  @JoinColumn({ name: 'apartamento_id' })
  apartamento: Apartamento;

  @Column({ type: 'date' })
  fecha_inicio: string;

  @Column({ type: 'date' })
  fecha_fin: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'enum', enum: ['mensual', 'diario'] })
  tipo: 'mensual' | 'diario';
}
