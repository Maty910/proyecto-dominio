FROM node:20-alpine AS base
ENV CI=true
WORKDIR /app

# CAMBIO: Usamos npm directo porque corepack está dando error 503 de red
RUN npm install -g pnpm

# -------------------------------------------------------
# Instalar deps
# -------------------------------------------------------
FROM base AS deps
COPY pnpm-workspace.yaml ./
COPY package.json pnpm-lock.yaml ./

COPY apps/backend/package.json apps/backend/
COPY domain/package.json domain/
COPY infrastructure/package.json infrastructure/

RUN pnpm install --no-frozen-lockfile
RUN pnpm add -D typescript --filter @hotel/backend

# -------------------------------------------------------
# Build
# -------------------------------------------------------
FROM deps AS build
COPY . .

# Fix infraestructura
RUN sed -i 's/"build": "tsc -p"/"build": "tsc -p ."/g' infrastructure/package.json || true

RUN pnpm --filter @hotel/domain build
RUN pnpm --filter @hotel/infrastructure build
RUN pnpm --filter @hotel/backend build

# -------------------------------------------------------
# Runtime
# -------------------------------------------------------
FROM node:20-alpine AS production
WORKDIR /app

# 1. Configuración
COPY --from=build /app/pnpm-workspace.yaml ./
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./

# 2. Package.json originales
COPY --from=build /app/apps/backend/package.json ./apps/backend/
COPY --from=build /app/domain/package.json ./domain/
COPY --from=build /app/infrastructure/package.json ./infrastructure/

# 3. Instalación básica (Usamos npm acá también para instalar pnpm)
RUN npm install -g pnpm
RUN pnpm install --prod --no-frozen-lockfile --filter @hotel/backend... --ignore-scripts

# 4. FIX DE EMERGENCIA (USANDO NPM)
RUN npm install uuid pg --no-save

# 5. Copia del backend
COPY --from=build /app/apps/backend/dist ./apps/backend/dist

# 6. OPERACIÓN INUNDACIÓN
# Domain
COPY --from=build /app/domain/package.json /app/node_modules/@hotel/domain/
COPY --from=build /app/domain/dist /app/node_modules/@hotel/domain/
COPY --from=build /app/domain/dist /app/node_modules/@hotel/domain/src/
# Infra
COPY --from=build /app/infrastructure/package.json /app/node_modules/@hotel/infrastructure/
COPY --from=build /app/infrastructure/dist /app/node_modules/@hotel/infrastructure/
RUN find /app/node_modules/@hotel/infrastructure -type d -name "repositories" -exec cp -r {} /app/node_modules/@hotel/infrastructure/ \; || true

EXPOSE 3000
CMD ["node", "apps/backend/dist/index.js"]