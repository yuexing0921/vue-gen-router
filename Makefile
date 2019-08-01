export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: init dev  build buildTest buildPre clean genConfig genConfigPre

# 项目初始化
init:
	yarn

# 开发模式
dev:
	yarn run dev

# build到online环境
build:clean
	yarn run build


clean:
	rm -rf dist


