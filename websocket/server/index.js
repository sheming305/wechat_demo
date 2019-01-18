const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

// wss.on('connection', ws => {
//   ws.send('welcome')
// })
let stocks = { ruanmou: 100, tencent: 110, JD: 50 }
function randomInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
function randomStockUpdater () {
  for (let stock in stocks) {
    let randomValue = randomInterval(-50, 50) / 100
    stocks[stock] = (new Number(stocks[stock]) + randomValue).toFixed(2)
  }
  setTimeout(() => {
    randomStockUpdater()
  }, 2000)
}
randomStockUpdater()
wss.on('connection', ws => {
  setInterval(() => {
    ws.send(JSON.stringify(stocks))
    console.log('更新', JSON.stringify(stocks))
  }, 1000)
})
