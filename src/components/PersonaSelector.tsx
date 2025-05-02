
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";

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
}

const PersonaSelector = ({ 
  personas, 
  activePersona, 
  onPersonaSelect,
  onPersonaDelete
}: PersonaSelectorProps) => {
  return (
    <div>
      <p className="text-sm font-medium mb-3 text-muted-foreground">Already made personas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {personas.map((persona) => (
          <div
            key={persona.id}
            onClick={() => onPersonaSelect(persona.id)}
            className={`border rounded-md p-4 cursor-pointer transition-colors relative ${
              activePersona === persona.id
                ? "border-primary bg-primary/10"
                : "border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPersonaDelete(persona.id);
              }}
              className="absolute top-2 right-2 rounded-full p-1 bg-neutral-800 hover:bg-red-900 text-red-500 hover:text-white transition-colors"
              aria-label={`Delete ${persona.name}`}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-10 w-10 border border-neutral-700">
                <AvatarImage src={persona.avatar} alt={persona.name} />
              </Avatar>
              <span className="font-medium text-white">{persona.name}</span>
            </div>
            <p className="text-sm text-gray-300">{persona.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelector;
