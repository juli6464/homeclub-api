import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Apartamento } from './entities/apartamento.entity';
import { DataSource, Repository } from 'typeorm';
import { PropiedadInfo } from 'src/media/entities/propiedad-info.entity';

@Injectable()
export class CoreService {
  constructor(
    @InjectRepository(Apartamento, 'core')
    private readonly apartamentoRepo: Repository<Apartamento>,

    @InjectDataSource('core') // BD1 (homeclub_core)
    private readonly coreDS: DataSource,

    @InjectDataSource('media') // BD2 (homeclub_media)
    private readonly mediaDS: DataSource,
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

async listarPropiedadesCercanasSimple(query: {
  lat: number;
  lng: number;
  tipo?: 'corporativo' | 'turistico';
  min?: number;
  max?: number;
  dias?: number;
  page?: number;
  limit?: number;
}) {
  const { lat, lng, tipo, min, max, page, limit, dias } = query;
  const offset = (page - 1) * limit;
  const hoy = new Date().toISOString().split('T')[0];

  let sql = `
    SELECT a.id, a.nombre, a.latitud, a.longitud, a.tipo, t.precio,t.fecha_inicio, t.fecha_fin,
    (6371 * acos(
      cos(radians($1)) * cos(radians(a.latitud)) *
      cos(radians(a.longitud) - radians($2)) +
      sin(radians($1)) * sin(radians(a.latitud))
    )) AS distancia
    FROM apartamento a
    JOIN tarifa t ON t.apartamento_id = a.id
    WHERE a.estado = true
      AND t.fecha_inicio <= $3 AND t.fecha_fin >= $3
  `;

  const params = [lat, lng, hoy];

  if (tipo) {
    sql += ` AND a.tipo = $${params.length + 1}`;
    params.push(tipo);
  }

  if (min !== undefined && max !== undefined) {
    sql += ` AND t.precio BETWEEN $${params.length + 1} AND $${params.length + 2}`;
    params.push(min, max);
  }

  sql += ` ORDER BY distancia ASC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const resultado = await this.coreDS.query(sql, params);

  // buscar info en BD2
  const ids = resultado.map((r) => r.id);
  const propiedadRepo = this.mediaDS.getRepository(PropiedadInfo);
  const visuales = await propiedadRepo.findByIds(ids);

  return resultado.map((r) => {
    const visual = visuales.find(v => v.codigo_propiedad === r.id);

    // Cálculo de dias
    const fechaInicio = new Date(r.fecha_inicio);
    const fechaFin = new Date(r.fecha_fin);
    const dias = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24));

    const precio = parseFloat(r.precio);
    let tasa_servicio = null;
    let tasa_reserva = null;
    let total = 0;

    if (r.tipo?.toLowerCase() === 'corporativo') {
      tasa_servicio = precio * 0.03;
      total = precio + tasa_servicio;
    } else if (r.tipo?.toLowerCase() === 'turistico') {
      tasa_reserva = 100;
      total = precio + tasa_reserva;
    }

    return {
      codigo: r.id,
      nombre: r.nombre,
      tipo: r.tipo,
      latitud: r.latitud,
      longitud: r.longitud,
      dias,
      alquiler: parseFloat(precio.toFixed(2)),
      tasa_servicio: tasa_servicio ? parseFloat(tasa_servicio.toFixed(2)) : null,
      tasa_reserva: tasa_reserva ? parseFloat(tasa_reserva.toFixed(2)) : null,
      tarifa: parseFloat(total.toFixed(2)),
      descripcion: visual?.descripcion || null,
      url_imagen: visual?.url_imagen || null,
    };
  });
}

}
