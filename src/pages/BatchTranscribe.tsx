
import { useState } from 'react';
import { FileText, Youtube, ArrowLeft, Search, Plus, Mic, Video, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  selected: boolean;
}

interface TranscriptionItem {
  videoId: string;
  videoTitle: string;
  content: string;
  isCompleted: boolean;
}

const BatchTranscribe = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!youtubeUrl) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setShowResults(false);
    
    // Mock fetching videos - in a real app this would call an API
    setTimeout(() => {
      // Check if it's a single video or channel
      if (youtubeUrl.includes('youtube.com/watch') || youtubeUrl.includes('youtu.be/')) {
        // Single video
        const mockVideo = {
          id: 'sample-id-1',
          title: 'How to Master AI Tools in 2024',
          thumbnail: 'https://i.ytimg.com/vi/sample-id-1/maxresdefault.jpg',
          duration: '12:34',
          selected: false
        };
        setVideos([mockVideo]);
      } else {
        // Assume it's a channel
        const mockVideos = [
          {
            id: 'sample-id-1',
            title: 'How to Master AI Tools in 2024',
            thumbnail: 'https://i.ytimg.com/vi/sample-id-1/maxresdefault.jpg',
            duration: '12:34',
            selected: false
          },
          {
            id: 'sample-id-2',
            title: 'Creating Content with AI - Tips & Tricks',
            thumbnail: 'https://i.ytimg.com/vi/sample-id-2/maxresdefault.jpg',
            duration: '8:21',
            selected: false
          },
          {
            id: 'sample-id-3',
            title: 'The Future of AI Content Creation',
            thumbnail: 'https://i.ytimg.com/vi/sample-id-3/maxresdefault.jpg',
            duration: '15:47',
            selected: false
          },
          {
            id: 'sample-id-4',
            title: 'YouTube SEO Strategies for 2024',
            thumbnail: 'https://i.ytimg.com/vi/sample-id-4/maxresdefault.jpg',
            duration: '10:02',
            selected: false
          }
        ];
        setVideos(mockVideos);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const toggleVideoSelection = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, selected: !video.selected } : video
    ));
  };
  
  const handleTranscribe = () => {
    const selectedVideos = videos.filter(video => video.selected);
    
    if (selectedVideos.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one video to transcribe",
        variant: "destructive",
      });
      return;
    }
    
    setIsTranscribing(true);
    setTranscriptions([]);
    
    toast({
      title: "Starting transcription",
      description: `Transcribing ${selectedVideos.length} videos. This may take some time.`,
    });
    
    // Mock transcription process
    let completedCount = 0;
    
    selectedVideos.forEach((video, index) => {
      // Create mock transcriptions for each selected video
      const mockTranscription: TranscriptionItem = {
        videoId: video.id,
        videoTitle: video.title,
        content: '',
        isCompleted: false
      };
      
      setTranscriptions(prev => [...prev, mockTranscription]);
      
      // Simulate transcription process with delay
      setTimeout(() => {
        // Mock SRT content
        const srtContent = generateMockSRT(video.title);
        
        setTranscriptions(prev => 
          prev.map(t => 
            t.videoId === video.id 
              ? { ...t, content: srtContent, isCompleted: true } 
              : t
          )
        );
        
        completedCount++;
        if (completedCount === selectedVideos.length) {
          setIsTranscribing(false);
          setShowResults(true);
          toast({
            title: "Transcription complete",
            description: `Successfully transcribed ${selectedVideos.length} videos.`,
          });
        }
      }, 2000 + (index * 1000)); // Stagger the completion times
    });
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
  
  const downloadTranscription = (videoId: string, title: string, content: string) => {
    // Create a file from the transcription content
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/[^a-zA-Z0-9 ]/g, '')}_transcription.srt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download started",
      description: "Your transcription file is being downloaded.",
    });
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
                <h1 className="text-3xl font-bold text-white">Batch Transcribe</h1>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto mb-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-10">What should I transcribe for you?</h2>
                
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                  <div className="relative">
                    <div className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden">
                      <div className="flex items-center px-4 py-3">
                        <Input
                          type="text"
                          placeholder="Paste YouTube video or channel URL"
                          value={youtubeUrl}
                          onChange={handleInputChange}
                          className="bg-transparent border-0 text-white text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                        />
                        <Button type="submit" disabled={isLoading} size="sm" className="ml-2 bg-indigo-600 hover:bg-indigo-700">
                          {isLoading ? "Loading..." : "Fetch Videos"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {!showResults && videos.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {videos.length === 1 ? "1 Video Found" : `${videos.length} Videos Found`}
                </h3>
                
                <div className="space-y-4 mb-8">
                  {videos.map((video) => (
                    <Card key={video.id} className="bg-neutral-800 border-neutral-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center h-5">
                            <Checkbox 
                              id={`video-${video.id}`}
                              checked={video.selected}
                              onCheckedChange={() => toggleVideoSelection(video.id)}
                            />
                          </div>
                          
                          <div className="relative w-40 h-24 overflow-hidden rounded-md">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="object-cover w-full h-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://placehold.co/640x360/232323/606060?text=Thumbnail";
                              }}
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <label 
                              htmlFor={`video-${video.id}`}
                              className="text-base font-medium text-white cursor-pointer hover:text-indigo-400 transition-colors"
                            >
                              {video.title}
                            </label>
                          </div>
                          
                          <Youtube className="text-red-500 h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={handleTranscribe} 
                    size="lg" 
                    className="bg-indigo-600 hover:bg-indigo-700"
                    disabled={isTranscribing}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {isTranscribing ? "Transcribing..." : "Transcribe Selected Videos"}
                  </Button>
                </div>
              </div>
            )}
            
            {showResults && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Transcription Results</h3>
                
                <div className="space-y-6 mb-8">
                  {transcriptions.map((transcription) => (
                    <Card key={transcription.videoId} className="bg-neutral-800 border-neutral-700">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h4 className="text-lg font-medium text-white mb-2">{transcription.videoTitle}</h4>
                          <div className="flex items-center space-x-2 mb-4">
                            <Youtube className="text-red-500 h-4 w-4" />
                            <span className="text-sm text-neutral-400">Transcription {transcription.isCompleted ? 'completed' : 'in progress...'}</span>
                          </div>
                        </div>
                        
                        {transcription.isCompleted ? (
                          <>
                            <div className="bg-neutral-900 rounded-md p-3 mb-4 h-64 overflow-auto font-mono text-sm text-neutral-300">
                              <pre>{transcription.content}</pre>
                            </div>
                            
                            <div className="flex justify-end">
                              <Button
                                onClick={() => downloadTranscription(
                                  transcription.videoId,
                                  transcription.videoTitle,
                                  transcription.content
                                )}
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download SRT
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-32 bg-neutral-900 rounded-md">
                            <div className="text-neutral-400">Transcribing...</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    onClick={() => {
                      setShowResults(false);
                      setTranscriptions([]);
                    }} 
                    variant="outline" 
                    size="sm"
                  >
                    Back to Videos
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setVideos([]);
                      setTranscriptions([]);
                      setYoutubeUrl('');
                      setShowResults(false);
                    }} 
                    variant="outline" 
                    size="sm"
                  >
                    Start New Batch
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default BatchTranscribe;
