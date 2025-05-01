
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
        <div className="container mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-16 text-left">Content Suggestion</h1>
          
          <div className="flex flex-col w-full max-w-2xl mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-medium mb-12 text-center">What would you like to talk about today?</h2>
            
            <div className="w-full flex items-center mb-20">
              <Input
                className="bg-white/10 border-0 text-white h-14 text-lg focus-visible:ring-white/40 placeholder:text-white/50"
                placeholder="Enter a topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="ml-4 text-white h-14 w-14"
                onClick={handleSearch}
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="w-full mt-6">
              <div className="flex justify-between items-center mb-10">
                <div className="w-full border-t border-white/20"></div>
                <span className="text-white/70 text-base px-6 whitespace-nowrap">Trending Topics</span>
                <div className="w-full border-t border-white/20"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {trendingTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-md hover:bg-white/10 cursor-pointer transition-colors"
                    onClick={() => {
                      setSearchQuery(topic);
                      handleSearch();
                    }}
                  >
                    <TrendingUp className="h-5 w-5 text-white/50" />
                    <span className="text-white/90 text-lg">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
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
