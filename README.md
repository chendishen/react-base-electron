### npm install

.npmrc配置了ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/
electron-builder每次打包的时候会启用镜像下载

### npm run dev

仅会打开运行着react项目的桌面应用窗口，已配置
需要退出的时候ctrl+c

### npm run pack

prepack前进行打包，已配置

### mkdir -p public/js
### cp node_modules/sql.js/dist/sql-wasm.* public/js/

动态创建sqlite,在静态目录创建js文件夹，在node_modules里把sql-wasm拷贝到该文件夹,仅在首次需要执行该创建静态资源-拷贝sql.js命令。就不把这个上传到仓库了

## 非常温馨的提示

### 从零上手 electron 的惨痛经历，会让你在安装、打包等过程出现各种各样的问题，，但是需要知道的是，这最好不建议根据某种报错去单独寻找解决方案，最好的解决方案是：

# 科学上网