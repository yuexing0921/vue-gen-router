## 自动生成router文件

通常情况下一个vue项目，随着时间的增加，router会越来越多，而大部分的代码其实都是重复的，修改很麻烦，还不如通过工具生成。

### 快速开始
```
bin/vue-gen-router -i example/router.yaml 
```
默认会在src/routers 目录下生成一个config.ts 的typescript的文件

#### cli 配置选项
- [x] [必选]-i yaml的加载文件
- [ ] [可选]-f 生成的router的文件名，默认是config.ts, 如果修改成xxx.js，则生成的就是js文件
- [ ] [可选]-o 生成的router的文件输出到那个文件夹，默认是src/routers

#### yaml 配置选项

参考example

> 具体参照官网 https://router.vuejs.org/zh/api/#routes

