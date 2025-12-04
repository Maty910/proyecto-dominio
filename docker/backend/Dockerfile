FROM node:20-alpine

WORKDIR /app

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de configuración del workspace
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copiar package.json de todos los paquetes
COPY apps/backend/package.json ./apps/backend/
COPY domain/package.json ./domain/
COPY infrastructure/package.json ./infrastructure/

# Instalar TODAS las dependencias (sin frozen durante desarrollo)
RUN pnpm install --no-frozen-lockfile

# Copiar el código fuente completo
COPY . .

# Build de domain y verificar archivos .d.ts
RUN pnpm --filter @hotel/domain build
RUN echo "=== Contenido de domain/dist ===" && ls -la domain/dist/ && \
    echo "=== Verificando index.d.ts ===" && ls -la domain/dist/index.d.ts || echo "ERROR: No existe index.d.ts"

# Build de infrastructure
RUN pnpm --filter @hotel/infrastructure build  

# Build de backend
RUN pnpm --filter @hotel/backend build

# Verificar qué se generó y encontrar index.js
RUN echo "=== Buscando index.js ===" && find apps/backend/dist -name "index.js" -type f

EXPOSE 3000

# Ejecutar desde donde realmente está el archivo compilado
CMD ["node", "apps/backend/dist/apps/backend/src/index.js"]