
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, UserCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
}

interface PersonaSelectorProps {
  personas: Persona[];
  activePersona: string | null;
  onPersonaSelect: (personaId: string) => void;
  onPersonaDelete: (personaId: string) => void;
  onCreatePersona?: () => void;
}

const PersonaSelector = ({ 
  personas, 
  activePersona, 
  onPersonaSelect,
  onPersonaDelete,
  onCreatePersona
}: PersonaSelectorProps) => {
  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-medium text-white">Select a Persona Style</p>
        {onCreatePersona && (
          <Button 
            onClick={onCreatePersona} 
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Persona
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {personas.map((persona) => (
          <div
            key={persona.id}
            onClick={() => onPersonaSelect(persona.id)}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              activePersona === persona.id
                ? "border-indigo-500 bg-indigo-500/10"
                : "border-neutral-700 bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPersonaDelete(persona.id);
                }}
                className="absolute top-0 right-0 rounded-full p-1 bg-neutral-700 hover:bg-red-600 text-neutral-300 hover:text-white transition-colors"
                aria-label={`Delete ${persona.name}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12 border border-neutral-600">
                  <AvatarImage src={persona.avatar} alt={persona.name} />
                  <AvatarFallback className="bg-neutral-700 text-white">
                    <UserCircle className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-white text-lg">{persona.name}</span>
              </div>
              <p className="text-sm text-gray-300 line-clamp-2">{persona.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelector;
