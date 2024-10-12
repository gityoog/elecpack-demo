import TestWorkerRpc from '../common/rpc/worker'
import Decimal from 'decimal.js'

function calcPI(n = 20) {
  Decimal.set({ precision: n + 2 })
  const one = new Decimal(1)
  const two = new Decimal(2)
  const four = new Decimal(4)
  let a = one
  let b = one.dividedBy(two.sqrt())
  let t = one.dividedBy(four)
  let p = one
  let pi = one
  for (let i = 0; i < n; i++) {
    const aNext = a.plus(b).dividedBy(two)
    const bNext = a.times(b).sqrt()
    const tNext = t.minus(p.times(a.minus(aNext).pow(2)))
    const pNext = two.times(p)
    const piNext = (a.plus(b).pow(2)).dividedBy(four.times(t))
    a = aNext
    b = bNext
    t = tNext
    p = pNext
    pi = piNext
  }
  return pi.toString()
}
const rpc = TestWorkerRpc.child()

rpc.handle('calcPI', () => {
  return calcPI(1000)
})