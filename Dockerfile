FROM oven/bun:debian as builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build
RUN tar -czf next-dist.tar.gz ./.next

FROM oven/bun:slim

WORKDIR /app

COPY --from=builder /app/next-dist.tar.gz /app/next-dist.tar.gz
COPY --from=builder /app/bun.lockb /app/bun.lockb
COPY ./entrypoint.sh ./entrypoint.sh
COPY ./public/ ./public/
COPY ./package.json ./package.json

ENTRYPOINT ["./entrypoint.sh"]
