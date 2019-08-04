export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: init dev  build clean

# 项目初始化
init:
	yarn

# 开发模式
dev:init
	yarn run dev

# build到online环境
build:clean
	yarn run build

clean:
	rm -rf dist


publish:
	npm version patch
	npm publish --access public