import type { Message } from './types'

const OLLAMA_URL = 'http://localhost:11434/api/generate'
const MODEL = 'gemma3:1b'

export async function generate(prompt: string): Promise<Message> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, stream: false }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error)

  return {
    role: 'assistant',
    content: data.response,
    duration: data.total_duration / 1e9,
    tokensPerSecond: data.eval_count / (data.eval_duration / 1e9),
  }
}