import { BrowserWindow, Menu, app, dialog, globalShortcut, session } from 'electron'
import ElecpackRuntime from 'elecpack/runtime'
import TestRpc from '../common/rpc/test'
import TestWorkerRpc from '../common/rpc/worker'

app.whenReady().then(async () => {
  session.defaultSession.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36')
  Menu.setApplicationMenu(null)
  globalShortcut.register('CommandOrControl+Shift+C', () => {
    BrowserWindow.getFocusedWindow()?.webContents.openDevTools()
  })
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: ElecpackRuntime.getPreload('index'),
      // for bytenode
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  const rpc = TestRpc.main(win.webContents)
  const workerRpc = TestWorkerRpc.main()
  rpc.handle('calcPI', () => {
    return workerRpc.invoke('calcPI')
  })
  await ElecpackRuntime.load({ name: 'index' }, win)
  rpc.invoke('log', 'Hello Elecpack from main')
  rpc.send('cpu', process.getCPUUsage().percentCPUUsage)
  const timer = setInterval(() => {
    rpc.send('cpu', process.getCPUUsage().percentCPUUsage)
  }, 1000)
  win.on('closed', () => {
    clearInterval(timer)
  })
})