# Stage 1: Build Nuxt app with Bun
FROM oven/bun:1 AS build
WORKDIR /app

# Copy dependency files and install
#COPY package.json bun.lockb* ./
RUN bun install #--frozen-lockfile

# Copy source and build
COPY . .
ARG NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE}
RUN bun run build

# Stage 2: Run with Bun (Nuxt Nitro server)
FROM oven/bun:1
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV PORT=3000

COPY --from=build /app/.output /app/.output
EXPOSE 3000

# Run the Nitro server using Bun
CMD ["bun", ".output/server/index.mjs"]