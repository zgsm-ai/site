FROM --platform=$BUILDPLATFORM node:18.19.0 AS builder

WORKDIR /workshop

# 启用 corepack（自动启用 pnpm）
RUN corepack enable

# 配置国内源（可选）
RUN npm config set registry https://registry.npmmirror.com/

COPY package.json pnpm-lock.yaml ./

# 使用 pnpm 安装依赖
RUN pnpm install --frozen-lockfile

COPY . .

# 构建前端
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm run build


# ----------------------------
# 第二阶段：使用 Nginx 部署静态文件
# ----------------------------
FROM --platform=$BUILDPLATFORM nginx:stable-alpine AS runner

# RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# 拷贝编译产物到 nginx
COPY --from=builder /workshop/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
