## 实战：用AST修改源码，导出全部方法

exportific.js

现在，我们想让这个文件中的函数改写成能够全部导出的形式，例如

```
function add (a, b) {
    return a + b
}
```
想改变为
```
exports.add = (a, b) => {
  return a + b
}
```
除了使用fs.read读取文件、正则匹配替换文本、fs.write写入文件这种笨拙的方式外，我们可以用AST优雅地解决问题。

###  用builders凭空实现一个键头函数;

```
#!/usr/bin/env node
const recast = require("recast");
const {
	identifier: id,
	expressionStatement,
	memberExpression,
	assignmentExpression,
	arrowFunctionExpression,
	blockStatement
} = recast.types.builders

recast.run(function (ast, printSource) {
	// 一个块级域 {}
	console.log('\n\nstep1:')
	printSource(blockStatement([]))

	// 一个箭头函数 () => {}
	console.log('\n\nstep2:')
	printSource(arrowFunctionExpression([], blockStatement([])))

	// add赋值为箭头函数 add = () => {}
	console.log('\n\nstep3:')
	printSource(assignmentExpression('=', id('add'), arrowFunctionExpression([], blockStatement([]))))

	// exports.add赋值为箭头函数 exports.add = () => {}
	console.log('\n\nstep4:')
	printSource(
		expressionStatement(
			assignmentExpression(
				'=',
				memberExpression(id('exports'), id('add')),
				arrowFunctionExpression([], blockStatement([])))
		)
	)
})
```