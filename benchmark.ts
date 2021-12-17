import { URLGroups, URLGroup, BenchmarkResult } from './types.ts'

async function benchmark(groups: URLGroups) {
  console.log('')
  console.log('URL | PLATFORM | TTFB | TTD | SIZE (MB)')
  console.log('--- | -------- | ---- | --- | ---------')

  await benchmarkGroup(groups, 'small', 'ec2', 100)
  await benchmarkGroup(groups, 'small', 'cloudflare', 100)
  await benchmarkGroup(groups, 'small', 'fastly', 100)

  await benchmarkGroup(groups, 'large', 'ec2', 10)
  await benchmarkGroup(groups, 'large', 'cloudflare', 10)
  await benchmarkGroup(groups, 'large', 'fastly', 10)

  console.log('')
}

async function benchmarkGroup(groups: URLGroups, sizeKey: keyof URLGroups, urlKey: keyof URLGroup, count: number) {
  const result = await benchmarkRequestAverage(groups[sizeKey][urlKey], count)
  console.log([sizeKey, urlKey, result.ttfb, result.ttd, megabytes(result.bytes).toFixed(2)].join(' | '))
}

async function benchmarkRequestAverage(url: string, count: number): Promise<BenchmarkResult> {
  const results: Array<BenchmarkResult> = []
  for (let i = 0; i < count; i += 1) {
    results.push(await benchmarkRequest(url))
  }
  return {
    ttfb: avg(results.map(result => result.ttfb)),
    ttd: avg(results.map(result => result.ttd)),
    bytes: avg(results.map(result => result.bytes))
  }
}

async function benchmarkRequest(url: string): Promise<BenchmarkResult> {
  const start = Date.now()
  const res = await fetch(url, { cache: 'no-cache', keepalive: true })
  const ttfb = Date.now() - start
  const buffer = await res.arrayBuffer()
  return {
    ttfb,
    ttd: Date.now() - start,
    bytes: buffer.byteLength
  }
}

function avg(values: Array<number>) {
  return values.reduce((total, value) => total + value, 0) / values.length
}

function megabytes(bytes: number): number {
  return bytes / Math.pow(10, 6)
}

benchmark({
  small: {
    ec2: 'https://pipe-stream-origin.barstoolsports.com/stream.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQzMDkyMDAwMDAsImV4cCI6MTYyNDM5NTYwMDAwMCwiZGF0YSI6eyJ1IjpbImh0dHBzOi8vY21zLW1lZGlhLWxpYnJhcnkuczMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vYmFyYmEvc3BsaXRGaWxlLXNlZ21lbnQtMDAwMC5tcDMiLCJodHRwczovL2Ntcy1tZWRpYS1saWJyYXJ5LnMzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2JhcmJhL3NwbGl0RmlsZS1zZWdtZW50LTAwMDEubXAzIiwiaHR0cHM6Ly9jbXMtbWVkaWEtbGlicmFyeS5zMy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS9iYXJiYS9zcGxpdEZpbGUtc2VnbWVudC0wMDAyLm1wMyJdLCJjIjoiYXVkaW8vbXBlZyJ9fQ.DNVLvhaI-7K7v5nFiFlikoH5JlpPpU6O1wXuiAS9S54',
    cloudflare: 'https://pipe-stream-workers.barstool.dev/stream.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQzMDkyMDAwMDAsImV4cCI6MTYyNDM5NTYwMDAwMCwiZGF0YSI6eyJ1IjpbImh0dHBzOi8vY21zLW1lZGlhLWxpYnJhcnkuczMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vYmFyYmEvc3BsaXRGaWxlLXNlZ21lbnQtMDAwMC5tcDMiLCJodHRwczovL2Ntcy1tZWRpYS1saWJyYXJ5LnMzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2JhcmJhL3NwbGl0RmlsZS1zZWdtZW50LTAwMDEubXAzIiwiaHR0cHM6Ly9jbXMtbWVkaWEtbGlicmFyeS5zMy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS9iYXJiYS9zcGxpdEZpbGUtc2VnbWVudC0wMDAyLm1wMyJdLCJjIjoiYXVkaW8vbXBlZyJ9fQ.hwtTWYf2aecgmveSVhPdhaEsz8A8LQax4aeXBEvtD50',
    fastly: 'https://pipe-stream-compute.barstool.dev/stream.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQzMDkyMDAwMDAsImV4cCI6MTYyNDM5NTYwMDAwMCwiZGF0YSI6eyJ1IjpbImh0dHBzOi8vY21zLW1lZGlhLWxpYnJhcnkuczMudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vYmFyYmEvc3BsaXRGaWxlLXNlZ21lbnQtMDAwMC5tcDMiLCJodHRwczovL2Ntcy1tZWRpYS1saWJyYXJ5LnMzLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tL2JhcmJhL3NwbGl0RmlsZS1zZWdtZW50LTAwMDEubXAzIiwiaHR0cHM6Ly9jbXMtbWVkaWEtbGlicmFyeS5zMy51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS9iYXJiYS9zcGxpdEZpbGUtc2VnbWVudC0wMDAyLm1wMyJdLCJjIjoiYXVkaW8vbXBlZyJ9fQ.hwtTWYf2aecgmveSVhPdhaEsz8A8LQax4aeXBEvtD50'
  },
  large: {
    ec2: 'https://pipe-stream-origin.barstoolsports.com/stream.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6MTAwMDAwMDAwMDAwLCJkYXRhIjp7InUiOlsiaHR0cHM6Ly9jbXMtbWVkaWEtbGlicmFyeS5zMy5hbWF6b25hd3MuY29tL3VuaW9uLzIwMjEvMDYvMjkvc2lsZW50c3RlcmVvLmZjOWZkZDJmLjk2cy5tcDMiLCJodHRwczovL2JhcnN0b29sLXBvZGNhc3RzLnMzLmFtYXpvbmF3cy5jb20vYmFyc3Rvb2wtc3BvcnRzL21pY2tzdGFwZS9kYW5hcmF0cy4yNTdhNjBkNjkyMzYuOTYuOTZzLm1wMyJdLCJjIjoiYXVkaW8vbXBlZyJ9fQ.m7eAJ6EhE1kA6gWlwVDaSjk7Klch-KT7mZTD-MF4AlQ&i=ef8db4ac-fa0b-45c1-8e20-e5715b7a7552',
    cloudflare: 'https://pipe-stream-workers.barstool.dev/stream.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6MTAwMDAwMDAwMDAwLCJkYXRhIjp7InUiOlsiaHR0cHM6Ly9jbXMtbWVkaWEtbGlicmFyeS5zMy5hbWF6b25hd3MuY29tL3VuaW9uLzIwMjEvMDYvMjkvc2lsZW50c3RlcmVvLmZjOWZkZDJmLjk2cy5tcDMiLCJodHRwczovL2JhcnN0b29sLXBvZGNhc3RzLnMzLmFtYXpvbmF3cy5jb20vYmFyc3Rvb2wtc3BvcnRzL21pY2tzdGFwZS9kYW5hcmF0cy4yNTdhNjBkNjkyMzYuOTYuOTZzLm1wMyJdLCJjIjoiYXVkaW8vbXBlZyJ9fQ.m7eAJ6EhE1kA6gWlwVDaSjk7Klch-KT7mZTD-MF4AlQ&i=ef8db4ac-fa0b-45c1-8e20-e5715b7a7552',
    fastly: 'https://pipe-stream-compute.barstool.dev/stream.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6MTAwMDAwMDAwMDAwLCJkYXRhIjp7InUiOlsiaHR0cHM6Ly9jbXMtbWVkaWEtbGlicmFyeS5zMy5hbWF6b25hd3MuY29tL3VuaW9uLzIwMjEvMDYvMjkvc2lsZW50c3RlcmVvLmZjOWZkZDJmLjk2cy5tcDMiLCJodHRwczovL2JhcnN0b29sLXBvZGNhc3RzLnMzLmFtYXpvbmF3cy5jb20vYmFyc3Rvb2wtc3BvcnRzL21pY2tzdGFwZS9kYW5hcmF0cy4yNTdhNjBkNjkyMzYuOTYuOTZzLm1wMyJdLCJjIjoiYXVkaW8vbXBlZyJ9fQ.m7eAJ6EhE1kA6gWlwVDaSjk7Klch-KT7mZTD-MF4AlQ&i=ef8db4ac-fa0b-45c1-8e20-e5715b7a7552'
  }
})