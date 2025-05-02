
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { File, Upload, UserCircle } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  instructions?: string;
}

interface DatabaseFile {
  id: string;
  name: string;
  selected: boolean;
}

interface PersonaCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPersona: (persona: Persona) => void;
}

const DEFAULT_AVATARS = [
  "/lovable-uploads/f5e90732-46bb-4f6a-82c4-c07cb1e98cb9.png",
  "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=64&h=64",
  "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=64&h=64",
  "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=64&h=64",
  "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=64&h=64",
  "https://images.unsplash.com/photo-1441057206919-63d19fac2369?auto=format&fit=crop&w=64&h=64"
];

const PersonaCreationModal = ({
  isOpen,
  onClose,
  onAddPersona
}: PersonaCreationModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(DEFAULT_AVATARS[0]);
  
  // Sample database files
  const [databaseFiles, setDatabaseFiles] = useState<DatabaseFile[]>([
    { id: "1", name: "Marketing Strategy.pdf", selected: false },
    { id: "2", name: "Product Documentation.docx", selected: false },
    { id: "3", name: "Company Handbook.pdf", selected: false },
    { id: "4", name: "Research Results.pdf", selected: false },
    { id: "5", name: "Sales Presentation.pptx", selected: false },
  ]);

  const toggleFileSelection = (fileId: string) => {
    setDatabaseFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) return;
    
    const newPersona: Persona = {
      id: `persona-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      instructions: instructions.trim(),
      avatar: selectedAvatar
    };
    
    onAddPersona(newPersona);
    
    // Reset form
    setName("");
    setDescription("");
    setInstructions("");
    setSelectedAvatar(DEFAULT_AVATARS[0]);
    setDatabaseFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: false }))
    );
  };

  const handleFileUpload = () => {
    console.log("File upload triggered");
    // This would trigger a file upload in a real application
    alert("File upload feature would open a file picker in a real application");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-900 text-white border-neutral-700 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Create a New Persona</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="avatar" className="text-white">Select Avatar</Label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_AVATARS.map((avatar, index) => (
                <Avatar 
                  key={index} 
                  className={`h-12 w-12 cursor-pointer border-2 ${selectedAvatar === avatar ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                </Avatar>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={handleFileUpload}
                className="h-12 w-12 rounded-full text-white border-dashed border-neutral-600 bg-neutral-800 hover:bg-neutral-700"
                title="Upload custom avatar"
              >
                <Upload className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="name" className="text-white">Persona Name</Label>
            <Input
              id="name"
              placeholder="E.g., Finance Expert"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="description" className="text-white">Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what this persona specializes in..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="instructions" className="text-white">Custom Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Add specific instructions for how the persona should behave..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-white">Select Content from Database</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFileUpload} 
                className="text-xs flex items-center gap-1 text-white border-neutral-600 bg-neutral-800 hover:bg-neutral-700"
              >
                <Upload className="h-3 w-3" /> 
                <span className="text-white">Upload New</span>
              </Button>
            </div>
            
            <div className="bg-neutral-800 border border-neutral-700 rounded-md p-3 max-h-[200px] overflow-y-auto">
              {databaseFiles.map(file => (
                <div
                  key={file.id}
                  onClick={() => toggleFileSelection(file.id)}
                  className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer mb-1 ${
                    file.selected ? "bg-blue-800/50 text-white" : "text-white hover:bg-blue-900/30"
                  }`}
                >
                  <File className="h-4 w-4 text-blue-500" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-white/20 bg-neutral-800 hover:bg-neutral-700 text-white">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Persona
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PersonaCreationModal;
