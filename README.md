# blog-node
一个node 博客系统

理解一个网站的实现 从 0 到 1

# 启动

## MongoDB
```bash
docker-compose up -d
```
mongodb://root:123456@localhost:27017
内含 MongoDB gui 管理平台
http://localhost:8081/

## 初始化数据

##### 添加初始化数据

在`initdb`文件夹下新建json 文件
`install.sh` 内再执行导入命令即可

```bash
mongoimport -d $MONGO_INITDB_DATABASE -c blog_categor --file /docker-entrypoint-initdb.d/blog_categor.json --jsonArray
```

## node-blog
测试环境
```bash
yarn dev
```
正式环境
```bash
yarn prod
```

## gulp
```bash
yarn gulp:dev task
yarn gulp:pord task
```
