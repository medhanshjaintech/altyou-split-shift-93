import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchResult {
  title: string;
  summary: string;
  articles: Array<{
    title: string;
    summary: string;
  }>;
  impactFactor: string;
}

const ContentSuggestion = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  // Mock trending topics
  const trendingTopics = ["AI in Healthcare", "Sustainable Living", "Web3 Development", "Remote Work Productivity", "Digital Minimalism", "Future of Education", "Mental Health Awareness", "Smart Home Technology"];
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Empty search",
        description: "Please enter a topic to search for."
      });
      return;
    }

    // Simulate API call with loading state
    setIsLoading(true);
    toast({
      title: "Searching for content ideas",
      description: `Finding suggestions related to "${searchQuery}"`
    });

    // Simulate API delay
    setTimeout(() => {
      // Mock search result data with more detailed articles
      const mockResult: SearchResult = {
        title: searchQuery,
        summary: "This topic has high engagement rates across social media platforms and is currently trending in online discussions. Content on this subject typically receives 30% more views than average.",
        articles: [
          {
            title: "The Evolution and Future Trends",
            summary: "Exploring the historical development and anticipated future directions of this field, highlighting key innovations and breakthroughs."
          },
          {
            title: "Practical Applications in Everyday Life",
            summary: "Examining real-world implementations and how they impact daily experiences, with case studies from industry leaders."
          },
          {
            title: "Comparative Analysis with Alternative Approaches",
            summary: "Contrasting different methodologies and solutions, providing a balanced perspective on strengths and limitations."
          }
        ],
        impactFactor: "High engagement potential with 65% audience retention. Trending across Instagram and TikTok with significant growth in search volume over the past 30 days."
      };
      setSearchResult(mockResult);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGenerateScript = () => {
    toast({
      title: "Generating script",
      description: "Creating content script based on the search results..."
    });
    // In a real implementation, this would trigger script generation
  };

  return <div className="fixed inset-0 bg-[#121212] flex items-center justify-center">
      <ScrollArea className="h-full w-full">
        <div className="container mx-auto max-w-7xl px-6 py-[210px]">
          <div className="flex flex-col w-full max-w-3xl mx-auto">
            <h2 className="text-white text-5xl font-medium mb-8 text-center md:text-5xl">What would you like to talk about today?</h2>
            
            <div className="w-full flex items-center mb-2">
              <Input placeholder="Enter a topic..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} className="bg-white/10 border-0 text-white h-14 text-lg focus-visible:ring-white/40 placeholder:text-white/50 rounded-md" />
              <Button variant="ghost" size="icon" className="ml-4 text-white h-14 w-14" onClick={handleSearch}>
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
            
            {!searchResult && !isLoading && <div className="w-full mt-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-full border-t border-white/20"></div>
                  <span className="text-white/70 text-base px-6 whitespace-nowrap">Trending Topics</span>
                  <div className="w-full border-t border-white/20"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-[21px] px-[27px]">
                  {trendingTopics.map((topic, index) => <div key={index} className="flex items-center gap-3 p-4 rounded-md hover:bg-white/10 cursor-pointer transition-colors" onClick={() => {
                setSearchQuery(topic);
                handleSearch();
              }}>
                      <TrendingUp className="h-5 w-5 text-white/50" />
                      <span className="text-white/90 text-lg">{topic}</span>
                    </div>)}
                </div>
              </div>}

            {isLoading && <div className="mt-12 space-y-6">
                <Skeleton className="h-8 w-1/3 bg-white/10" />
                <Skeleton className="h-48 w-full bg-white/10" />
                <Skeleton className="h-12 w-1/4 bg-white/10" />
                <Skeleton className="h-32 w-full bg-white/10" />
              </div>}

            {searchResult && <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-white text-3xl font-medium">
                    {searchResult.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <Card className="bg-white/10 border-0 text-white p-6 rounded-md">
                        <p className="text-white/90">{searchResult.impactFactor}</p>
                      </Card>
                      
                      <Card className="bg-[#1E88E5]/10 border border-[#1E88E5]/40 text-white p-6 rounded-md">
                        <div className="flex gap-2 items-start">
                          <FileText className="h-5 w-5 text-[#1E88E5] mt-1" />
                          <div>
                            <h3 className="text-lg font-medium mb-2">Suggested Articles</h3>
                            <div className="space-y-4">
                              {searchResult.articles.map((article, index) => (
                                <div key={index} className="border-l-2 border-[#1E88E5]/60 pl-3">
                                  <h4 className="font-medium text-white">{article.title}</h4>
                                  <p className="text-white/80 text-sm mt-1">{article.summary}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>

                      <Card className="bg-white/10 border-0 text-white p-6 rounded-md">
                        <h3 className="text-lg mb-2">Additional Reference Material</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2">
                          <li>Latest research papers from industry experts</li>
                          <li>Competitor content analysis and gap identification</li>
                          <li>Social media engagement metrics and audience demographics</li>
                        </ul>
                      </Card>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <Card className="bg-white/10 border-0 text-white h-full p-6 rounded-md">
                      <h3 className="text-lg font-medium mb-4">Content Summary</h3>
                      <p className="text-white/80">{searchResult.summary}</p>
                    </Card>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button onClick={handleGenerateScript} className="bg-white/10 hover:bg-white/20 text-white border-0">
                    Generate Script
                  </Button>
                </div>
              </div>}
          </div>

          {!searchResult && <div className="mt-14 flex justify-center">
              <Button variant="outline" className="text-white/70 border-white/20 hover:bg-white/10 hover:text-white" onClick={() => navigate(-1)}>
                Back to Dashboard
              </Button>
            </div>}
        </div>
      </ScrollArea>
    </div>;
};

export default ContentSuggestion;
