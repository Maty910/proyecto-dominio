# ============================================
# STAGE 1: Base
# ============================================
FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ============================================
# STAGE 2: Dependencies
# ============================================
FROM base AS dependencies

COPY apps/frontend/package.json ./apps/frontend/

WORKDIR /app/apps/frontend

RUN pnpm install --no-frozen-lockfile

# ============================================
# STAGE 3: Development
# ============================================
FROM dependencies AS development

WORKDIR /app

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]

# ============================================
# STAGE 4: Build
# ============================================
FROM dependencies AS build

WORKDIR /app

COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

RUN pnpm run build

# ============================================
# STAGE 5: Production
# ============================================
FROM nginx:alpine AS production

COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]