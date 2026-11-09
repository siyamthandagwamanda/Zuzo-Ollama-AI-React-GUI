import { useState, type FormEvent } from 'react'
import { generate } from './ollama'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [waiting, setWaiting] = useState(false)

  async function send(event: FormEvent) {
  event.preventDefault()
  if (!input.trim() || waiting) return // changed

  const history: Message[] = [...messages, { role: 'user', content: input.trim() }]
  setMessages(history)
  setInput('')
  setWaiting(true) // added

  try {
    const reply = await generate(history[history.length - 1].content)
    setMessages([...history, { role: 'assistant', content: reply }])
  } catch (error) {
    alert(error instanceof Error ? error.message : 'The reply failed.')
  } finally {
    setWaiting(false) // added
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

      {waiting && (
        <p role="status">
          <span className="spinner" aria-hidden="true" /> Waiting for reply
        </p>
      )}

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