# Pipe-Stream Benchmark

Pipe-Stream benchmark written in TypeScript and runs on Deno.

```shell
deno run --allow-net benchmark.ts
```

#### Results

URL | PLATFORM | TTFB (MS) | TTD (MS) | SIZE (MB)
--- | -------- | --------- | -------- | ---------
small | ec2 | 113.38 | 197.09 | 3.33
small | cloudflare | 55.89 | 145.99 | 3.33
small | fastly_ts | 79.11 | 489.19 | 3.33
small | fastly_swift | 47.64 | 98.8 | 3.33
large | ec2 | 105.5 | 2125.9 | 69.79
large | cloudflare | 59.1 | 1894.2 | 69.79
large | fastly_ts | 65.5 | 8661.1 | 69.79
large | fastly_swift | 76 | 1257.4 | 69.79
