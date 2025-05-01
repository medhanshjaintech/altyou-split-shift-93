import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Download, FileText, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
type VideoClip = {
  id: number;
  name: string;
  transcript: string;
  startTime: string;
  endTime: string;
  reason: string;
};
const ViralReelResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Get video title from location state or use default
  const videoTitle = location.state?.videoTitle || "How I Built a Million-Dollar Business in 30 Days";
  const contentType = location.state?.contentType || "youtube";

  // Mock clip data with timestamps and fake information
  const videoClips: VideoClip[] = [{
    id: 1,
    name: "Key Business Insight",
    transcript: "The most crucial insight I discovered was that you need to solve a real pain point. Most businesses fail because they create solutions looking for problems. [00:02:15] I identified three market gaps that nobody was addressing, and that's where I found the opportunity.",
    startTime: "00:02:10",
    endTime: "00:02:45",
    reason: "This clip contains a powerful insight that contradicts common startup advice, making it highly shareable among entrepreneurs and business enthusiasts."
  }, {
    id: 2,
    name: "Surprising Revenue Strategy",
    transcript: "Everyone told me to focus on advertising revenue, but I went completely against that advice. [00:08:32] Instead, I built a community-first approach where members supported each other and the monetization came naturally through partnerships.",
    startTime: "00:08:25",
    endTime: "00:09:10",
    reason: "The counterintuitive revenue approach challenges conventional wisdom, making this clip perfect for generating discussion and shares."
  }, {
    id: 3,
    name: "Biggest Failure Moment",
    transcript: "The darkest moment was day 17 when our servers crashed and we lost $20,000 in potential sales. [00:15:42] I thought it was over, but that failure forced us to rebuild with a much better infrastructure that ultimately handled 10x the traffic.",
    startTime: "00:15:35",
    endTime: "00:16:20",
    reason: "Vulnerability and comeback stories perform exceptionally well on social media, particularly when they show resilience after a significant setback."
  }, {
    id: 4,
    name: "Unexpected Marketing Hack",
    transcript: "Instead of traditional marketing, we created controversy by challenging the industry leader publicly. [00:23:18] Our comparison video got picked up by three major publications, resulting in 50,000 new visitors in a single day.",
    startTime: "00:23:10",
    endTime: "00:23:55",
    reason: "This clip has high viral potential because it reveals an unconventional marketing approach that generated dramatic results."
  }];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleDownload = (clipId: number) => {
    // Find the clip
    const clip = videoClips.find(c => c.id === clipId);
    if (!clip) return;
    toast({
      title: "Download started",
      description: `Downloading "${clip.name}" clip...`
    });

    // In a real app, this would download the actual clip
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `"${clip.name}" has been downloaded successfully.`
      });
    }, 2000);
  };
  const handleBackToEditor = () => {
    navigate('/viral-reel-cutter');
  };
  return <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8 max-w-5xl">
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="icon" onClick={handleBackToEditor} className="mr-2">
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              <h1 className="text-3xl font-bold text-white">Viral Reel Results</h1>
            </div>

            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold text-white mb-4 font-handwriting">
                {videoTitle}
              </h2>
              <p className="text-gray-400">
                Source: {contentType === 'youtube' ? 'YouTube Video' : contentType === 'audio' ? 'Audio File' : 'Transcript File'}
              </p>
            </div>
            
            {/* Video clips */}
            <div className="space-y-12">
              {videoClips.map(clip => <div key={clip.id} className="mb-8">
                  <h3 className="text-xl font-medium text-white mb-3">
                    {clip.name}
                  </h3>
                  <div className="bg-neutral-800/50 p-6 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-sm text-gray-400">
                        {clip.startTime} - {clip.endTime}
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {clip.transcript}
                    </p>
                    <div className="flex justify-between items-center">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="link" className="text-indigo-400 p-0 h-auto">
                            Why this will work
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="bg-neutral-900 border-neutral-800">
                          <p className="text-sm text-gray-300">{clip.reason}</p>
                        </HoverCardContent>
                      </HoverCard>
                      
                      <Button onClick={() => handleDownload(clip.id)} className="bg-neutral-700 hover:bg-neutral-600 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        Download SRT and clipped video
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>
            
            {/* Bottom action button */}
            <div className="mt-16 mb-12 flex justify-center">
              <Button onClick={handleBackToEditor} className="bg-indigo-600 hover:bg-indigo-700 px-8 py-6 text-lg text-white">
                Process Another Video
              </Button>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>;
};
export default ViralReelResults;