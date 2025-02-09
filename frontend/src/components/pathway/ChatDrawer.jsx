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
import { useIsMobile } from "../../hooks/use-mobile"

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
      <SheetContent side="right" className="flex sm:max-w-xl gap-0 items-center">
        <div className="h-full w-full flex flex-col">
          <SheetHeader>
            <SheetTitle>Chat Assistant</SheetTitle>
            <SheetDescription>Ask me anything about your pathway</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col flex-1">
            <ScrollArea className="flex-grow p-4 text-sm text-black">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 rounded-lg ${message.type === 'user'
                    ? 'bg-blue-500 text-black'
                    : 'bg-white text-black'
                    }`}>
                    {message.type === 'assistant'
                      ? formatGeminiResponse(message.content)
                      : message.content}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <SheetFooter className="flex flex-col sm:flex-col gap-2">
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
        </div>
      </SheetContent>
    </Sheet >
  )
}

export default ChatDrawer

const formatGeminiResponse = (text) => {
  if (!text) return null;

  // Split text into lines and process each line
  const lines = text.split('\n').filter(Boolean);

  const processLine = (line) => {
    // Clean up the line
    let cleanLine = line.trim();

    // Remove leading bullet point if present
    if (cleanLine.startsWith('*')) {
      cleanLine = cleanLine.substring(1).trim();
    }

    // Handle bold text (double asterisk)
    if (cleanLine.includes('**')) {
      const parts = cleanLine.split('**').filter(Boolean);

      // If line contains a colon, treat it as a header
      if (cleanLine.includes(':')) {
        const [header, ...rest] = cleanLine.split(':');
        const content = rest.join(':').trim();
        return (
          <div className="mb-3">
            <span className="font-bold text-gray-900">
              {header.replace(/\*\*/g, '').trim()}:
            </span>
            {content && (
              <span className="ml-2 text-gray-700">
                {content.replace(/\*\*/g, '').trim()}
              </span>
            )}
          </div>
        );
      }

      // Regular bold text
      return (
        <div className="mb-2">
          {parts.map((part, index) => (
            <span
              key={index}
              className={index % 2 === 1 ? "font-bold text-gray-900" : "text-gray-700"}
            >
              {part}
            </span>
          ))}
        </div>
      );
    }

    // Regular text
    return (
      <div className="mb-2 text-gray-700">
        {cleanLine}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {lines.map((line, index) => (
        <div
          key={index}
          className={`pl-4 ${line.trim().startsWith('*') ? 'border-l-2 border-gray-200' : ''}`}
        >
          {processLine(line)}
        </div>
      ))}
    </div>
  );
};

