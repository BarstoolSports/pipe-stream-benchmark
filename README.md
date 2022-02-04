# Pipe-Stream Benchmark

Pipe-Stream benchmark written in TypeScript and runs on Deno.

```shell
deno run --allow-net benchmark.ts
```

#### Results

URL | PLATFORM | TTFB (MS) | TTD (MS) | SIZE (MB)
--- | -------- | --------- | -------- | ---------
small | ec2 | 85.53 | 159.61 | 3.33
small | cloudflare | 58.26 | 112.59 | 3.33
small | fastly_js | 87.92 | 136.72 | 3.33
small | fastly_swift | 46.91 | 94 | 3.33
large | ec2 | 59.6 | 1746.2 | 69.79
large | cloudflare | 64.1 | 1832.2 | 69.79
large | fastly_js | 63 | 1369.1 | 69.79
large | fastly_swift | 45.2 | 1193.6 | 69.79
