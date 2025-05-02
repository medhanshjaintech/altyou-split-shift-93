
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';

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

  const generateScriptWithAI = () => {
    // Generate custom instructions based on analysis
    const customInstructions = `
Based on content analysis for ${channelName}:

1. Use curiosity-driven hooks in the first 15 seconds
2. Follow three-act structure (20% intro, 60% solutions, 20% conclusion) 
3. Maintain conversational tone with 165-180 words per minute
4. Incorporate strategic emotional shifts with humor as tension release
5. Include mid-point twist that recontextualizes the initial premise`;

    // Create context from analysis sections
    const contextContent = analysisSections.map(section => 
      `${section.title}: ${section.content}`
    ).join("\n\n");

    // Navigate to script builder with pre-filled data
    navigate('/script-builder', {
      state: {
        from: 'content-analysis',
        searchQuery: `${channelName} Content Script`,
        context: `This script is based on content analysis of ${channelName}'s channel. The analysis shows effective patterns in hooks, script flow, language tone, and visual cues that drive high engagement.\n\n${contextContent}`,
        instructions: customInstructions,
        hasTranscriptFile: true,
        fileName: `${channelName}-transcript.txt`
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8 max-w-6xl">
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
                  <div className="bg-neutral-800/50 p-8 rounded-lg">
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
                Want to create content based on this analysis?
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={downloadReport}
                  disabled={isGeneratingPDF}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white px-8 py-2"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download report
                </Button>
                
                <Button 
                  onClick={generateScriptWithAI}
                  className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate script with AI
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default ContentAnalysisResult;
