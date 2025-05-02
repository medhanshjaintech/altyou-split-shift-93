
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChatArea from "@/components/ChatArea";
import PersonaSelector from "@/components/PersonaSelector";
import PersonaCreationModal from "@/components/PersonaCreationModal";

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

const KnowledgeBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePersona, setActivePersona] = useState<string | null>(null);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [personas, setPersonas] = useState<Persona[]>([
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
  ]);

  const handleSendMessage = (message: string) => {
    const newUserMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = activePersona
        ? `Response as ${personas.find(p => p.id === activePersona)?.name} based on selected content`
        : `Please select a persona first`;

      const newBotMessage: Message = {
        role: "bot",
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    }, 1000);
  };

  const handlePersonaSelect = (personaId: string) => {
    setActivePersona(personaId);
    setMessages([]);
  };

  const handleAddPersona = (newPersona: Persona) => {
    setPersonas([...personas, newPersona]);
    setIsPersonaModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Knowledge Bot</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {!activePersona ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Select a Persona</h2>
              <Button onClick={() => setIsPersonaModalOpen(true)} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Create Persona
              </Button>
            </div>
            
            <PersonaSelector 
              personas={personas}
              activePersona={activePersona}
              onPersonaSelect={handlePersonaSelect}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setActivePersona(null)}
                  size="sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Personas
                </Button>
                <h2 className="text-xl font-bold text-white">
                  {personas.find(p => p.id === activePersona)?.name}
                </h2>
              </div>
            </div>
            
            <ChatArea 
              messages={messages} 
              onSendMessage={handleSendMessage} 
            />
          </div>
        )}
      </div>

      <PersonaCreationModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        onAddPersona={handleAddPersona}
      />
    </div>
  );
};

export default KnowledgeBot;
