# Pipe-Stream Benchmark

Pipe-Stream benchmark written in TypeScript and runs on Deno.

```shell
deno run --allow-net benchmark.ts
```

#### Results

URL | PLATFORM | TTFB (MS) | TTD (MS) | SIZE (MB)
--- | -------- | --------- | -------- | ---------
small | ec2 | 142.98 | 334.45 | 3.33
small | cloudflare | 48.83 | 110.95 | 3.33
small | fastly_js | 19.43 | 63.34 | 3.33
small | fastly_swift | 22.48 | 67.01 | 3.33
medium | ec2 | 184.2 | 1931.2 | 69.79
medium | cloudflare | 55.2 | 1359.1 | 69.79
medium | fastly_js | 19.5 | 954.2 | 69.79
medium | fastly_swift | 22.9 | 985 | 69.79
large | ec2 | 447.4 | 4356.8 | 162.25
large | cloudflare | 51.8 | 2976.2 | 162.25
large | fastly_js | 24.6 | 2307.6 | 162.25
large | fastly_swift | 45.3 | 2429.6 | 162.25
