# Pipe-Stream Benchmark

Pipe-Stream benchmark written in TypeScript and runs on Deno.

```shell
deno run --allow-net benchmark.ts
```

#### Results

URL | PLATFORM | TTFB (MS) | TTD (MS) | SIZE (MB)
--- | -------- | --------- | -------- | ---------
small | ec2 | 77.02 | 151.54 | 3.33
small | cloudflare | 61.98 | 130.88 | 3.33
small | fastly | 65.95 | 403.28 | 3.33
large | ec2 | 87.8 | 1750.9 | 69.79
large | cloudflare | 66.4 | 2101.6 | 69.79
large | fastly | 57.1 | 7012.1 | 69.79
