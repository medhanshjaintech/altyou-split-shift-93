import { useState } from "react";
import { Bot, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}
interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}
const ChatArea = ({
  messages,
  onSendMessage
}: ChatAreaProps) => {
  const [inputMessage, setInputMessage] = useState("");
  const handleSend = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };
  return <div>
      <h2 className="text-2xl font-bold mb-2 text-white">Chat with content</h2>
      
      {messages.length > 0 ? <ScrollArea className="h-[400px] border rounded-md p-4 bg-neutral-900 mb-4">
          <div className="space-y-4">
            {messages.map((message, index) => <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-neutral-800 text-white"}`}>
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>)}
          </div>
        </ScrollArea> : <div className="h-[400px] border border-neutral-800 rounded-md flex items-center justify-center bg-neutral-900 mb-4">
          <div className="text-center">
            <Bot className="w-12 h-12 mx-auto mb-4 text-neutral-500" />
            <h3 className="text-lg font-medium mb-2 text-white">Start a conversation</h3>
            <p className="text-neutral-400 max-w-xs mx-auto">
              Select files from the sidebar and ask questions to chat with your content.
            </p>
          </div>
        </div>}

      <div className="flex items-center gap-3">
        <Input placeholder="Type your message..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} className="flex-1 border-neutral-700 bg-zinc-100" />
        <Button onClick={handleSend} className="text-zinc-50 bg-zinc-800 hover:bg-zinc-700">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>;
};
export default ChatArea;