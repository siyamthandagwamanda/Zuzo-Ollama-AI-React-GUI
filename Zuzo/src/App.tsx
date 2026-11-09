import { useState, type FormEvent } from 'react'
import { generate } from './ollama'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  async function send(event: FormEvent) {
  event.preventDefault()
  if (!input.trim()) return

  const history: Message[] = [...messages, { role: 'user', content: input.trim() }]
  setMessages(history)
  setInput('')

  try {
    const reply = await generate(history[history.length - 1].content)
    setMessages([...history, { role: 'assistant', content: reply }])
  } catch (error) {
    alert(error instanceof Error ? error.message : 'The reply failed.')
  }
}

  return (
    <main>
      <h1>Zuzo</h1>

      {messages.map((message, index) => (
        <p key={index}>
          {message.role}: {message.content}
        </p>
      ))}

      <form onSubmit={send}>
        <input
          value={input}
          placeholder="Message Zuzo"
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  )
}