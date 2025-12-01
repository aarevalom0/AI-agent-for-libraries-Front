# Proyecto ISIS3710 – Configuración y Ejecución

Este proyecto contiene un **frontend**, **backend** y un **chat bot**. Debido a que los repositorios son privados, no es posible desplegar todo mediante un único `docker-compose`. Por lo tanto, cada componente debe ejecutarse de forma independiente.

---

## Frontend

1. Ubícate en la carpeta del frontend.
2. Ejecuta:

```bash
npm install
npm run dev -- -p 3001
```

> Esto levantará el frontend en `http://localhost:3001/es`.

---

## Backend

1. Ubícate en la carpeta del backend.
2. Ejecuta:

```bash
npm install
npm run start:dev
```

> Esto levantará el backend en `http://localhost:3000/api/v1`.

---

## Chat Bot (Docker)

1. En la carpeta del backend, ejecutar:

```bash
docker-compose up -d
```

> Esto levantará únicamente el servicio del chat bot. El intento de usar `docker-compose` para desplegar **frontend + backend + chat bot** no es posible debido a que los repositorios del frontend y otros servicios son privados.

---

## Notas

* Asegúrate de tener Node.js y npm instalados.
* Para el chat bot se requiere Docker y Docker Compose.
* Variables de entorno: revisa los archivos `.env` necesarios para backend y chat bot.
