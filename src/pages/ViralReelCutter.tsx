
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Link as LinkIcon, Play } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ViralReelCutter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploadType, setUploadType] = useState<'transcription' | 'audio' | 'youtube' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'transcription' | 'audio') => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadType(type);
    setSelectedFileName(file.name);
    setYoutubeUrl('');
    
    // Clear file input to allow re-upload of the same file
    event.target.value = '';
  };

  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
    setUploadType('youtube');
    setSelectedFileName(null);
  };

  const handleProcessContent = () => {
    if (!uploadType) {
      toast({
        title: "No content selected",
        description: "Please upload a file or enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    toast({
      title: "Processing content",
      description: `Your ${uploadType === 'youtube' ? 'YouTube video' : uploadType === 'audio' ? 'audio file' : 'transcription'} is being processed.`,
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
          contentType: uploadType
        }
      });
    }, 3000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: 'transcription' | 'audio') => {
    e.preventDefault();
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Check if file type matches the expected type
    if (type === 'transcription' && !file.name.endsWith('.txt') && !file.name.endsWith('.srt')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .txt or .srt file for transcription",
        variant: "destructive",
      });
      return;
    }
    
    if (type === 'audio' && !file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file",
        variant: "destructive",
      });
      return;
    }
    
    setUploadType(type);
    setSelectedFileName(file.name);
    setYoutubeUrl('');
  };

  const resetSelection = () => {
    setUploadType(null);
    setSelectedFileName(null);
    setYoutubeUrl('');
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Viral Reel Cutter</h1>
            </div>
            
            <div className="mb-12">
              <p className="text-gray-300 text-lg">
                Upload your content or paste a YouTube URL to create viral clips from your content.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Transcription Upload Card */}
              <Card 
                className={cn(
                  "p-6 cursor-pointer bg-neutral-800 border-0 transition hover:bg-neutral-700",
                  uploadType === 'transcription' && "ring-2 ring-indigo-500"
                )}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'transcription')}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-indigo-600/20 flex items-center justify-center mb-6">
                    <FileText className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Transcription</h3>
                  <p className="text-sm text-gray-400 mb-4">Upload .txt or .srt transcript files</p>
                  
                  {selectedFileName && uploadType === 'transcription' ? (
                    <div className="mt-2 w-full">
                      <div className="bg-neutral-700 p-2 rounded flex items-center justify-between">
                        <span className="text-sm text-white truncate max-w-[80%]">{selectedFileName}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            resetSelection();
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="w-full">
                      <input
                        type="file"
                        accept=".txt,.srt"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'transcription')}
                      />
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">Drag & drop or click to browse</p>
                      </div>
                    </label>
                  )}
                </div>
              </Card>

              {/* Audio Upload Card */}
              <Card 
                className={cn(
                  "p-6 cursor-pointer bg-neutral-800 border-0 transition hover:bg-neutral-700",
                  uploadType === 'audio' && "ring-2 ring-indigo-500"
                )}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'audio')}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-indigo-600/20 flex items-center justify-center mb-6">
                    <Play className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Upload Audio</h3>
                  <p className="text-sm text-gray-400 mb-4">Upload MP3 or other audio files</p>
                  
                  {selectedFileName && uploadType === 'audio' ? (
                    <div className="mt-2 w-full">
                      <div className="bg-neutral-700 p-2 rounded flex items-center justify-between">
                        <span className="text-sm text-white truncate max-w-[80%]">{selectedFileName}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            resetSelection();
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="w-full">
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'audio')}
                      />
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition">
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-400">Drag & drop or click to browse</p>
                      </div>
                    </label>
                  )}
                </div>
              </Card>

              {/* YouTube Link Card */}
              <Card 
                className={cn(
                  "p-6 bg-neutral-800 border-0 transition hover:bg-neutral-700",
                  uploadType === 'youtube' && "ring-2 ring-indigo-500"
                )}
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="h-16 w-16 rounded-full bg-indigo-600/20 flex items-center justify-center mb-6">
                    <LinkIcon className="h-8 w-8 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">YouTube URL</h3>
                  <p className="text-sm text-gray-400 mb-4">Paste a YouTube video link</p>
                  
                  <div className="w-full">
                    <Input
                      type="text"
                      placeholder="https://youtube.com/..."
                      value={youtubeUrl}
                      onChange={handleYoutubeUrlChange}
                      className="bg-neutral-700 border-neutral-600 text-white placeholder:text-gray-400"
                    />
                    {youtubeUrl && (
                      <div className="mt-2 text-xs text-green-400 text-left">
                        YouTube URL detected
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex justify-center mb-8">
              <Button 
                onClick={handleProcessContent} 
                disabled={isProcessing || (!selectedFileName && !youtubeUrl)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-6 text-lg"
              >
                {isProcessing ? "Processing..." : "Process Content"}
              </Button>
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
    </div>
  );
};

export default ViralReelCutter;
