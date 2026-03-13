# 部署指南

## 快速开始

### 本地开发

```bash
cd challenges-frontend-ts-next
npm install
npm run dev
```

访问 http://localhost:3000

### 生产构建

```bash
npm run build
npm start
```

### Docker 部署

```bash
# 构建镜像
docker build -t challenges-frontend-next:latest .

# 运行容器
docker run -p 3000:3000 challenges-frontend-next:latest

# 使用 docker-compose
docker-compose up -d
```

## Kubernetes 部署

### 使用 kubectl

```bash
# 应用部署
kubectl apply -f k8s-deployment.yaml

# 查看部署状态
kubectl get deployment challenges-frontend-next
kubectl get pods -l app=challenges-frontend-next
kubectl get svc challenges-frontend-next

# 查看日志
kubectl logs -f deployment/challenges-frontend-next

# 端口转发
kubectl port-forward svc/challenges-frontend-next 3000:80
```

### 使用 Kustomize

```bash
# 应用配置
kubectl apply -k .

# 查看生成的资源
kubectl kustomize .
```

## 配置说明

### 环境变量

在 `next.config.ts` 中配置 API 代理:

```typescript
async rewrites() {
  return [
    {
      source: '/challenges/:path*',
      destination: 'http://localhost:8080/challenges/:path*',
    },
    // ... 其他路由
  ];
}
```

### Kubernetes 资源

**Deployment**:
- 副本数: 2
- 镜像: challenges-frontend-next:latest
- 端口: 3000

**Service**:
- 类型: ClusterIP
- 端口: 80 → 3000

**HorizontalPodAutoscaler**:
- 最小副本: 2
- 最大副本: 5
- CPU 阈值: 70%
- 内存阈值: 80%

## 验证部署

### 健康检查

```bash
# Liveness Probe
curl http://localhost:3000/

# Readiness Probe
curl http://localhost:3000/
```

### 功能测试

1. 打开浏览器访问应用
2. 输入用户名和答案
3. 提交表单
4. 验证排行榜自动刷新

## 故障排除

### 容器无法启动

```bash
# 查看容器日志
docker logs <container-id>

# 或 Kubernetes
kubectl logs <pod-name>
```

### 应用无法连接后端

检查 `next.config.ts` 中的 API 代理配置:
- 确保后端服务 URL 正确
- 检查网络连接

### 内存不足

增加 Kubernetes 资源限制:

```yaml
resources:
  limits:
    memory: 1Gi
```

## 性能优化

### 构建优化

- 自动代码分割
- 树摇 (Tree shaking)
- 最小化
- 图片优化

### 运行时优化

- 静态生成 (SSG)
- 增量静态再生成 (ISR)
- 边缘运行时支持

## 安全配置

- 非 root 用户运行 (uid: 1001)
- 只读文件系统 (可选)
- 禁用特权升级
- 最小化容器能力

## 监控和日志

### 日志收集

```bash
# 查看实时日志
kubectl logs -f deployment/challenges-frontend-next

# 查看历史日志
kubectl logs deployment/challenges-frontend-next --tail=100
```

### 指标监控

使用 Prometheus 监控:
- 请求延迟
- 错误率
- 内存使用
- CPU 使用

## 升级和回滚

### 升级

```bash
# 更新镜像
kubectl set image deployment/challenges-frontend-next \
  challenges-frontend-next=challenges-frontend-next:v2

# 查看升级进度
kubectl rollout status deployment/challenges-frontend-next
```

### 回滚

```bash
# 查看历史版本
kubectl rollout history deployment/challenges-frontend-next

# 回滚到上一个版本
kubectl rollout undo deployment/challenges-frontend-next

# 回滚到特定版本
kubectl rollout undo deployment/challenges-frontend-next --to-revision=2
```

## 生产检查清单

- [ ] npm install 完成
- [ ] npm run type-check 通过
- [ ] npm run build 成功
- [ ] Docker 镜像构建成功
- [ ] 本地测试通过
- [ ] Kubernetes 配置验证
- [ ] 环境变量配置正确
- [ ] 资源限制设置合理
- [ ] 健康检查配置正确
- [ ] 日志收集配置完成
- [ ] 监控告警配置完成
- [ ] 备份和恢复计划制定

## 支持的浏览器

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 联系方式

如有问题，请查看:
- README.md - 项目概述
- IMPLEMENTATION.md - 实现细节
- VERIFICATION.md - 验证指南
