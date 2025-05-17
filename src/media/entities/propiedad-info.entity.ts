import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class PropiedadInfo {
  @PrimaryColumn()
  codigo_propiedad: number;

  @Column('text')
  descripcion: string;

  @Column()
  url_imagen: string;
}
