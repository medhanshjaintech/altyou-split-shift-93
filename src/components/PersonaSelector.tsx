
import { Avatar } from "@/components/ui/avatar";

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
}

const PersonaSelector = ({ 
  personas, 
  activePersona, 
  onPersonaSelect 
}: PersonaSelectorProps) => {
  return (
    <div>
      <p className="text-sm font-medium mb-3 text-muted-foreground">Already made personas</p>
      <div className="grid grid-cols-4 gap-4">
        {personas.map((persona) => (
          <div
            key={persona.id}
            onClick={() => onPersonaSelect(persona.id)}
            className={`border rounded-md p-3 cursor-pointer transition-colors ${
              activePersona === persona.id
                ? "border-primary bg-primary/5"
                : "hover:bg-accent"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Avatar>
                <img src={persona.avatar} alt={persona.name} />
              </Avatar>
              <span className="font-medium">{persona.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{persona.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaSelector;
