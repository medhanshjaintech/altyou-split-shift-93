
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Download, BarChart2, ArrowRightLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

type AnalysisSection = {
  title: string;
  content: string;
};

const ContentAnalysisResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [comparisonDialogOpen, setComparisonDialogOpen] = useState(false);
  
  // Extract channelName from location state or use default
  const channelName = location.state?.channelName || "PewDiePie";
  
  // Mock analysis data sections
  const analysisSections: AnalysisSection[] = [
    {
      title: "What's the hook",
      content: "The channel consistently uses curiosity-driven hooks in the first 15 seconds, posing questions or making bold claims that require viewers to watch further for resolution. Most successful videos begin with a surprising statistic or counterintuitive statement, followed by a promise to reveal unknown information. This pattern creates a knowledge gap that viewers feel compelled to fill by continuing to watch."
    },
    {
      title: "Script flow",
      content: "Content follows a consistent three-act structure: problem introduction (20% of runtime), exploration of solutions (60%), and actionable conclusion (20%). Top-performing videos maintain tight pacing with new information or visual changes every 15-20 seconds. Scripts use frequent callbacks to earlier points and foreshadowing to maintain viewer engagement. The most successful videos incorporate a mid-point twist or revelation that recontextualizes the initial premise."
    },
    {
      title: "Language flow and tone",
      content: "Analysis shows a conversational, slightly informal tone with frequent use of first and second person pronouns. Videos average 165-180 words per minute, with deliberate pauses before key points. Language complexity sits at approximately 8th-grade reading level, making content broadly accessible. Emotional tone shifts strategically throughout videos, with humor used as a tension release after more complex explanations."
    },
    {
      title: "Visual styles and cues",
      content: "The channel employs a consistent visual language with 5-7 recurring graphical elements. Color palette centers around purple/blue tones (#9b87f5, #6E59A5) for brand consistency. Text on screen rarely exceeds 5-7 words per frame and appears for average of 3.2 seconds. B-roll footage is used extensively during explanatory segments. Camera movement is minimal during key informational points but increases during transitional segments."
    }
  ];

  // Mock improvement points for comparison
  const improvementPoints = [
    "Your hook engagement time (first 15 seconds) averages 68% viewer retention compared to 81% for competitor channels. Consider introducing key information earlier in your videos.",
    "Your videos use 20% less B-roll footage than top-performing channels in your niche. Increasing visual variety could improve engagement metrics.",
    "Audio quality metrics show competitor channels have 30% less background noise. Consider using a noise reduction filter or upgrading microphone equipment.",
    "Your video descriptions average 85 words versus 165 words for competitor channels. Longer descriptions with timestamps and relevant keywords may improve searchability."
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const downloadReport = () => {
    setIsGeneratingPDF(true);
    toast({
      title: "Generating report",
      description: "Your content analysis report is being generated...",
    });

    // Simulate PDF generation
    setTimeout(() => {
      setIsGeneratingPDF(false);
      toast({
        title: "Report ready",
        description: "Your content analysis report has been downloaded.",
      });
      
      // Create a fake PDF download
      const blob = new Blob(['Fake PDF content'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${channelName}-content-analysis.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 2000);
  };

  const compareContent = () => {
    setComparisonDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8 max-w-4xl">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/content-analyser')}
                className="mr-2"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              <h1 className="text-3xl font-bold text-white">Content Analysis</h1>
            </div>

            <div className="mb-12 text-center">
              <h2 className="text-2xl font-semibold text-white italic mb-8">
                {channelName}
              </h2>
            </div>
            
            {/* Analysis sections */}
            <div className="space-y-10">
              {analysisSections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-medium text-blue-400 mb-3">
                    {section.title}
                  </h3>
                  <div className="bg-neutral-800/50 p-6 rounded-lg">
                    <p className="text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Call to action */}
            <div className="mt-16 mb-12 flex flex-col items-center gap-6">
              <p className="text-lg text-white italic">
                Want to analyse and compare your content?
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={downloadReport}
                  disabled={isGeneratingPDF}
                  className="bg-neutral-700 hover:bg-neutral-600 px-6 py-2 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download report
                </Button>
                
                <Button 
                  onClick={compareContent}
                  className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-white"
                >
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Compare your content
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Content Comparison Dialog */}
        <Dialog open={comparisonDialogOpen} onOpenChange={setComparisonDialogOpen}>
          <DialogContent className="bg-neutral-800 border-neutral-700 text-white sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-white mb-6">
                Content Comparison
              </DialogTitle>
            </DialogHeader>
            
            {/* Comparison content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your channel */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 italic text-gray-200">Your Channel</h3>
                <div className="bg-neutral-700/50 w-full aspect-square rounded-md flex items-center justify-center mb-4">
                  <div className="text-center p-4">
                    <FileText className="h-12 w-12 text-indigo-400 mx-auto mb-2" />
                    <div className="space-y-2">
                      <p className="font-medium">Average View Duration: 6:42</p>
                      <p className="font-medium">Engagement Rate: 7.2%</p>
                      <p className="font-medium">Publishing Frequency: 1.5/week</p>
                      <p className="font-medium">Avg. Likes per Video: 5.4K</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitor channel */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 italic text-gray-200">Competitor Channel</h3>
                <div className="bg-neutral-700/50 w-full aspect-square rounded-md flex items-center justify-center mb-4">
                  <div className="text-center p-4">
                    <FileText className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <div className="space-y-2">
                      <p className="font-medium">Average View Duration: 8:15</p>
                      <p className="font-medium">Engagement Rate: 9.3%</p>
                      <p className="font-medium">Publishing Frequency: 2/week</p>
                      <p className="font-medium">Avg. Likes per Video: 7.8K</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement points */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 italic text-gray-200">Points Where You Can Improve</h3>
              <div className="bg-neutral-700/50 rounded-md p-6">
                <ul className="space-y-4 text-gray-200">
                  {improvementPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Close button */}
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={() => setComparisonDialogOpen(false)}
                className="bg-neutral-700 hover:bg-neutral-600 px-8"
              >
                Close Comparison
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default ContentAnalysisResult;
