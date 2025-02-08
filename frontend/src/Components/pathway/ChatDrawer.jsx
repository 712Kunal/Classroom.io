"use client"

import { useState, useEffect } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { generateHelperResponse, initialiseChatSession } from "@/gemini/helper/gemini_helper"
import { useGlobal } from "../context/GlobalContext"
import { useParams } from "react-router-dom"
import { Trash2 } from "lucide-react"

const ChatDrawer = ({ children }) => {
  const [chatSession, setChatSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { pathwayId } = useParams()
  const { pathwaysList } = useGlobal()
  const pathway = pathwaysList.find((pathway) => pathway.data.id === pathwayId)

  useEffect(() => {
    const initChat = async () => {
      const session = await initialiseChatSession()
      setChatSession(session)
    }
    initChat()
  }, [])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatSession) return

    setIsLoading(true)
    setMessages((prev) => [...prev, { type: "user", content: inputMessage }])

    try {
      const { result } = await generateHelperResponse(chatSession, pathway, inputMessage)

      setMessages((prev) => [...prev, { type: "assistant", content: result }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          type: "error",
          content: "Sorry, there was an error generating the response.",
        },
      ])
    }

    setInputMessage("")
    setIsLoading(false)
  }

  const handleClearChat = () => {
    setMessages([])
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Chat Assistant</SheetTitle>
          <SheetDescription>Ask me anything about your pathway</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100vh-10rem)]">
          <ScrollArea className="flex-grow pr-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.type === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.type === "error"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </ScrollArea>
          <SheetFooter className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isLoading || !chatSession}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !chatSession}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={handleClearChat} className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)} className="w-full ml-2">
                Close Chat
              </Button>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ChatDrawer

