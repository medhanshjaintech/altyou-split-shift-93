
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";
import ChatArea from "@/components/ChatArea";
import PersonaSelector from "@/components/PersonaSelector";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
}

interface KnowledgeFile {
  id: string;
  name: string;
  type: "transcription" | "upload";
  selected: boolean;
}

const KnowledgeBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePersona, setActivePersona] = useState<string | null>(null);
  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([
    { id: "1", name: "Interview Transcript.txt", type: "transcription", selected: false },
    { id: "2", name: "Product Demo.mp3", type: "transcription", selected: false },
    { id: "3", name: "Marketing Plan.pdf", type: "upload", selected: false },
    { id: "4", name: "Sales Pitch.docx", type: "upload", selected: false },
    { id: "5", name: "Team Meeting.txt", type: "transcription", selected: false },
    { id: "6", name: "Research Notes.pdf", type: "upload", selected: false },
  ]);

  const personas: Persona[] = [
    {
      id: "tech-guru",
      name: "Tech Guru",
      description: "Technology expert with deep knowledge of latest trends",
      avatar: "/placeholder.svg"
    },
    {
      id: "marketing-expert",
      name: "Marketing Expert",
      description: "Marketing specialist with insights on growth strategies",
      avatar: "/placeholder.svg"
    },
    {
      id: "content-creator",
      name: "Content Creator",
      description: "Creative specialist for engaging content development",
      avatar: "/placeholder.svg"
    },
    {
      id: "business-coach",
      name: "Business Coach",
      description: "Strategic advisor for business growth and development",
      avatar: "/placeholder.svg"
    },
  ];

  const handleSendMessage = (message: string) => {
    const newUserMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const selectedFiles = knowledgeFiles.filter(file => file.selected);
      const fileNames = selectedFiles.map(file => file.name).join(", ");
      
      const botResponse = activePersona
        ? `Response as ${personas.find(p => p.id === activePersona)?.name} based on ${selectedFiles.length ? fileNames : "general knowledge"}`
        : `Response based on ${selectedFiles.length ? fileNames : "general knowledge"}`;

      const newBotMessage: Message = {
        role: "bot",
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  const toggleFileSelection = (fileId: string) => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const selectAllFiles = () => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: true }))
    );
  };

  const deselectAllFiles = () => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: false }))
    );
  };

  const handlePersonaSelect = (personaId: string) => {
    setActivePersona(personaId === activePersona ? null : personaId);
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <SidebarProvider defaultOpen={true}>
        <KnowledgeSidebar 
          files={knowledgeFiles}
          onToggleFile={toggleFileSelection}
          onSelectAll={selectAllFiles}
          onDeselectAll={deselectAllFiles}
        />

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Knowledge Bot</h1>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            
            <div className="mb-6">
              <ChatArea 
                messages={messages} 
                onSendMessage={handleSendMessage} 
              />
            </div>

            <div className="mb-6">
              <PersonaSelector 
                personas={personas}
                activePersona={activePersona}
                onPersonaSelect={handlePersonaSelect}
              />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default KnowledgeBot;
