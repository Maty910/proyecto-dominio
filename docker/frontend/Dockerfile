# ============================================
# STAGE 1: Base
# ============================================
FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiamos el workspace entero (pero sin node_modules)
COPY . .

# ============================================
# STAGE 2: Dependencies
# ============================================
FROM base AS dependencies

ENV CI=true

# Instalar solo las dependencias del frontend
RUN pnpm install --filter frontend --workspace-root

# ============================================
# STAGE 3: Development
# ============================================
FROM dependencies AS development

WORKDIR /app

EXPOSE 5173

CMD ["pnpm", "--filter", "frontend", "dev", "--host", "0.0.0.0"]

# ============================================
# STAGE 4: Build
# ============================================
FROM dependencies AS build

RUN pnpm --filter frontend build

# ============================================
# STAGE 5: Production
# ============================================
FROM nginx:alpine AS production

COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]