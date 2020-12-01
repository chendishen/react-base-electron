const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let mainWindow;

// const Datastore = require('nedb');
// let data_db = new Datastore({
//     filename: 'data.db',
//     autoload: true
// });

// github的解决方案，未测试
// const dbFactory = (fileName) => Datastore.create({
//     filename: (process.env.NODE_ENV === 'dev' ? `${__dirname}/..` : process.resourcesPath) + `/data/${fileName}`,
//     timestampData: true,
//     autoload: true
//     });


var initSqlJs = require('./public/js/sql-wasm.js')
var fs = require("fs");
var config = {
  // 指定加载sql-wasm.wasm文件的位置
  locateFile: filename => `./public/js/${filename}`
};
initSqlJs(config).then(SQL => {
  // 运行查询而不读取结果
  // 如果查询到了表已经存在，不重新创建该表和插入内容
  var db;
  var file = 'd.sqlite'; // Check that the file exists locally 
  if (!fs.existsSync(file)) {
    console.log("File not found");
    db = new SQL.Database();
    db.run("CREATE TABLE test (col1, col2);");
    // 插入两行：(1,111) and (2,222)
    db.run("INSERT INTO test VALUES (?,?), (?,?)", [1, 111, 2, 222]);
  } // The file *does* exist 
  else { // Read the file and do anything you want 
    console.log("File found");
    var filebuffer = fs.readFileSync(file);
    db = new SQL.Database(filebuffer);
  }

  // 将数据库导出到包含SQLite数据库文件的Uint8Array
  // export() 返回值: ( Uint8Array ) — SQLite3数据库文件的字节数组
  var data = db.export();
  // 由于安全性和可用性问题，不建议使用Buffer()和new Buffer()构造函数
  // 改用new Buffer.alloc()、Buffer.allocUnsafe()或Buffer.from()构造方法
  // var buffer = new Buffer(data);
  var buffer = Buffer.from(data, 'binary');
  // 被创建数据库名称
  var filename = "d.sqlite";
  fs.writeFileSync(filename, buffer);
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    }
  })
  // const urlLocation = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname,'./build/index.html')}`
  const urlLocation = isDev ? 'http://localhost:3000' : `file://${__dirname}/build/index.html`
  mainWindow.loadURL(urlLocation)
})