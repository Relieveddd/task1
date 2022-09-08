1, 新项目基于本 IAM Demo 继续开发.
2, 路由配置 path /VerfyUserWebCmd 为登录功能, 访问该路由配置即可跳转到 IAM 中心的登录页.
3, 在 IAM 中心登录后会跳转到 path /VerfyUserWebCmd 完成登录, 而后将获取到的 AccessToken 存放在 localStorage 中, Key 值为 "AccessToken".