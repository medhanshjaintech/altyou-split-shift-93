import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Upload, FileText, Download, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import PersonaSelector from '@/components/PersonaSelector';
import PersonaCreationModal from '@/components/PersonaCreationModal';

interface ScriptFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
}

const ScriptBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [scriptUploaded, setScriptUploaded] = useState<boolean>(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedScript, setEditedScript] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [activePersona, setActivePersona] = useState<string | null>(null);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  
  // Mock personas for now - these would typically come from an API or context
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: 'persona-1',
      name: 'Professional',
      description: 'Formal, business-oriented writing style',
      avatar: '/placeholder.svg'
    },
    {
      id: 'persona-2',
      name: 'Casual',
      description: 'Conversational, friendly tone for general audiences',
      avatar: '/placeholder.svg'
    },
    {
      id: 'persona-3',
      name: 'Technical',
      description: 'Detailed, precise language for technical content',
      avatar: '/placeholder.svg'
    }
  ]);
  
  // Mock data for previously uploaded scripts
  const [previousScripts, setPreviousScripts] = useState<ScriptFile[]>([
    {
      id: 'script-123456',
      name: 'Sample Script 1.txt',
      size: '24.5 KB',
      uploadDate: '2025-04-28 14:25'
    },
    {
      id: 'script-234567',
      name: 'Sample Script 2.txt',
      size: '18.3 KB',
      uploadDate: '2025-04-29 09:10'
    }
  ]);

  // Initialize values based on navigation source
  useEffect(() => {
    // From content suggestion
    if (location.state?.searchQuery) {
      setTopic(location.state.searchQuery);
      
      // Set context and instructions if provided
      if (location.state.context) {
        setContext(location.state.context);
      }
      
      if (location.state.instructions) {
        setInstructions(location.state.instructions);
      }

      // If coming from content analysis with transcript
      if (location.state?.from === 'content-analysis' && location.state?.hasTranscriptFile) {
        // Add transcript file to previousScripts
        const newTranscriptFile: ScriptFile = {
          id: `transcript-${Date.now()}`,
          name: location.state.fileName || 'transcript.txt',
          size: '32.7 KB', // Mock size
          uploadDate: new Date().toLocaleString()
        };
        
        setPreviousScripts(prev => [newTranscriptFile, ...prev]);
        setScriptUploaded(true);
        
        toast({
          title: "Transcript loaded",
          description: "The analyzed video transcript has been loaded for script generation."
        });
      }
    }
  }, [location.state, toast]);
  
  const handleBackNavigation = () => {
    // Navigate back to the appropriate page
    if (location.state?.from === 'content-suggestion') {
      navigate('/content-suggestion');
    } else if (location.state?.from === 'content-analysis') {
      navigate('/content-analysis-result');
    } else {
      navigate('/dashboard');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Mock uploading process
    toast({
      title: "Uploading scripts",
      description: `Uploading ${files.length} script files...`
    });
    
    // Simulate upload process
    setTimeout(() => {
      const newScripts = Array.from(files).map((file, index) => ({
        id: `script-${Date.now()}-${index}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        uploadDate: new Date().toLocaleString()
      }));
      
      setPreviousScripts([...previousScripts, ...newScripts]);
      setScriptUploaded(true);
      
      toast({
        title: "Upload successful",
        description: `${files.length} scripts have been uploaded.`
      });
    }, 1500);
  };
  
  const handleGenerateScript = () => {
    if (!topic.trim()) {
      toast({
        title: "Missing topic",
        description: "Please enter a topic for your script"
      });
      return;
    }

    setIsGenerating(true);
    toast({
      title: "Generating script",
      description: "Analyzing your style and creating a script based on the content suggestions..."
    });
    
    // Simulate script generation with a delay
    setTimeout(() => {
      // Mock generated script in theater play format
      const mockScript = `TITLE: ${topic.toUpperCase()}
      
ACT I
SCENE 1

[A modern office space with minimalist furniture. Large windows overlook the city skyline. ALEX, mid-30s, creative director, sits at a desk reviewing documents.]

ALEX
(looking through papers)
The evolution of this topic has been fascinating. From simple beginnings to complex implementations...

[JORDAN, tech specialist, early 30s, enters with a tablet.]

JORDAN
I've analyzed the practical applications. The everyday impact is remarkable.

ALEX
(standing, excited)
That's exactly what we need to highlight! The real-world significance.

[ALEX moves to a whiteboard and begins mapping out ideas.]

ALEX
We need to compare the methodologies. Show strengths, limitations...

JORDAN
(nodding)
The engagement metrics are impressive. 65% retention rate across platforms.

ALEX
Perfect. Act I will establish the foundation. Act II explores implementations. Act III presents our unique perspective.

[Lights dim slightly as they continue working. The sound of typing and quiet discussion fills the room.]

END OF SCENE 1`;

      setGeneratedScript(mockScript);
      setEditedScript(mockScript);
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownloadScript = () => {
    if (!generatedScript) return;

    const blob = new Blob([generatedScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic.replace(/\s+/g, '-').toLowerCase()}-script.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Script downloaded",
      description: "Your script has been downloaded successfully."
    });
  };

  const handleEditScript = () => {
    setIsEditing(true);
  };

  const handleSaveEdits = () => {
    setGeneratedScript(editedScript);
    setIsEditing(false);
    
    toast({
      title: "Script updated",
      description: "Your changes have been saved successfully."
    });
  };

  const handleCancelEdit = () => {
    setEditedScript(generatedScript || '');
    setIsEditing(false);
  };
  
  const handlePersonaSelect = (personaId: string) => {
    setActivePersona(personaId === activePersona ? null : personaId);
  };
  
  const handlePersonaDelete = (personaId: string) => {
    setPersonas(personas.filter(persona => persona.id !== personaId));
    if (activePersona === personaId) {
      setActivePersona(null);
    }
  };

  const handleAddPersona = (newPersona: Persona) => {
    setPersonas([...personas, newPersona]);
    toast({
      title: "Persona Created",
      description: `${newPersona.name} has been added to your personas`
    });
    setIsPersonaModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center">
      <ScrollArea className="h-full w-full">
        <div className="container mx-auto max-w-7xl px-6 py-16">
          <div className="absolute top-8 left-8">
            <Button 
              variant="ghost" 
              onClick={handleBackNavigation}
              className="text-white/70 hover:bg-white/10 hover:text-white flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </Button>
          </div>
          
          <div className="w-full max-w-5xl mx-auto pt-16">
            <h2 className="text-white text-4xl font-medium mb-6">Script Builder</h2>
            
            <div className="space-y-6 mb-10">
              <div>
                <label htmlFor="topic" className="block text-white/70 mb-2">
                  Topic
                </label>
                <Input 
                  id="topic"
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                  placeholder="Enter your topic..."
                  className="bg-white/10 border-0 text-white focus-visible:ring-white/30"
                />
              </div>
              
              <div>
                <label htmlFor="context" className="block text-white/70 mb-2">
                  Context
                </label>
                <Textarea
                  id="context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Provide context for your script..."
                  className="bg-white/10 border-0 text-white focus-visible:ring-white/30 min-h-[100px]"
                />
              </div>
              
              <div>
                <label htmlFor="instructions" className="block text-white/70 mb-2">
                  Instructions (Optional)
                </label>
                <Textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Add any specific instructions for generating your script..."
                  className="bg-white/10 border-0 text-white focus-visible:ring-white/30 min-h-[100px]"
                />
              </div>
              
              <div className="mt-6">
                <PersonaSelector
                  personas={personas}
                  activePersona={activePersona}
                  onPersonaSelect={handlePersonaSelect}
                  onPersonaDelete={handlePersonaDelete}
                  onCreatePersona={() => setIsPersonaModalOpen(true)}
                />
              </div>
            </div>
            
            <p className="text-white/70 mb-8">
              Upload 8-10 of your previous scripts to help us understand your style and tone. 
              We'll generate a script that matches your unique voice.
            </p>
            
            <Card className="bg-white/10 border-0 text-white p-6 rounded-lg mb-8">
              <div className="flex items-start gap-4">
                <FileText className="h-5 w-5 text-blue-400 mt-1" />
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Your Uploaded Scripts</h3>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept=".txt,.docx,.pdf"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button size="sm" variant="ghost" className="text-white/70 hover:text-white border border-white/20 hover:bg-white/10">
                        <Upload className="h-4 w-4 mr-1" />
                        Upload More
                      </Button>
                    </label>
                  </div>
                  
                  <div className="space-y-2">
                    {previousScripts.map(script => (
                      <div key={script.id} className="flex justify-between items-center p-3 rounded-md hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-white/50" />
                          <span>{script.name}</span>
                        </div>
                        <div className="text-white/50 text-sm">
                          {script.size} • {script.uploadDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            
            {!generatedScript && (
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={handleGenerateScript}
                  disabled={isGenerating} 
                  className="bg-white/10 hover:bg-white/20 text-white border-0 w-64 h-12"
                >
                  {isGenerating ? 'Generating Script...' : 'Generate with AI'}
                </Button>
              </div>
            )}
            
            {isGenerating && (
              <div className="mt-12 space-y-6">
                <Skeleton className="h-8 w-1/3 bg-white/10" />
                <Skeleton className="h-72 w-full bg-white/10" />
                <Skeleton className="h-24 w-full bg-white/10" />
              </div>
            )}
            
            {generatedScript && !isEditing && (
              <div className="mt-8">
                <h3 className="text-white text-2xl font-medium mb-4">Your Generated Script</h3>
                <Card className="bg-white/10 border-0 text-white p-6 rounded-lg">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-white/90">
                    {generatedScript}
                  </pre>
                </Card>
                
                <div className="flex justify-end gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10" 
                    onClick={handleDownloadScript}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download Script
                  </Button>
                  <Button 
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={handleEditScript}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Script
                  </Button>
                </div>
              </div>
            )}

            {isEditing && generatedScript && (
              <div className="mt-8">
                <h3 className="text-white text-2xl font-medium mb-4">Edit Your Script</h3>
                <Card className="bg-white/10 border-0 text-white p-6 rounded-lg">
                  <textarea 
                    className="w-full h-96 bg-white/5 text-white p-4 font-mono text-sm rounded-md border-0 focus:ring-1 focus:ring-white/30 focus:outline-none"
                    value={editedScript}
                    onChange={(e) => setEditedScript(e.target.value)}
                  />
                </Card>
                
                <div className="flex justify-end gap-4 mt-6">
                  <Button 
                    variant="outline" 
                    className="text-white border-white/20 hover:bg-white/10"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                    onClick={handleSaveEdits}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <PersonaCreationModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        onAddPersona={handleAddPersona}
      />
    </div>
  );
};

export default ScriptBuilder;
