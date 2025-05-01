
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Bot, Search, Scissors, Star, LayoutDashboard, Folder, LayoutTemplate } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const tools = [
    { id: 1, name: 'Batch Transcribe', icon: FileText, description: 'Convert audio and video files to text', comingSoon: false },
    { id: 2, name: 'SRT File - Hinglish', icon: FileText, description: 'Generate subtitle files with Hinglish text', comingSoon: false },
    { id: 3, name: 'Knowledge Bot', icon: Bot, description: 'AI assistant trained on your content', comingSoon: false },
    { id: 4, name: 'Content Suggestion Engine', icon: Search, description: 'Get AI-powered content ideas', comingSoon: false },
    { id: 5, name: 'Script Builder', icon: FileText, description: 'Create compelling scripts for videos', comingSoon: false },
    { id: 6, name: 'Content Analyser', icon: FileText, description: 'Analyze your content performance', comingSoon: false },
    { id: 7, name: 'Viral Reel Cutter', icon: Scissors, description: 'Create engaging short video clips', comingSoon: false },
    { id: 8, name: 'Bonus', icon: Star, description: 'Special features and upcoming tools', comingSoon: true },
  ];

  const featuredTools = [
    { 
      title: 'Text to AI video',
      description: 'Describe your idea and get a video with voiceover and visuals',
      image: null,
      gradient: 'bg-gradient-to-r from-slate-800 to-slate-900'
    },
    { 
      title: 'Create with AI speaker',
      description: 'Have an avatar present your script—no need to record',
      image: 'public/lovable-uploads/5b4f74cb-9647-4976-b745-447aa79a6dcc.png',
      gradient: 'bg-gradient-to-r from-gray-900 to-slate-900'
    }
  ];

  const handleToolClick = (toolId: number) => {
    toast({
      title: "Coming soon!",
      description: "This feature will be available shortly.",
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">What do you want to do?</h1>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md text-white">
                Record
              </button>
              <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100">
                New Project
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-orange-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M16 10L12 14L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white">Edit a video</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-green-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="text-white">Make a podcast</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-red-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M15 10L19 6M19 6H15M19 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white">Create social clips</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-blue-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M9 12H15M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white">Transcribe a file</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-purple-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M11 6L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 10L13 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 14L13 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 18L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-white">Clean up audio</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-pink-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white">Add captions</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-sky-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <span className="text-white">Fix eye contact</span>
              </div>
            </Card>
            
            <Card className="p-4 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition">
              <div className="flex items-center gap-3">
                <div className="text-emerald-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.2" />
                    <path d="M7 8L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 12L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7 16L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-white">Translate & dub video</span>
              </div>
            </Card>
          </div>

          <h2 className="text-xl font-semibold text-white mb-4">Popular features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {featuredTools.map((tool, index) => (
              <Card key={index} className={`p-6 cursor-pointer ${tool.gradient} border-0 transition h-64 flex flex-col justify-between relative overflow-hidden`}>
                <div className="z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-300">{tool.description}</p>
                </div>
                
                {index === 0 && (
                  <div className="z-10 mt-4 flex items-center space-x-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <span className="text-white text-sm">Generate</span>
                    </div>
                  </div>
                )}
                
                {tool.image && (
                  <div className="absolute right-4 bottom-4">
                    <div className="flex space-x-[-15px]">
                      <div className="h-12 w-12 rounded-full bg-orange-500 border-2 border-black"></div>
                      <div className="h-12 w-12 rounded-full bg-pink-400 border-2 border-black"></div>
                      <div className="h-12 w-12 rounded-full bg-blue-400 border-2 border-black"></div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-4">Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Card 
                key={tool.id} 
                className="p-6 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition"
                onClick={() => handleToolClick(tool.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-indigo-600/20 flex items-center justify-center mb-4">
                    <tool.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                  {tool.comingSoon && (
                    <span className="mt-3 text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
