const vm = require('vm');
const fs = require('fs');


const { Writable } = require('stream');

// 创建一个可写流来捕获输出
class MyStream extends Writable {
    constructor(options) {
        super(options);
        this.data = '';
    }

    _write(chunk, encoding, callback) {
        this.data += chunk.toString();
        callback();
    }
}

// 实例化一个可写流
const myStream = new MyStream();

const context = vm.createContext({
    console: new console.Console(myStream, myStream)
});

[
    './mine/lib/run.js',
    './mine/tests/assets.target.js'
].map(p => fs.readFileSync(p))
    .map(e => new vm.Script(e))
    .forEach(s => s.runInContext(context))

let result = new vm.Script(`entry(${JSON.stringify({ ex: 1 })});`).runInContext(context);
console.log(JSON.stringify(result))

for (; result.next >= 0;) {
    result = new vm.Script(`entry(${JSON.stringify({ next: result.next, sent: { code: 200 }, env: result.env })});`).runInContext(context);
    console.log(JSON.stringify(result))
}

// 等待数据写入流中
process.nextTick(() => {
    // 输出捕获到的日志
    console.log(myStream.data); // 输出: Hello from VM!
});

