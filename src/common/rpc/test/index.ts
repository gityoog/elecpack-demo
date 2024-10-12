import ElectronRpcProtocol from 'some-rpc/electron'

const TestRpc = new ElectronRpcProtocol<{
  main: {
    log(...args: any[]): void
    cpu: [usage: number]
  },
  renderer: {
    calcPI: () => Promise<string>
  }
}>("test")

export default TestRpc