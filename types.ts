export interface URLGroup {
  ec2: string
  cloudflare: string
  fastly: string
}

export type URLGroups = Record<'small' | 'large', URLGroup>

export interface BenchmarkResult {
  ttfb: number
  ttd: number
  bytes: number
}