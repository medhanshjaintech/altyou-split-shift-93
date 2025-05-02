import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Link as LinkIcon, Play, ChevronLeft, X, UserCircle, Plus } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import PersonaSelector from '@/components/PersonaSelector';
import PersonaCreationModal from '@/components/PersonaCreationModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  instructions?: string;
}

const ViralReelCutter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploadType, setUploadType] = useState<'transcription' | 'audio' | 'youtube' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Persona selection state
  const [isPersonaDialogOpen, setIsPersonaDialogOpen] = useState(false);
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [activePersona, setActivePersona] = useState<string | null>(null);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type and set appropriate upload type
    if (file.type.includes('audio')) {
      setUploadType('audio');
    } else if (file.name.endsWith('.txt') || file.name.endsWith('.srt')) {
      setUploadType('transcription');
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file or a transcript (.txt, .srt) file",
        variant: "destructive",
      });
      return;
    }

    setSelectedFileName(file.name);
    setYoutubeUrl('');
    
    // Clear file input to allow re-upload of the same file
    e.target.value = '';
  };

  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
    setUploadType('youtube');
    setSelectedFileName(null);
  };

  const openPersonaDialog = () => {
    if (!uploadType) {
      toast({
        title: "No content selected",
        description: "Please upload a file or enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsPersonaDialogOpen(true);
  };

  const handleProcessWithPersona = () => {
    if (!activePersona) {
      toast({
        title: "No persona selected",
        description: "Please select a persona or create a new one",
        variant: "destructive",
      });
      return;
    }

    setIsPersonaDialogOpen(false);
    setIsProcessing(true);
    
    // Simulate processing delay
    toast({
      title: "Processing content",
      description: `Your ${uploadType === 'youtube' ? 'YouTube video' : uploadType === 'audio' ? 'audio file' : 'transcription'} is being processed with ${personas.find(p => p.id === activePersona)?.name} persona.`,
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "Content processed",
        description: "Your viral reel clips have been created.",
      });
      
      // Get title based on the type of upload
      let videoTitle = "";
      if (uploadType === 'youtube') {
        videoTitle = "How I Built a Million-Dollar Business in 30 Days"; // Mock YouTube video title
      } else if (selectedFileName) {
        videoTitle = selectedFileName.replace(/\.[^/.]+$/, ""); // Remove file extension
      } else {
        videoTitle = "Content Analysis";
      }
      
      // Navigate to the results page with the video title
      navigate('/viral-reel-results', { 
        state: { 
          videoTitle,
          contentType: uploadType,
          personaName: personas.find(p => p.id === activePersona)?.name
        }
      });
    }, 3000);
  };

  const handleAddPersona = (newPersona: Persona) => {
    setPersonas(prev => [...prev, newPersona]);
    setActivePersona(newPersona.id);
    setIsPersonaModalOpen(false);
    setIsPersonaDialogOpen(true); // Show persona dialog again after creating
    
    toast({
      title: "Persona Created",
      description: `${newPersona.name} has been added to your personas`,
    });
  };

  const handleCreatePersona = () => {
    setIsPersonaDialogOpen(false);
    setIsPersonaModalOpen(true);
  };

  const handleDeletePersona = (personaId: string) => {
    setPersonas(personas.filter(persona => persona.id !== personaId));
    
    if (activePersona === personaId) {
      setActivePersona(null);
    }
    
    toast({
      title: "Persona Deleted",
      description: "The persona has been removed from your list",
      variant: "destructive"
    });
  };

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Check if file type matches the expected types
    if (file.type.includes('audio')) {
      setUploadType('audio');
      setSelectedFileName(file.name);
      setYoutubeUrl('');
    } else if (file.name.endsWith('.txt') || file.name.endsWith('.srt')) {
      setUploadType('transcription');
      setSelectedFileName(file.name);
      setYoutubeUrl('');
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file or a transcript (.txt, .srt) file",
        variant: "destructive",
      });
    }
  };

  const resetSelection = () => {
    setUploadType(null);
    setSelectedFileName(null);
    setYoutubeUrl('');
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handleBackToDashboard} className="mr-3">
                  <ChevronLeft className="h-5 w-5 text-white" />
                </Button>
                <h1 className="text-3xl font-bold text-white">Viral Reel Cutter</h1>
              </div>
            </div>
            
            <div className="mb-12">
              <p className="text-gray-300 text-lg">
                Upload your content or paste a YouTube URL to create viral clips from your content.
              </p>
            </div>

            {/* New Upload UI similar to Hinglish SRT tool */}
            <div className="max-w-lg mx-auto mb-12">
              <Card className="bg-neutral-800 border border-neutral-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-indigo-400 mr-2" />
                      <h2 className="text-lg font-medium text-white">Import from Link</h2>
                    </div>
                  </div>
                  
                  <p className="text-neutral-300 text-sm mb-6">
                    Import audio and videos from YouTube, Dropbox, Google Drive, 
                    and other platforms. The link must be publicly accessible.
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Media Link</label>
                    <Input 
                      type="text" 
                      placeholder="https://www.youtube.com/watch?v=" 
                      value={youtubeUrl} 
                      onChange={handleYoutubeUrlChange} 
                      className="bg-blue-50 border border-blue-100 text-neutral-800" 
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2" 
                    disabled={!youtubeUrl}
                    onClick={openPersonaDialog}
                  >
                    <span>+</span>
                    <span>IMPORT</span>
                  </Button>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-neutral-300">Audio / Transcript File</label>
                      <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white p-0 h-auto">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div 
                      onClick={handleFileButtonClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="border-2 border-dashed border-neutral-600 rounded-md p-6 text-center cursor-pointer transition bg-zinc-800"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="audio/*,.txt,.srt" 
                        className="hidden" 
                      />
                      
                      <p className="font-medium mb-2 text-zinc-100">Drag & Drop</p>
                      <p className="text-sm mb-4 text-zinc-100">
                        MP3, MP4, M4A, AAC, WAV,<br />
                        OGG, FLAC, TXT, SRT
                      </p>
                      <div className="text-neutral-400">- OR -</div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileButtonClick();
                        }}
                      >
                        BROWSE FILES
                      </Button>
                    </div>

                    {selectedFileName && (
                      <div className="mt-4 p-3 bg-neutral-700 rounded-md flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-indigo-400 mr-2" />
                          <span className="text-white text-sm truncate max-w-[250px]">{selectedFileName}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={resetSelection} 
                          className="text-neutral-400 hover:text-white p-1 h-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {selectedFileName && (
                      <div className="mt-4">
                        <Button 
                          onClick={openPersonaDialog} 
                          disabled={isProcessing}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          {isProcessing ? "Processing..." : "Process Content"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-neutral-800/50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
              <ol className="list-decimal list-inside text-gray-300 space-y-3">
                <li>Upload your transcript file, audio recording, or paste a YouTube URL</li>
                <li>Our AI analyzes your content to identify the most engaging moments</li>
                <li>We generate short, viral-ready clips optimized for social media</li>
                <li>Download your clips or share them directly to your social platforms</li>
              </ol>
            </div>
          </div>
        </ScrollArea>
      </main>

      {/* Persona Selection Dialog */}
      <Dialog open={isPersonaDialogOpen} onOpenChange={setIsPersonaDialogOpen}>
        <DialogContent className="bg-neutral-900 text-white border border-neutral-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Select a Persona for Your Content</DialogTitle>
            <DialogDescription className="text-gray-300">
              Choose a persona to process your content with. Each persona will generate different styles of content.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <PersonaSelector 
              personas={personas}
              activePersona={activePersona}
              onPersonaSelect={setActivePersona}
              onPersonaDelete={handleDeletePersona}
              onCreatePersona={handleCreatePersona}
            />
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPersonaDialogOpen(false)}
              className="border-white/20 bg-neutral-800 hover:bg-neutral-700 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleProcessWithPersona}
              disabled={!activePersona}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Process with Selected Persona
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Persona Creation Modal */}
      <PersonaCreationModal
        isOpen={isPersonaModalOpen}
        onClose={() => {
          setIsPersonaModalOpen(false);
          setIsPersonaDialogOpen(true);
        }}
        onAddPersona={handleAddPersona}
      />
    </div>
  );
};

export default ViralReelCutter;
