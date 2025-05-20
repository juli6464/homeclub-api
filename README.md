# 🏡 Homeclub API – Prueba Técnica

Este proyecto es una API RESTful desarrollada con **NestJS**, conectada a **dos bases de datos PostgreSQL**, que permite gestionar apartamentos y consultar propiedades cercanas según ubicación, tipo y precio. Además, calcula automáticamente los conceptos de pago según el tipo de apartamento.

---

## 📦 Tecnologías utilizadas

- NestJS
- Fastify
- TypeORM
- PostgreSQL (dos bases de datos: `homeclub_core` y `homeclub_media`)
- SQL geográfico (fórmula de Haversine)

---

## 🚀 Endpoints principales

### ✅ `GET /apartamentos/propiedades-cercanas`

Retorna un listado de propiedades activas ordenadas por cercanía, filtrando por tipo y precio, y calculando el precio estimado completo.

#### 🔗 URL de ejemplo

```
GET http://localhost:3000/apartamentos/propiedades-cercanas?lat=40.42&lng=-3.67&tipo=corporativo
```

#### 📌 Parámetros disponibles

| Parámetro  | Requerido | Descripción                                  |
|------------|-----------|----------------------------------------------|
| `lat`      | ✅         | Latitud actual del usuario                   |
| `lng`      | ✅         | Longitud actual del usuario                  |
| `tipo`     | ❌         | `'corporativo'` o `'turistico'`             |
| `min`      | ❌         | Precio mínimo (mensual o diario según tipo) |
| `max`      | ❌         | Precio máximo                                |
| `page`     | ❌         | Página actual (por defecto `1`)             |
| `limit`    | ❌         | Resultados por página (por defecto `5`)     |

#### 📤 Ejemplo de respuesta

```json
[
  {
    "codigo": 1,
    "nombre": "Apartamento Central",
    "tipo": "corporativo",
    "latitud": "40.421000",
    "longitud": "-3.670000",
    "dias": 10,
    "alquiler": 1000.00,
    "tasa_servicio": 30.00,
    "tarifa": 1030.00,
    "descripcion": "Apartamento moderno para ejecutivos",
    "url_imagen": "https://example.com/central.jpg"
  }
]
```

---

## 🧮 Cálculos automáticos

El backend aplica lógica de negocio según el tipo de apartamento:

### 🟦 Para **corporativo**:
- **Alquiler proporcional** mensual: `(tarifa * días) / 30`
- **Tasa de servicio**: 3% del alquiler
- **Total = alquiler + tasa**

### 🟨 Para **turístico**:
- **Alquiler diario**: `tarifa * días`
- **Tasa de reserva**: `100€` fija
- **Total = alquiler + tasa_reserva`

Los días se calculan como:  
```ts
dias = fecha_fin - fecha_inicio
```

---

## ⚙️ Configuración de base de datos

- Base de datos `homeclub_core`: apartamentos, tarifas
- Base de datos `homeclub_media`: descripciones e imágenes

Ambas están configuradas con `TypeOrmModule.forRoot()` en `app.module.ts` con nombres personalizados: `'core'` y `'media'`.

---

## 🧪 Cómo probar

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el proyecto:

```bash
npm run start:dev
```

3. Realiza una consulta:

```
GET /apartamentos/propiedades-cercanas?lat=40.42&lng=-3.67
```
