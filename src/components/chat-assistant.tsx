"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, ChevronDown } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Hey! I'm the TapTempo Assistant. Ask me anything about the tools, features, or how to use the site.",
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [fabPos, setFabPos] = useState({ right: 24, bottom: 24 })
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<{
    startX: number
    startY: number
    startRight: number
    startBottom: number
    moved: boolean
  } | null>(null)

  const fabSize = 56
  const panelGap = 16

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  const startDrag = (clientX: number, clientY: number) => {
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      startRight: fabPos.right,
      startBottom: fabPos.bottom,
      moved: false,
    }
  }

  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragRef.current) return
    const dx = dragRef.current.startX - clientX
    const dy = dragRef.current.startY - clientY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true
    const margin = 24
    setFabPos({
      right: clamp(dragRef.current.startRight + dx, 0, window.innerWidth - fabSize - margin),
      bottom: clamp(dragRef.current.startBottom + dy, 0, window.innerHeight - fabSize - margin),
    })
  }

  const endDrag = () => {
    dragRef.current = null
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    startDrag(e.clientX, e.clientY)
    const onMove = (ev: MouseEvent) => moveDrag(ev.clientX, ev.clientY)
    const onUp = () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseup", onUp)
      endDrag()
    }
    document.addEventListener("mousemove", onMove)
    document.addEventListener("mouseup", onUp)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    startDrag(t.clientX, t.clientY)
    const onMove = (ev: TouchEvent) => moveDrag(ev.touches[0].clientX, ev.touches[0].clientY)
    const onEnd = () => {
      document.removeEventListener("touchmove", onMove)
      document.removeEventListener("touchend", onEnd)
      endDrag()
    }
    document.addEventListener("touchmove", onMove, { passive: true })
    document.addEventListener("touchend", onEnd)
  }

  const handleFabClick = () => {
    if (dragRef.current?.moved) return
    setOpen(!open)
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput("")
    const userMsg: Message = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setMessages((prev) => [...prev, { role: "assistant", content: "" }])
    setLoading(true)

    const apiMessages = [...messages, userMsg]

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok || !res.body) throw new Error("API error")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullContent = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: "assistant", content: fullContent }
          return next
        })
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (last?.role === "assistant" && last.content === "") {
          next[next.length - 1] = {
            role: "assistant",
            content: "Something went wrong. Please try again.",
          }
        }
        return next
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleFabClick}
        style={{
          position: "fixed",
          right: `${fabPos.right}px`,
          bottom: `${fabPos.bottom}px`,
          zIndex: 51,
        }}
        className="flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl active:cursor-grabbing"
        aria-label="Toggle chat assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              right: `${fabPos.right}px`,
              bottom: `${fabPos.bottom + fabSize + panelGap}px`,
              zIndex: 50,
              width: "380px",
              height: "600px",
              minWidth: "280px",
              minHeight: "400px",
              maxWidth: "calc(100vw - 2rem)",
              maxHeight: "calc(100vh - 8rem)",
              resize: "both",
              overflow: "hidden",
            }}
            className="flex flex-col rounded-2xl border bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">TapTempo Assistant</p>
                <p className="text-xs text-muted-foreground">Ask me anything about the site</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-5 py-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.content}
                      {loading && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                        <span className="ml-1 inline-flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                        </span>
                      )}
                      {loading && i === messages.length - 1 && msg.role === "assistant" && msg.content && (
                        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-current" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t p-4 pt-4">
              <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-1.5 transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about TapTempo..."
                  disabled={loading}
                  className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground/60"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
