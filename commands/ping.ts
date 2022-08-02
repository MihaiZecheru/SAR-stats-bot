export function ping(latency: number): object {
  return { content: `pong: ${latency}ms` }
}
