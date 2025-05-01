
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, TrendingUp, Play, Youtube } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';

// Mock data for top performing videos
const mockTopVideos = [
  {
    id: 'vid1',
    title: 'How to Grow Your YouTube Channel in 2025',
    views: '1.2M',
    likes: '45K',
    duration: '15:42',
    publishedDate: '2025-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    engagement: '8.7%',
    performanceScore: 92
  },
  {
    id: 'vid2',
    title: 'Content Creation Masterclass: Storytelling Techniques',
    views: '876K',
    likes: '38K',
    duration: '22:18',
    publishedDate: '2025-02-03',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    engagement: '7.2%',
    performanceScore: 85
  },
  {
    id: 'vid3',
    title: 'The Ultimate Guide to Video Editing on Mobile',
    views: '654K',
    likes: '29K',
    duration: '18:05',
    publishedDate: '2025-03-10',
    thumbnail: 'https://images.unsplash.com/photo-1601977133940-454413a36bd4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    engagement: '6.8%',
    performanceScore: 79
  },
  {
    id: 'vid4',
    title: '5 Content Ideas That Went Viral in 2025',
    views: '932K',
    likes: '41K',
    duration: '12:47',
    publishedDate: '2025-04-18',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    engagement: '8.1%',
    performanceScore: 88
  }
];

const ContentAnalyser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a YouTube video or channel link",
        variant: "destructive",
      });
      return;
    }

    // Validate if the input is a YouTube URL
    if (!inputValue.includes('youtube.com') && !inputValue.includes('youtu.be')) {
      toast({
        title: "Invalid YouTube URL",
        description: "Please enter a valid YouTube video or channel link",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setSearchPerformed(true);
    }, 1500);
  };

  const analyzeContent = (videoId: string) => {
    toast({
      title: "Analysis started",
      description: "Analyzing content of the selected video...",
    });
    
    // Navigate to a detailed analysis page (to be implemented)
    // For now just show a toast
    setTimeout(() => {
      toast({
        title: "Analysis complete",
        description: "Content analysis report is ready",
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              <h1 className="text-3xl font-bold text-white">Content Analyser</h1>
            </div>

            <div className="bg-neutral-900 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Analyze YouTube Content</h2>
              <p className="text-gray-400 mb-6">
                Enter a YouTube video or channel link to analyze the content performance and get insights.
              </p>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Enter YouTube video or channel URL"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isLoading ? "Searching..." : "Search"}
                  <Search className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {searchPerformed && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Top Performing Content</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Based on engagement and views</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                  {mockTopVideos.map((video) => (
                    <Card key={video.id} className="bg-neutral-800 border-0 overflow-hidden">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Score: {video.performanceScore}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-white font-medium text-lg mb-2 line-clamp-2">{video.title}</h3>
                        
                        <div className="flex justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Youtube className="h-4 w-4" />
                            <span>{video.views} views</span>
                          </div>
                          <div>Published: {video.publishedDate}</div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-green-500 font-medium">{video.engagement}</span>
                            <span className="text-gray-400"> engagement rate</span>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => analyzeContent(video.id)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            Analyze
                            <Play className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default ContentAnalyser;
