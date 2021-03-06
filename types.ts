export interface URLGroup {
  ec2: string
  cloudflare: string
  fastly_js: string
  fastly_swift: string
}

export type URLGroups = Record<'small' | 'medium' | 'large', URLGroup>

export interface BenchmarkResult {
  ttfb: number
  ttd: number
  bytes: number
}