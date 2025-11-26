# ============================================
# BASE
# ============================================
FROM node:20 AS base
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY domain/package.json domain/
COPY infrastructure/package.json infrastructure/
COPY apps/backend/package.json apps/backend/
COPY apps/frontend/package.json apps/frontend/
RUN npm install -g pnpm

# ============================================
# DEPENDENCIES (instala TODAS)
# ============================================
FROM base AS deps
RUN pnpm install --no-frozen-lockfile

# ============================================
# BUILD
# ============================================
FROM deps AS build
COPY . .
RUN pnpm -r build

# ============================================
# RUNTIME BACKEND
# ============================================
FROM node:20 AS backend
WORKDIR /app

# Copiamos solo backend + dist de domain + dist de infra
COPY --from=build /app/apps/backend/dist apps/backend/dist
COPY --from=build /app/apps/backend/package.json apps/backend/

COPY --from=build /app/domain/dist domain/dist
COPY --from=build /app/domain/package.json domain/

COPY --from=build /app/infrastructure/dist infrastructure/dist
COPY --from=build /app/infrastructure/package.json infrastructure/

RUN npm install -g pnpm
RUN pnpm install --prod --filter @hotel/backend...

CMD ["node", "apps/backend/dist/index.js"]
