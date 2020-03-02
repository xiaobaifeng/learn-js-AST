# learn-js-AST

> 自定义的脚手架 wb

## 什么是 AST（抽象语法树）？

It is a hierarchical program representation that presents source code structure according to the grammar of a programming language, each AST node corresponds to an item of a source code.

它是一种分层的程序表示，根据编程语言的语法来表示源代码结构，每个 AST 节点对应一个源代码项。

## 学习资料

- [AST 抽象语法树](https://segmentfault.com/a/1190000016231512?utm_source=tag-newest#articleHeader0)
- [编程语言的实现，从 AST（抽象语法树）开始](https://baijiahao.baidu.com/s?id=1626159656211187310&wfr=spider&for=pc)
- [AST 在线编辑网站](https://astexplorer.net/)

## 安装

```
  npm install
```

## 使用

```
  npm link
  wb -h
```

`wb exportific -f demo.js` 把 function() {} 批量变成 () => {}
