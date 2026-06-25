"use client"

import dynamic from "next/dynamic"

const ChatAssistant = dynamic(() => import("@/components/chat-assistant"), {
  ssr: false,
})

export default function ChatAssistantDynamic() {
  return <ChatAssistant />
}
