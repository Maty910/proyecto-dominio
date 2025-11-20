# ============================================
# STAGE 1: Base - Dependencias comunes
# ============================================
FROM node:20-alpine AS base

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de configuración del workspace
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# ============================================
# STAGE 2: Dependencies - Instalar todas las dependencias
# ============================================
FROM base AS dependencies

# Copiar package.json de todos los workspaces
COPY domain/package.json ./domain/
COPY apps/backend/package.json ./apps/backend/
COPY infrastructure/package.json ./infrastructure/

# Instalar todas las dependencias
RUN pnpm install --frozen-lockfile

# ============================================
# STAGE 3: Development - Entorno de desarrollo con hot reload
# ============================================
FROM dependencies AS development

# Copiar código fuente (se montará como volumen en docker-compose)
COPY domain ./domain
COPY apps/backend ./apps/backend
COPY infrastructure ./infrastructure
COPY tsconfig.json ./

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["pnpm", "--filter", "@hotel/backend", "dev"]

# ============================================
# STAGE 4: Build - Compilar TypeScript
# ============================================
FROM dependencies AS build

# Copiar código fuente
COPY domain ./domain
COPY apps/backend ./apps/backend
COPY infrastructure ./infrastructure
COPY tsconfig.json ./

# Compilar TypeScript
RUN pnpm run build

# ============================================
# STAGE 5: Production - Imagen final optimizada
# ============================================
FROM node:20-alpine AS production

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar solo archivos necesarios
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/apps/backend/src/index.js"]