import TestRpc from "../common/rpc/test"
const rpc = TestRpc.renderer()
const app = document.getElementById('app')!

const cpuDiv = document.createElement('div')
const logDiv = document.createElement('div')
const button = document.createElement('button')
app.appendChild(cpuDiv)
app.appendChild(button)
app.appendChild(logDiv)
logDiv.style.wordBreak = 'break-all'

button.innerText = 'calcPI'
button.onclick = async () => {
  let time = 0
  var timer = setInterval(() => {
    time++
    button.innerText = `calcPI (${time}s)`
  }, 1000)
  button.disabled = true
  const value = await rpc.invoke('calcPI')
  button.innerText = 'calcPI'
  logDiv.innerHTML += `calcPI: ${value}<br>`
  button.disabled = false
  clearInterval(timer)
}
rpc.handle('log', (...args) => {
  logDiv.innerHTML += `log: ${args.join(' ')}<br>`
})

rpc.on('cpu', usage => {
  cpuDiv.innerText = `CPU: ${Math.round(usage * 1000) / 10}%`
})