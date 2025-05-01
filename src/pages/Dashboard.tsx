
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Bot, Search, Scissors, Star, Mic, Image, Video } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectCard from '@/components/ProjectCard';

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Your 8 primary tools
  const tools = [
    { id: 1, name: 'Batch Transcribe', icon: FileText, description: 'Convert audio and video files to text', comingSoon: false },
    { id: 2, name: 'SRT File - Hinglish', icon: FileText, description: 'Generate subtitle files with Hinglish text', comingSoon: false },
    { id: 3, name: 'Knowledge Bot', icon: Bot, description: 'AI assistant trained on your content', comingSoon: false },
    { id: 4, name: 'Content Suggestion Engine', icon: Search, description: 'Get AI-powered content ideas', comingSoon: false },
    { id: 5, name: 'Script Builder', icon: FileText, description: 'Create compelling scripts for videos', comingSoon: false },
    { id: 6, name: 'Content Analyser', icon: Bot, description: 'Analyze your content performance', comingSoon: false },
    { id: 7, name: 'Viral Reel Cutter', icon: Scissors, description: 'Create engaging short video clips', comingSoon: false },
    { id: 8, name: 'Bonus', icon: Star, description: 'Special features and upcoming tools', comingSoon: true },
  ];

  // Gen AI tools (replacing featuredTools)
  const genAITools = [
    { 
      id: 1,
      name: 'Voice Generation',
      description: 'Generate realistic voices and speech from your text',
      icon: Mic,
      color: 'bg-gradient-to-r from-purple-800 to-indigo-900',
      buttonText: 'Generate Voice'
    },
    { 
      id: 2,
      name: 'Image Generation',
      description: 'Create stunning AI-generated images from your descriptions',
      icon: Image,
      color: 'bg-gradient-to-r from-emerald-800 to-teal-900',
      buttonText: 'Create Image'
    },
    {
      id: 3,
      name: 'Video Generation',
      description: 'Transform your ideas into engaging video content',
      icon: Video,
      color: 'bg-gradient-to-r from-orange-800 to-red-900',
      buttonText: 'Create Video'
    }
  ];

  // Recent projects data 
  const recentProjects = [
    {
      id: 1,
      title: 'ALTYOU',
      editedTime: '1 hour ago',
      image: '/lovable-uploads/3e238a3b-7ec0-47ec-afba-db80bd0d0a50.png',
      userInitial: 'A',
      avatarColor: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Creator tool flow',
      editedTime: '17 days ago',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      userInitial: 'P',
      avatarColor: 'bg-purple-500'
    },
    {
      id: 3,
      title: "Medhansh Jain's team library",
      editedTime: '24 days ago',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      userInitial: 'M',
      avatarColor: 'bg-blue-500'
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
        <ScrollArea className="h-screen">
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

            {/* Main Tools Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            
            {/* Gen AI Tools Section (Previously Popular Features) */}
            <h2 className="text-xl font-semibold text-white mb-4">Gen AI Tools</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {genAITools.map((tool) => (
                <Card 
                  key={tool.id} 
                  className={`${tool.color} border-0 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="p-6 flex flex-col h-[200px] relative">
                    <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                      <p className="text-white/80 text-sm mb-6">{tool.description}</p>
                      
                      <button className="mt-auto px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm font-medium transition-colors">
                        {tool.buttonText}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Recent Projects Section */}
            <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 pb-8">
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  image={project.image}
                  title={project.title}
                  editedTime={project.editedTime}
                  userInitial={project.userInitial}
                  avatarColor={project.avatarColor}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Dashboard;
