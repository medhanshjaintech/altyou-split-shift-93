
import { useState } from "react";
import { File, FileText, Upload, Database, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarHeader, SidebarContent } from "@/components/ui/sidebar";
import PersonaCreationModal from "@/components/PersonaCreationModal";
import { toast } from "@/hooks/use-toast";

interface KnowledgeFile {
  id: string;
  name: string;
  type: "transcription" | "upload" | "generated";
  selected: boolean;
  dateAdded?: string;
  associatedPersona?: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  instructions?: string;
  avatar?: string;
}

interface KnowledgeSidebarProps {
  files: KnowledgeFile[];
  onToggleFile: (fileId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const KnowledgeSidebar = ({
  files,
  onToggleFile,
  onSelectAll,
  onDeselectAll
}: KnowledgeSidebarProps) => {
  const transcriptions = files.filter(file => file.type === "transcription");
  const uploads = files.filter(file => file.type === "upload");
  const generated = files.filter(file => file.type === "generated");
  
  // Sample personas - in a real app, these would come from props or a context
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
    }
  ]);
  
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  
  const handleFileUpload = () => {
    // This would trigger a file upload in a real application
    console.log("File upload triggered");
    // For now we'll just show an alert
    alert("File upload feature would open a file picker in a real application");
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
    
    toast({
      title: "Persona Deleted",
      description: "The persona has been removed from your list",
      variant: "destructive"
    });
  };
  
  return <Sidebar variant="inset" side="left">
      <SidebarHeader>
        <div className="p-2">
          <h3 className="font-hanson tracking-wider text-white text-3xl font-extrabold">altyou</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Knowledge Base Files */}
        <div className="p-4">
          <div className="space-y-2 mb-2">
            <h3 className="text-sm font-medium text-white">Knowledge Base</h3>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={onSelectAll} className="text-xs h-6 text-white border-white/20 bg-neutral-800 hover:bg-blue-700">
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={onDeselectAll} className="text-xs h-6 text-white border-white/20 bg-neutral-800 hover:bg-blue-700">
                Clear
              </Button>
            </div>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {transcriptions.map(file => <div key={file.id} onClick={() => onToggleFile(file.id)} className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer ${file.selected ? "bg-blue-800/50 text-white" : "text-white hover:bg-blue-900/30"}`}>
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span>{file.name}</span>
                </div>)}
            </div>
          </ScrollArea>
        </div>

        <Separator className="my-2 bg-white/10" />

        {/* Uploads */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white">Uploads</h3>
            <Button variant="outline" size="sm" onClick={handleFileUpload} className="text-xs h-6 flex items-center gap-1 text-white border-white/20 bg-neutral-800 hover:bg-blue-700">
              <Upload className="h-3 w-3" /> Upload
            </Button>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {uploads.map(file => <div key={file.id} onClick={() => onToggleFile(file.id)} className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer ${file.selected ? "bg-blue-800/50 text-white" : "text-white hover:bg-blue-900/30"}`}>
                  <File className="h-4 w-4 text-green-500" />
                  <span>{file.name}</span>
                </div>)}
            </div>
          </ScrollArea>
        </div>
        
        <Separator className="my-2 bg-white/10" />
        
        {/* Generated */}
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-white">Generated</h3>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {generated.map(file => <div key={file.id} onClick={() => onToggleFile(file.id)} className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer ${file.selected ? "bg-blue-800/50 text-white" : "text-white hover:bg-blue-900/30"}`}>
                  <Database className="h-4 w-4 text-purple-500" />
                  <span>{file.name}</span>
                </div>)}
            </div>
          </ScrollArea>
        </div>
        
        <Separator className="my-2 bg-white/10" />
        
        {/* Personas Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white">Personas</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsPersonaModalOpen(true)}
              className="text-xs h-6 flex items-center gap-1 text-white border-white/20 bg-neutral-800 hover:bg-blue-700"
            >
              <Plus className="h-3 w-3" /> Create
            </Button>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-2">
              {personas.map(persona => (
                <div key={persona.id} className="flex items-start gap-2 p-2 text-sm rounded-md text-white hover:bg-blue-900/30 group">
                  <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={persona.avatar} 
                      alt={persona.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{persona.name}</p>
                    <p className="text-xs text-gray-400 truncate">{persona.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeletePersona(persona.id)}
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-red-900/20 hover:text-red-500"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>
      
      {/* Persona Creation Modal */}
      <PersonaCreationModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        onAddPersona={handleAddPersona}
      />
    </Sidebar>;
};

export default KnowledgeSidebar;
