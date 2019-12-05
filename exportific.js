
const recast = require("recast")
const {
	identifier: id,
	expressionStatement,
	memberExpression,
	assignmentExpression,
	arrowFunctionExpression
} = recast.types.builders

const path = require('path')
var fs = require('fs');

const writeASTFile = function (ast, filename, rewriteMode) {
	const newCode = recast.print(ast).code
	if (!rewriteMode) {
		// 非覆盖模式下，将新文件写入*.export.js下
		filename = filename.split('.').slice(0, -1).concat(['export', 'js']).join('.')
	}
	// 将新代码写入文件
	fs.writeFileSync(path.join(process.cwd(), filename), newCode)
}

function runFile(path, transformer, options, rewriteMode) {
	fs.readFile(path, "utf-8", function (err, code) {
		if (err) {
			console.error(err);
			return;
		}
		transformer(recast.parse(code, options), function (ast) {
			writeASTFile(ast, path, rewriteMode)
		});
	});
}

function transformer(ast, callback) {
	// 用来保存遍历到的全部函数名
	let funcIds = []
	recast.visit(ast, {
		// 遍历所有的函数定义
		visitFunctionDeclaration(path) {
			//获取遍历到的函数名、参数、块级域
			const node = path.node
			const funcName = node.id
			const params = node.params
			const body = node.body

			// 保存函数名
			funcIds.push(funcName.name)
			// 这是上一步推导出来的ast结构体
			const rep = expressionStatement(assignmentExpression('=', memberExpression(id('exports'), funcName),
				arrowFunctionExpression(params, body)))
			// 将原来函数的ast结构体，替换成推导ast结构体
			path.replace(rep)
			// 停止遍历
			return false
		}
	})
	recast.types.visit(ast, {
		// 遍历所有的函数调用
		visitCallExpression(path) {
			const node = path.node;
			// 如果函数调用出现在函数定义中，则修改ast结构
			if (funcIds.includes(node.callee.name)) {
				node.callee = memberExpression(id('exports'), node.callee)
			}
			// 停止遍历
			return false
		}
	})
	callback && typeof callback === 'function' && callback(ast)
}

const writeFile = function (path, rewriteMode) {
	runFile(path, transformer, {}, rewriteMode)
}
module.exports = writeFile;