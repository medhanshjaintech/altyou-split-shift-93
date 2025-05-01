
import { useState } from 'react';
import { FileText, Youtube, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  selected: boolean;
}

const BatchTranscribe = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  
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
    
    toast({
      title: "Starting transcription",
      description: `Transcribing ${selectedVideos.length} videos. This may take some time.`,
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
            
            <div className="mb-12 max-w-4xl">
              <h2 className="text-2xl font-semibold text-white mb-6">What would you like to transcribe?</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Paste YouTube video or channel URL"
                      value={youtubeUrl}
                      onChange={handleInputChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Fetch Videos"}
                  </Button>
                </div>
              </form>
            </div>
            
            {videos.length > 0 && (
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
                  <Button onClick={handleTranscribe} size="lg">
                    <FileText className="mr-2 h-4 w-4" />
                    Transcribe Selected Videos
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
