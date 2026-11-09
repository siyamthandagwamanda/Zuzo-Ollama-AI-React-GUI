export type Message = {
  role: 'user' | 'assistant'
  content: string
  duration?: number
  tokensPerSecond?: number
}