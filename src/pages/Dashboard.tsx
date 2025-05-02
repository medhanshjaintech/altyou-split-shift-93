import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Scissors, Star, Mic, Image, Video, ChartBar, Grid, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
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
  const [isProjectsWindowOpen, setIsProjectsWindowOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
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
  const openProjectsWindow = () => {
    setIsProjectsWindowOpen(true);
  };
  const openProject = (project: Project) => {
    toast({
      title: "Opening project",
      description: `Opening project: ${project.title}`
    });
    // Navigate to project view or set up project opening logic
  };
  const handleEditProject = (project: Project) => {
    // Implement edit project functionality
    toast({
      title: "Edit project",
      description: `Editing project: ${project.title}`
    });
  };
  const confirmDeleteProject = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteConfirmOpen(true);
  };
  const handleDeleteProject = () => {
    if (selectedProject) {
      toast({
        title: "Project deleted",
        description: `Project ${selectedProject.title} has been deleted.`
      });
      setIsDeleteConfirmOpen(false);
      // In a real app, you would remove the project from the list
    }
  };
  return <div className="flex min-h-screen bg-[#121212]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} openProjectsWindow={openProjectsWindow} />
      
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
              {recentProjects.map(project => <div key={project.id} onClick={() => openProjectsWindow()}>
                  <ProjectCard image={project.image} title={project.title} editedTime={project.editedTime} userInitial={project.userInitial} avatarColor={project.avatarColor} />
                </div>)}
            </div>
          </div>
        </ScrollArea>
      </main>

      {/* Projects Window Dialog */}
      <Dialog open={isProjectsWindowOpen} onOpenChange={setIsProjectsWindowOpen}>
        <DialogContent className="bg-[#1A1A1A] text-white border-neutral-700 sm:max-w-[800px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white">My Projects</DialogTitle>
            <DialogDescription className="text-gray-400">
              Manage all your projects in one place
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {recentProjects.map(project => <div key={project.id} className="bg-[#262626] rounded-lg overflow-hidden">
                  <div className="relative h-40">
                    {project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> : <div className={`w-full h-full ${project.avatarColor || 'bg-indigo-600'} flex items-center justify-center`}>
                        <span className="text-white text-xl">{project.userInitial || project.title.charAt(0)}</span>
                      </div>}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                      <div className="absolute bottom-0 left-0 p-3">
                        <p className="text-xs text-white/70">Last edited {project.editedTime}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-white">{project.title}</h3>
                      <div className="flex -space-x-2">
                        {project.userInitial && <div className={`w-7 h-7 rounded-full ${project.avatarColor} flex items-center justify-center text-xs text-white border-2 border-[#1A1A1A]`}>
                            {project.userInitial}
                          </div>}
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4 space-x-2">
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-white flex-1" onClick={() => openProject(project)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-white/10 text-white" onClick={() => handleEditProject(project)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/5 border-white/10 hover:bg-red-900/20 text-red-400 hover:text-red-300" onClick={() => confirmDeleteProject(project)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>)}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent className="bg-[#1A1A1A] border-neutral-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-white">
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-neutral-700 text-white hover:bg-neutral-800 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteProject}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default Dashboard;