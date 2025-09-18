# Stage 1: Build Nuxt app
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
# Ensure base URL can be overridden at build time
ARG NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_API_BASE=${NUXT_PUBLIC_API_BASE}
RUN yarn build

# Stage 2: Run with Node (Nuxt Nitro server)
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV PORT=3000
COPY --from=build /app/.output /app/.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]


