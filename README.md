运行本项目步骤如下：
1.打开cmd，将位置定位到当前项目的根目录下
2.执行npm i或npm install命令下载项目所需依赖
3.执行完步骤2后执行run npm json:server启动本地数据库json server(否则网页中将有大量数据无法正常渲染出)
4.执行完步骤3后执行run npm dev启动项目
5.启动完成后在浏览器输入localhost:8080访问网站首页
6.至此整个项目运行完毕，可使用本项目所包含的各项功能

关于本项目用到的相关技术和知识点介绍将在实验报告中体现

项目github地址  https://hzd493.github.io/（注：必须打开本地数据库才可顺利渲染出网站中的数据、图片等，具体如上步骤3）

json-server的使用十分方便，本身提供的数据查询功能十分便捷，十分便于查看数据库中数据的动态改变。比如：

获取商品列表中id为1-12的集合
http://localhost:3000/goods?id_gte=1&id_lte=12

获取用户列表中id为1的用户
http://localhost:3000/users/1

在课程答辩过程中该网站发现的小bug也已修复：
1.购物车模块当前无商品选中时是不能进行结算的，原先的网站是可以进行结算的，但是商品不会缺失，修改后符合正常逻辑，有选中商品才会进入结算界面
2.选中所有商品结算以后，全选复选框应该自动置为false，原先的网站在结算后依旧为true，修改后符合正常逻辑
<!-- # mi-mall

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
 -->