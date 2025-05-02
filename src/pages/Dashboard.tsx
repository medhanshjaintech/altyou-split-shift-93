import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Scissors, Star, Mic, Image, Video, ChartBar, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectCard from '@/components/ProjectCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Project {
  id: number;
  title: string;
  editedTime: string;
  image?: string;
  userInitial?: string;
  avatarColor?: string;
}

const Dashboard = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProjectsDialogOpen, setIsProjectsDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Your 8 primary tools
  const tools = [{
    id: 1,
    name: 'Batch Transcribe',
    icon: FileText,
    description: 'Convert audio and video files to text',
    comingSoon: false,
    path: '/batch-transcribe'
  }, {
    id: 2,
    name: 'SRT File - Hinglish',
    icon: FileText,
    description: 'Generate subtitle files with Hinglish text',
    comingSoon: false,
    path: '/hinglish-transcribe'
  }, {
    id: 3,
    name: 'Knowledge Bot',
    icon: Star,
    description: 'Chat with your content using AI personas',
    comingSoon: false,
    path: '/knowledge-bot'
  }, {
    id: 4,
    name: 'Content Suggestion Engine',
    icon: Search,
    description: 'Get AI-powered content ideas',
    comingSoon: false,
    path: '/content-suggestion'
  }, {
    id: 5,
    name: 'Script Builder',
    icon: FileText,
    description: 'Create compelling scripts for videos',
    comingSoon: false,
    path: '/script-builder'
  }, {
    id: 6,
    name: 'Content Analyser',
    icon: ChartBar,
    description: 'Analyze your content performance',
    comingSoon: false,
    path: '/content-analyser'
  }, {
    id: 7,
    name: 'Viral Reel Cutter',
    icon: Scissors,
    description: 'Create engaging short video clips',
    comingSoon: false,
    path: '/viral-reel-cutter'
  }, {
    id: 8,
    name: 'Bonus Features',
    icon: Star,
    description: 'Access special bonus features and tools',
    comingSoon: false,
    path: '/bonus-features'
  }];

  // Gen AI tools (replacing featuredTools)
  const genAITools = [{
    id: 1,
    name: 'Voice Generation',
    description: 'Generate realistic voices and speech from your text',
    icon: Mic,
    color: 'bg-gradient-to-r from-purple-800 to-indigo-900',
    buttonText: 'Generate Voice'
  }, {
    id: 2,
    name: 'Image Generation',
    description: 'Create stunning AI-generated images from your descriptions',
    icon: Image,
    color: 'bg-gradient-to-r from-emerald-800 to-teal-900',
    buttonText: 'Create Image'
  }, {
    id: 3,
    name: 'Video Generation',
    description: 'Transform your ideas into engaging video content',
    icon: Video,
    color: 'bg-gradient-to-r from-orange-800 to-red-900',
    buttonText: 'Create Video'
  }];

  // Recent projects data 
  const recentProjects = [{
    id: 1,
    title: 'ALTYOU',
    editedTime: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    userInitial: 'A',
    avatarColor: 'bg-blue-500'
  }, {
    id: 2,
    title: 'Creator tool flow',
    editedTime: '17 days ago',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    userInitial: 'P',
    avatarColor: 'bg-purple-500'
  }, {
    id: 3,
    title: "Medhansh Jain's team library",
    editedTime: '24 days ago',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    userInitial: 'M',
    avatarColor: 'bg-blue-500'
  }];
  
  const handleToolClick = (toolId: number) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool?.path) {
      navigate(tool.path);
    } else if (tool?.comingSoon) {
      toast({
        title: "Coming soon!",
        description: "This feature will be available shortly."
      });
    } else {
      toast({
        title: "Feature unavailable",
        description: "This feature is not yet implemented."
      });
    }
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const openProjectsDialog = (project: Project) => {
    setSelectedProject(project);
    setIsProjectsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    // Implement edit project functionality
    toast({
      title: "Edit project",
      description: `Editing project: ${project.title}`
    });
  };

  const handleDeleteProject = (project: Project) => {
    // Implement delete project functionality
    toast({
      title: "Delete project",
      description: `Project ${project.title} has been deleted.`
    });
    setIsProjectsDialogOpen(false);
  };

  return <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <ScrollArea className="h-screen">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-white">What do you want to do?</h1>
              <div className="flex space-x-3">
                
                
              </div>
            </div>

            {/* Main Tools Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {tools.map(tool => <Card key={tool.id} className={`p-6 cursor-pointer hover:bg-neutral-800 bg-neutral-900 border-0 transition ${tool.comingSoon ? 'opacity-70' : ''}`} onClick={() => handleToolClick(tool.id)}>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-indigo-600/20 flex items-center justify-center mb-4">
                      <tool.icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                    {tool.comingSoon && <span className="mt-3 text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>}
                  </div>
                </Card>)}
            </div>
            
            {/* Gen AI Tools Section (Previously Popular Features) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {genAITools.map(tool => <Card key={tool.id} className={`${tool.color} border-0 overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all`}>
                  
                </Card>)}
            </div>
            
            {/* Recent Projects Section */}
            <h2 className="text-xl font-semibold text-white mb-4">Recent Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 pb-8">
              {recentProjects.map(project => (
                <div key={project.id} onClick={() => openProjectsDialog(project)}>
                  <ProjectCard 
                    image={project.image}
                    title={project.title}
                    editedTime={project.editedTime}
                    userInitial={project.userInitial}
                    avatarColor={project.avatarColor}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </main>

      {/* Projects Management Dialog */}
      <Dialog open={isProjectsDialogOpen} onOpenChange={setIsProjectsDialogOpen}>
        <DialogContent className="bg-[#1A1A1A] text-white border-neutral-700 sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">Project Management</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {selectedProject && (
              <>
                <div className="flex items-center gap-3 mb-6">
                  {selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  ) : (
                    <div className={`w-20 h-20 ${selectedProject.avatarColor || 'bg-indigo-600'} rounded-md flex items-center justify-center`}>
                      <span className="text-white text-xl">{selectedProject.userInitial || selectedProject.title.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-medium text-white">{selectedProject.title}</h3>
                    <p className="text-gray-400 text-sm">Last edited {selectedProject.editedTime}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#262626] p-4 rounded-md">
                    <h4 className="text-md font-medium text-white mb-3">Project Details</h4>
                    <Table>
                      <TableBody>
                        <TableRow className="border-b border-neutral-700">
                          <TableCell className="py-2 font-medium text-white">Created by</TableCell>
                          <TableCell className="py-2 text-gray-300">You</TableCell>
                        </TableRow>
                        <TableRow className="border-b border-neutral-700">
                          <TableCell className="py-2 font-medium text-white">Last modified</TableCell>
                          <TableCell className="py-2 text-gray-300">{selectedProject.editedTime}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="py-2 font-medium text-white">Type</TableCell>
                          <TableCell className="py-2 text-gray-300">Document</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <Button 
                      variant="outline" 
                      className="bg-transparent border border-neutral-700 hover:bg-neutral-800 text-white justify-start"
                      onClick={() => handleEditProject(selectedProject)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit project
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-transparent border border-neutral-700 hover:bg-red-900/20 text-red-500 justify-start"
                      onClick={() => handleDeleteProject(selectedProject)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete project
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};

export default Dashboard;
