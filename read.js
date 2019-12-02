#!/usr/bin/env node
const recast = require("recast")
const TNT = recast.types.namedTypes;

recast.run(function (ast, printSource){
	recast.visit(ast, {
		visitExpressionStatement: function(path) {
			// const node = path.node
			// 如果你想输出AST对象，可以 console.log(node)
			// 如果你想输出AST对象对应的源码， 可以printSource(node)

			const node = path.node
			const value = path.value
			// 判断是否为ExpressionStatement,正确则输出一行字
			// * TNT.node.check(), 判断类型是否一直，输出False/True
			if (TNT.ExpressionStatement.check(value)){
			 	printSource(node)
				console.log('这是一个ExpressionStatement')
			}
			// 判断是否为ExpressionStatement,正确不输出，错误则输出全局报错
			TNT.ExpressionStatement.assert(node)
			// traverse 横过，横越；穿过；横渡；
			this.traverse(path)
		}
	})
})

