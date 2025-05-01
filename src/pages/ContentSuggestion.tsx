
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const ContentSuggestion = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock trending topics
  const trendingTopics = [
    "AI in Healthcare",
    "Sustainable Living",
    "Web3 Development",
    "Remote Work Productivity"
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a topic to search for.",
      });
      return;
    }
    
    // In a real implementation, this would trigger an API call
    toast({
      title: "Searching for content ideas",
      description: `Finding suggestions related to "${searchQuery}"`,
    });
    console.log("Searching for:", searchQuery);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">Content Suggestion</h1>
            </div>
            
            {/* Content Suggestion Tool */}
            <div className="max-w-3xl mx-auto">
              <div className="glass-card p-10 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-hanson tracking-wider text-white text-2xl font-extrabold">altyou</span>
                  <div className="ml-auto w-5 h-5 bg-white rounded-full"></div>
                </div>
                
                <div className="flex flex-col items-center justify-center py-10">
                  <h2 className="text-white text-xl font-medium mb-8">What would you like to talk about today?</h2>
                  
                  <div className="w-full max-w-md flex items-center">
                    <Input
                      className="bg-white/20 border-0 text-white focus-visible:ring-white/40 placeholder:text-white/50"
                      placeholder="Enter a topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-2 text-white"
                      onClick={handleSearch}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="w-full max-w-md mt-16">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-full border-t border-white/20"></div>
                      <span className="text-white/70 text-sm px-4 whitespace-nowrap">Trending Topics</span>
                    </div>
                    
                    <div className="space-y-3">
                      {trendingTopics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 border-b border-white/10 pb-2">
                          <TrendingUp className="h-4 w-4 text-white/50" />
                          <span className="text-white/80 text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default ContentSuggestion;
