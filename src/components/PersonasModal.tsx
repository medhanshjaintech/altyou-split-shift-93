
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import PersonaCreationModal from "./PersonaCreationModal";

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  instructions?: string;
}

interface PersonasModalProps {
  isOpen: boolean;
  onClose: () => void;
  personas: Persona[];
  setPersonas: (personas: Persona[]) => void;
}

const PersonasModal = ({
  isOpen,
  onClose,
  personas,
  setPersonas
}: PersonasModalProps) => {
  const { toast } = useToast();
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);

  const handleAddPersona = (newPersona: Persona) => {
    // Add avatar to new persona if not provided
    const personaWithAvatar = {
      ...newPersona,
      avatar: newPersona.avatar || "/lovable-uploads/f5e90732-46bb-4f6a-82c4-c07cb1e98cb9.png"
    };
    
    if (editingPersona) {
      // Update existing persona
      setPersonas(
        personas.map((persona) => 
          persona.id === editingPersona.id ? { ...personaWithAvatar, id: editingPersona.id } : persona
        )
      );
      toast({
        title: "Persona Updated",
        description: `${newPersona.name} has been updated`
      });
    } else {
      // Add new persona
      setPersonas([...personas, personaWithAvatar]);
      toast({
        title: "Persona Created",
        description: `${newPersona.name} has been added to your personas`
      });
    }
    
    setIsPersonaModalOpen(false);
    setEditingPersona(null);
  };

  const handleEditPersona = (persona: Persona) => {
    setEditingPersona(persona);
    setIsPersonaModalOpen(true);
  };

  const handleDeletePersona = (personaId: string) => {
    setPersonas(personas.filter(persona => persona.id !== personaId));
    
    toast({
      title: "Persona Deleted",
      description: "The persona has been removed from your list",
      variant: "destructive"
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Manage Personas</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-between items-center my-4">
            <p className="text-sm text-gray-400">
              Personas help you interact with your content in different ways.
            </p>
            <Button 
              onClick={() => {
                setEditingPersona(null);
                setIsPersonaModalOpen(true);
              }} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Persona
            </Button>
          </div>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid grid-cols-1 gap-4">
              {personas.map(persona => (
                <div key={persona.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 rounded-full">
                      <img 
                        src={persona.avatar} 
                        alt={persona.name} 
                        className="h-full w-full object-cover"
                      />
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{persona.name}</h3>
                      <p className="text-sm text-gray-300 mt-1">{persona.description}</p>
                      
                      {persona.instructions && (
                        <div className="mt-2 text-xs text-gray-400">
                          <p className="font-medium">Instructions:</p>
                          <p className="mt-1">{persona.instructions}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 w-8 p-0 text-white border-white/20 bg-neutral-700 hover:bg-blue-700"
                        onClick={() => handleEditPersona(persona)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8 w-8 p-0 text-white border-white/20 bg-neutral-700 hover:bg-red-700"
                        onClick={() => handleDeletePersona(persona.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {personas.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-neutral-800 rounded-lg border border-dashed border-neutral-700">
                  <p className="text-gray-400 mb-4">You don't have any personas yet</p>
                  <Button 
                    onClick={() => {
                      setEditingPersona(null);
                      setIsPersonaModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Persona
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      <PersonaCreationModal
        isOpen={isPersonaModalOpen}
        onClose={() => {
          setIsPersonaModalOpen(false);
          setEditingPersona(null);
        }}
        onAddPersona={handleAddPersona}
        editingPersona={editingPersona}
      />
    </>
  );
};

export default PersonasModal;
