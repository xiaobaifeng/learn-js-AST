#!/usr/bin/env node

require('shelljs/global')

// exports.countLine = function() {...}
const { countLine } = require('../countLine')
// module.exports = writeFileFn
const writeFile = require('../exportific')

var argv = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('get <url>', 'make a get HTTP request', {}, function (argv) {
    console.log('request url: %s', argv.url)
  })
  .example('$0 get www.baidu.com', '请求api-url')
  .command('count', 'Count the lines in a file',
    function (yargs) {
      return yargs.option('f', {
        alias: 'file',
        describe: 'Load a file',
        nargs: 1
      })
        .help('h')
        .alias('h', 'help')
    },
    function (argv) {
      console.log('count the lines in %s', argv.file)
      countLine(argv.file)
    }
  )
  .example('$0 count -f foo.js', 'count the lines in the given file')
  .command(['exportific', 'ex'], 'exportific a file', function (yargs) {
    return yargs.option('f', {
      alias: 'file',
      describe: 'Load a file'
    })
      .boolean(['rewrite'])
      .help('h')
      .alias('h', 'help')
  }, function (argv) {
    console.log('exportific %s , rewrite is %s', argv.file || argv._[1], !!argv.cover)
    const filename = argv.file || argv._[1]
    // 这是一个使用 exec(执行 shelljs)的例子
    // exec('node ./exportific-rewrite.js ' + filename)
    writeFile(filename, !!argv.cover)
  })
  .example('$0 exportific foo.js', 'exportific the given file')
  .help('h')
  .alias('h', 'help')
  .alias('V', 'version')
  .epilog('copyright 2019')
  .argv;

