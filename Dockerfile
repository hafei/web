# =============================================================================
# Kodus Web - Production Dockerfile (Runtime Environment Variables)
# =============================================================================
# 此 Dockerfile 支持运行时环境变量配置。
# 
# 关键特性：
# - layout.tsx 使用 force-dynamic 导出，确保每次请求都读取最新的 process.env
# - 无需在构建时传入环境变量，所有配置在运行时通过 env_file 或 environment 传入
#
# 构建命令：
#   docker build -t kodus-web:latest .
#
# 运行命令：
#   docker run -p 3000:3000 --env-file .env kodus-web:latest
# =============================================================================

# Base stage
FROM node:22.14.0-slim AS base
WORKDIR /usr/src/app

# Dependencies stage (cached)
FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build stage
FROM base AS build
WORKDIR /usr/src/app

# Copy dependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy source code
COPY . .

# Set build-time environment (minimal, most vars will be read at runtime)
ENV NODE_ENV=production

# Build the application
RUN yarn build

# Production stage - minimal runtime image
FROM node:22.14.0-slim AS runtime

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/yarn.lock ./

# Copy built application (includes .next which respects force-dynamic)
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/next.config.js ./

# Expose the Next.js port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start the application
CMD ["yarn", "start"]
