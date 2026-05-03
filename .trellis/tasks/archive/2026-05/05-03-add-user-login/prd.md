# 新增用户登录功能

## Goal

在空白演示仓库中实现基于 Next.js + Auth.js + Prisma + PostgreSQL 的用户注册/登录功能。

## Requirements

- 用户可以使用邮箱+密码注册账号
- 用户可以登录（邮箱+密码）
- 登录后通过 session 维护登录状态
- 已登录用户可访问受保护页面，未登录用户重定向到登录页
- 提供基础的登录/注册前端页面

## Acceptance Criteria

- [ ] 用户注册流程可用（填写邮箱、密码→提交→创建用户→跳转登录）
- [ ] 用户登录流程可用（填写邮箱、密码→提交→创建 session→跳转首页）
- [ ] 未登录访问受保护页面时自动重定向到登录页
- [ ] 登录后可看到个人信息（如邮箱）

## Decided

- **项目类型**: Web 应用（全栈）
- **框架**: Next.js (App Router)
- **数据库**: PostgreSQL（`dev` 数据库，用户 `ryou`）
- **认证库**: Auth.js (NextAuth v5)
- **ORM**: Prisma

## MVP Scope

- 最小可用：邮箱+密码注册/登录 + session 管理

## Out of Scope (explicit)

- OAuth 第三方登录
- 密码重置/忘记密码
- 邮箱验证
- 角色/权限管理
- 登录失败次数限制
- 记住我功能

## Technical Approach

- Next.js App Router + Server Actions / API Routes 处理认证逻辑
- Auth.js Credentials Provider + JWT session 策略
- Prisma Schema 定义 User 模型，密码使用 bcrypt 哈希存储
- 页面：`/auth/login`、`/auth/register`、`/`（受保护首页）

## Technical Notes

- 当前仓库无任何现有代码，所有内容需从零搭建
- PostgreSQL 已就绪：数据库 `dev`，用户 `ryou`
