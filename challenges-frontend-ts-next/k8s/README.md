# Next.js前端部署说明

## 部署Next.js版本

```bash
# 方式1：使用kustomize部署
kubectl apply -k ./k8s

# 方式2：直接部署
kubectl apply -f ./k8s/deployment.yaml
```

## 卸载Next.js版本

```bash
kubectl delete -k ./k8s
```

## 访问方式

```bash
# Port Forward
kubectl port-forward -n microservices svc/challenges-frontend-next 3000:80
# 访问: http://localhost:3000
```

## 注意事项

- Next.js版本部署在 `microservices` namespace
- 镜像版本：`challenges-frontend-next:1.0`
- 默认部署的是 `challenges-frontend`（旧版本）
- 如需使用Next.js版本，从此目录部署即可
