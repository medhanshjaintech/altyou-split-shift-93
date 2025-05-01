
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const ContentSuggestion = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock trending topics
  const trendingTopics = [
    "AI in Healthcare",
    "Sustainable Living",
    "Web3 Development",
    "Remote Work Productivity",
    "Digital Minimalism",
    "Future of Education",
    "Mental Health Awareness",
    "Smart Home Technology"
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center">
      <ScrollArea className="h-full w-full">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="glass-card p-8 md:p-12 rounded-lg">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-12 text-center">Content Suggestion</h1>
            
            <div className="flex flex-col items-center justify-center py-8">
              <h2 className="text-white text-xl md:text-2xl font-medium mb-8">What would you like to talk about today?</h2>
              
              <div className="w-full max-w-md flex items-center">
                <Input
                  className="bg-white/20 border-0 text-white focus-visible:ring-white/40 placeholder:text-white/50"
                  placeholder="Enter a topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
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
                <div className="flex justify-between items-center mb-6">
                  <div className="w-full border-t border-white/20"></div>
                  <span className="text-white/70 text-sm px-4 whitespace-nowrap">Trending Topics</span>
                  <div className="w-full border-t border-white/20"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trendingTopics.map((topic, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-2 p-3 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
                      onClick={() => {
                        setSearchQuery(topic);
                        handleSearch();
                      }}
                    >
                      <TrendingUp className="h-4 w-4 text-white/50" />
                      <span className="text-white/80">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white"
              onClick={() => navigate(-1)}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContentSuggestion;
