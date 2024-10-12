import WorkerRpcProtocol from 'some-rpc/worker'
import ElecpackRuntime from 'elecpack/runtime'

const TestWorkerRpc = new WorkerRpcProtocol<{
  main: {
    calcPI: () => string
  },
  child: {}
}>(
  ElecpackRuntime.getFiles('test-worker')
)

export default TestWorkerRpc