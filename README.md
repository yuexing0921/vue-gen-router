## 自动生成router文件

通常情况下一个vue项目，随着时间的增加，router会越来越多，而大部分的代码其实都是重复的，修改很麻烦，还不如通过工具生成。

### 快速开始

``` 
// 为package.json添加依赖
yarn add --dev vue-gen-router

// 查看例子
node_modules/.bin/vue-gen-router -i example/router.yaml 
```
默认会在src/routers 目录下生成一个config.tsx 的typescript的文件

参考例子中文件夹下的example/router.yaml，建立自己的router.yaml，基本上和之前写vue-router时没有多大区别

#### yaml 配置选项参考vue-router

参考example

> 具体参照官网 https://router.vuejs.org/zh/api/#routes



#### cli 配置选项
- [x] [必选]-i yaml的加载文件
- [ ] [可选]-f 生成的router的文件名，默认是config.tsx, 如果修改成xxx.js，则生成的就是js文件
- [ ] [可选]-o 生成的router的文件输出到那个文件夹，默认是src/routers


