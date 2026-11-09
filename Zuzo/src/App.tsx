import { useState, type FormEvent } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  function send(event: FormEvent) {
    event.preventDefault()
    if (!input.trim()) return

    setMessages([...messages, { role: 'user', content: input.trim() }])
    setInput('')
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