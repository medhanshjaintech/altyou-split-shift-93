import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChatArea from "@/components/ChatArea";
import PersonaSelector from "@/components/PersonaSelector";
import PersonaCreationModal from "@/components/PersonaCreationModal";
import { toast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  instructions?: string;
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
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=64&h=64"
    },
    {
      id: "marketing-expert",
      name: "Marketing Expert",
      description: "Marketing specialist with insights on growth strategies",
      avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=64&h=64"
    },
    {
      id: "content-creator",
      name: "Content Creator",
      description: "Creative specialist for engaging content development",
      avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=64&h=64"
    },
    {
      id: "business-coach",
      name: "Business Coach",
      description: "Strategic advisor for business growth and development",
      avatar: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=64&h=64"
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
    // Add avatar to new persona if not provided
    const personaWithAvatar = {
      ...newPersona,
      avatar: newPersona.avatar || "/lovable-uploads/f5e90732-46bb-4f6a-82c4-c07cb1e98cb9.png"
    };
    
    setPersonas([...personas, personaWithAvatar]);
    toast({
      title: "Persona Created",
      description: `${newPersona.name} has been added to your personas`
    });
    setIsPersonaModalOpen(false);
  };

  const handleDeletePersona = (personaId: string) => {
    setPersonas(personas.filter(persona => persona.id !== personaId));
    
    // If active persona is deleted, reset active persona
    if (activePersona === personaId) {
      setActivePersona(null);
      setMessages([]);
    }
    
    toast({
      title: "Persona Deleted",
      description: "The persona has been removed from your list",
      variant: "destructive"
    });
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
              <Button 
                onClick={() => setIsPersonaModalOpen(true)} 
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Persona
              </Button>
            </div>
            
            <PersonaSelector 
              personas={personas}
              activePersona={activePersona}
              onPersonaSelect={handlePersonaSelect}
              onPersonaDelete={handleDeletePersona}
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
                  className="text-white border-white/20 bg-neutral-800 hover:bg-neutral-700"
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
