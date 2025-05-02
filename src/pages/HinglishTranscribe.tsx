
import { useState, useRef } from 'react';
import { FileText, ArrowLeft, Play, Upload, Download, Database, File, X, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface TranscriptionData {
  id: string;
  title: string;
  content: {
    english: string;
    hinglish: string;
  };
  isCompleted: boolean;
  addedToKnowledgeBase?: boolean;
  mediaType: 'video' | 'audio';
  mediaSource: string;
}

const HinglishTranscribe = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mediaLink, setMediaLink] = useState('');
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionData, setTranscriptionData] = useState<TranscriptionData | null>(null);
  const [hinglishText, setHinglishText] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaLink(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.includes('audio') || file.type.includes('video')) {
        // In a real app, we would upload this file to a server
        // For now, we'll mock the process using local URL
        setIsUploadingFile(true);
        setTimeout(() => {
          const mediaType = file.type.includes('audio') ? 'audio' : 'video';
          
          // Create object URL for the file
          const objectUrl = URL.createObjectURL(file);
          
          // Mock starting the transcription process
          startTranscription(file.name, objectUrl, mediaType);
          setIsUploadingFile(false);
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: "Please upload a valid audio or video file.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleImportFromLink = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mediaLink) {
      toast({
        title: "Error",
        description: "Please enter a media link",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock fetching video info from YouTube or other platforms
    setTimeout(() => {
      // Mock video data
      const mockVideoTitle = "How to Master AI Tools in 2024";
      const mockVideoUrl = mediaLink;
      
      // Start transcription process
      startTranscription(mockVideoTitle, mockVideoUrl, 'video');
      setIsLoading(false);
    }, 1500);
  };

  const startTranscription = (title: string, source: string, mediaType: 'audio' | 'video') => {
    setIsTranscribing(true);
    
    toast({
      title: "Starting transcription",
      description: `Transcribing "${title}". This may take some time.`,
    });
    
    // Mock transcription process
    setTimeout(() => {
      // Generate mock SRT content
      const mockEnglishSRT = generateMockSRT(title);
      
      // Convert to Hinglish (mockup)
      const mockHinglishSRT = convertToHinglish(mockEnglishSRT);
      
      setTranscriptionData({
        id: `transc-${Date.now()}`,
        title: title,
        content: {
          english: mockEnglishSRT,
          hinglish: mockHinglishSRT,
        },
        isCompleted: true,
        mediaType: mediaType,
        mediaSource: source
      });
      
      setHinglishText(mockHinglishSRT);
      setIsTranscribing(false);
      
      toast({
        title: "Transcription complete",
        description: "Your Hinglish transcription is ready to edit.",
      });
    }, 3000);
  };
  
  const generateMockSRT = (title: string): string => {
    // Generate a mock SRT file with timestamps and content based on the video title
    return `1
00:00:01,000 --> 00:00:04,000
Welcome to this video about ${title.toLowerCase()}

2
00:00:05,000 --> 00:00:08,500
Today we'll explore key concepts and practical applications

3
00:00:09,000 --> 00:00:15,000
Let's start by understanding the fundamentals of this topic

4
00:00:16,000 --> 00:00:22,000
The most important thing to remember is to practice regularly

5
00:00:23,000 --> 00:00:28,000
Let me demonstrate some techniques that you can use right away

6
00:00:29,000 --> 00:00:35,000
These strategies have been proven effective by experts in the field

7
00:00:36,000 --> 00:00:42,000
Remember to apply these principles in your daily workflow

8
00:00:43,000 --> 00:00:48,000
Thank you for watching this tutorial on ${title.toLowerCase()}`;
  };
  
  const convertToHinglish = (englishSRT: string): string => {
    // This is a mock function to simulate translating English to Hinglish
    // In a real app, this would use an API to translate
    const lines = englishSRT.split('\n');
    const hinglishLines = lines.map(line => {
      // Only "translate" the actual text lines, not timestamps or numbers
      if (!line.includes('-->') && !line.match(/^\d+$/) && line.trim() !== '') {
        return convertLineToHinglish(line);
      }
      return line;
    });
    
    return hinglishLines.join('\n');
  };
  
  const convertLineToHinglish = (line: string): string => {
    // Mock translation of common words to Hinglish
    // In a real app, you would use a translation API
    return line
      .replace(/welcome to/gi, 'welcome to')
      .replace(/video/gi, 'video')
      .replace(/explore/gi, 'explore')
      .replace(/concepts/gi, 'concepts')
      .replace(/applications/gi, 'applications')
      .replace(/understanding/gi, 'samajhna')
      .replace(/fundamentals/gi, 'fundamentals')
      .replace(/topic/gi, 'topic')
      .replace(/important/gi, 'important')
      .replace(/remember/gi, 'yaad rakhna')
      .replace(/practice/gi, 'practice')
      .replace(/regularly/gi, 'regularly')
      .replace(/demonstrate/gi, 'dikhana')
      .replace(/techniques/gi, 'techniques')
      .replace(/strategies/gi, 'strategies')
      .replace(/effective/gi, 'effective')
      .replace(/experts/gi, 'experts')
      .replace(/field/gi, 'field')
      .replace(/apply/gi, 'apply karna')
      .replace(/principles/gi, 'principles')
      .replace(/daily/gi, 'daily')
      .replace(/workflow/gi, 'workflow')
      .replace(/thank you/gi, 'thank you')
      .replace(/watching/gi, 'dekhne ke liye')
      .replace(/tutorial/gi, 'tutorial');
  };
  
  const handleHinglishTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHinglishText(e.target.value);
  };
  
  const downloadSRT = () => {
    if (!transcriptionData) return;
    
    // Create a file from the Hinglish transcription content
    const element = document.createElement('a');
    const file = new Blob([hinglishText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${transcriptionData.title.replace(/[^a-zA-Z0-9 ]/g, '')}_hinglish.srt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download started",
      description: "Your Hinglish SRT file is being downloaded.",
    });
  };
  
  const sendToKnowledgeBase = () => {
    if (!transcriptionData) return;
    
    // Mark as added to knowledge base
    setTranscriptionData({
      ...transcriptionData,
      addedToKnowledgeBase: true
    });
    
    // Display success toast
    toast({
      title: "Success",
      description: `"${transcriptionData.title}" has been sent to your Knowledge Base.`,
    });
  };
  
  // Function to trigger file input click
  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Function to close the transcription modal and start a new one
  const handleCloseTranscription = () => {
    setTranscriptionData(null);
    setMediaLink('');
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <Button 
                variant="ghost" 
                className="mb-4 text-white hover:bg-neutral-800"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              
              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-indigo-400" />
                </div>
                <h1 className="text-3xl font-bold text-white">File to SRT</h1>
              </div>
            </div>
            
            {!transcriptionData ? (
              <div className="max-w-lg mx-auto mb-12">
                <div className="bg-neutral-800 border border-neutral-700 rounded-md p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-indigo-400 mr-2" />
                      <h2 className="text-lg font-medium text-white">Import from Link</h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-neutral-300 text-sm mb-6">
                    Import audio and videos from YouTube, Dropbox, Google Drive, 
                    Facebook, Vimeo, X, audio/video URLs, and dozens more 
                    platforms and services. The link must be publicly accessible.
                  </p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Media Link</label>
                    <Input
                      type="text"
                      placeholder="https://www.youtube.com/watch?v="
                      value={mediaLink}
                      onChange={handleInputChange}
                      className="bg-blue-50 border border-blue-100 text-neutral-800"
                    />
                  </div>
                  
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                    disabled={isLoading}
                    onClick={handleImportFromLink}
                  >
                    {isLoading ? "Importing..." : (
                      <>
                        <span>+</span>
                        <span>IMPORT</span>
                      </>
                    )}
                  </Button>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-neutral-300">Audio / Video File</label>
                      <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white p-0 h-auto">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div 
                      className="border-2 border-dashed border-neutral-600 rounded-md p-6 bg-blue-50 text-center cursor-pointer hover:bg-blue-100 transition"
                      onClick={handleFileButtonClick}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const input = fileInputRef.current;
                          if (input) {
                            input.files = e.dataTransfer.files;
                            const event = new Event('change', { bubbles: true });
                            input.dispatchEvent(event);
                          }
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="audio/*,video/*"
                        className="hidden"
                      />
                      
                      <p className="text-neutral-700 font-medium mb-2">Drag & Drop</p>
                      <p className="text-neutral-600 text-sm mb-4">
                        MP3, MP4, M4A, MOV, AAC, WAV,<br/>
                        OGG, FLAC, WEBM, AMR, WAV
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
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <Card className="bg-neutral-800 border-neutral-700 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="border-b border-neutral-700 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-white">{transcriptionData.title}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-neutral-400 hover:text-white"
                          onClick={handleCloseTranscription}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {transcriptionData.mediaType === 'video' ? (
                        <div className="flex items-center space-x-2">
                          <File className="text-blue-500 h-4 w-4" />
                          <span className="text-sm text-neutral-400">Video File</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <File className="text-blue-500 h-4 w-4" />
                          <span className="text-sm text-neutral-400">Audio File</span>
                        </div>
                      )}
                    </div>
                    
                    {isTranscribing ? (
                      <div className="flex items-center justify-center h-64 bg-neutral-900 rounded-md">
                        <div className="text-neutral-400">Transcribing...</div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2">
                        {/* Left side - Media Player */}
                        <div className="border-r border-neutral-700">
                          <div className="p-6">
                            <h3 className="text-sm font-medium text-neutral-400 mb-3">Audio/video playing here</h3>
                            
                            <div className="aspect-video bg-neutral-700 rounded-md mb-6">
                              {transcriptionData.mediaType === 'video' ? (
                                <video
                                  ref={videoRef}
                                  controls
                                  className="w-full h-full rounded-md"
                                  poster="https://placehold.co/640x360/232323/606060?text=Video+Player"
                                >
                                  <source src={transcriptionData.mediaSource} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-700 p-4 rounded-md">
                                  <div className="w-20 h-20 rounded-full bg-neutral-600 flex items-center justify-center mb-4">
                                    <Play className="h-8 w-8 text-white ml-1" />
                                  </div>
                                  <audio 
                                    ref={audioRef} 
                                    controls 
                                    className="w-full mt-4"
                                  >
                                    <source src={transcriptionData.mediaSource} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                  </audio>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex justify-center">
                              <Button
                                onClick={downloadSRT}
                                className="bg-neutral-700 hover:bg-neutral-600 text-white"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download SRT
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side - SRT Editor */}
                        <div>
                          <div className="p-6">
                            <h3 className="text-sm font-medium text-neutral-400 mb-3">SRT file with timestamps</h3>
                            
                            <div className="bg-neutral-700 rounded-md h-[400px]">
                              <Textarea 
                                value={hinglishText}
                                onChange={handleHinglishTextChange}
                                className="h-full resize-none font-mono text-sm bg-neutral-700 border-none text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="border-t border-neutral-700 p-4 flex justify-between items-center">
                      <Button 
                        onClick={() => setTranscriptionData(null)}
                        variant="outline" 
                        size="sm"
                        className="border-neutral-600 text-neutral-300"
                      >
                        Start New Transcription
                      </Button>
                      
                      <Button
                        onClick={sendToKnowledgeBase}
                        size="sm"
                        className={`${
                          transcriptionData.addedToKnowledgeBase 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                        disabled={transcriptionData.addedToKnowledgeBase}
                      >
                        <Database className="mr-2 h-4 w-4" />
                        {transcriptionData.addedToKnowledgeBase 
                          ? "Added to Knowledge Base" 
                          : "Send to Knowledge Base"
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default HinglishTranscribe;
