#syntax=docker/dockerfile:1.4

####################
# Builder for dev  #
####################

# Stage 1
FROM node:20.15.0-alpine as dev

WORKDIR /app

ENV NODE_ENV development
ENV PORT 3000

COPY . .

RUN yarn install --frozen-lockfile --non-interactive

USER node

EXPOSE 3000

CMD ["yarn", "dev"]

####################
# Builder for prod #
####################

# Stage 1
FROM node:20.15.0-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY ./package.json ./
COPY prisma ./prisma/

RUN yarn install --frozen-lockfile --non-interactive

# Stage 2
FROM node:20.15.0-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY .env.prod .env

RUN NODE_ENV=production yarn run build

# Stage 3
FROM node:20.15.0-alpine AS prod

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder --chown=node:nodejs /app/.next/standalone ./
COPY --from=builder --chown=node:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=node:nodejs /app/public ./public
COPY --from=builder --chown=node:nodejs /app/prisma ./prisma

USER node

EXPOSE 3000

CMD ["node", "server.js"]