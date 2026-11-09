const OLLAMA_URL = 'http://localhost:11434/api/generate'
const MODEL = 'gemma3:1b'

export async function generate(prompt: string): Promise<string> {
  const response = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, stream: false }),
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error)

  return data.response
}