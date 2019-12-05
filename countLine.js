const fs = require('fs');

exports.countLine = function (file) {
  var s = fs.createReadStream(file);

  var lines = 0;

  s.on('data', function (buf) {
    lines += buf.toString().match(/\n/g).length;
  });

  s.on('end', function () {
    console.log(lines);
  });
}