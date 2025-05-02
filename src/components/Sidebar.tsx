
import { useState } from 'react';
import { LayoutDashboard, Folder, LayoutTemplate, ChevronLeft, ChevronRight, Database, User, Settings, UserRound, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PersonaCreationModal from '@/components/PersonaCreationModal';
import { useToast } from '@/hooks/use-toast';
import { Avatar } from '@/components/ui/avatar';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface Persona {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  instructions?: string;
}

const Sidebar = ({
  isOpen,
  toggleSidebar
}: SidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'templates' | 'knowledge-base' | 'personas'>('dashboard');
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "tech-guru",
      name: "Tech Guru",
      description: "Technology expert with deep knowledge of latest trends",
      avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=64&h=64"
    },
    {
      id: "marketing-expert",
      name: "Marketing Expert",
      description: "Marketing specialist with insights on growth strategies",
      avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=64&h=64"
    },
    {
      id: "content-creator",
      name: "Content Creator",
      description: "Creative specialist for engaging content development",
      avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=64&h=64"
    },
    {
      id: "business-coach",
      name: "Business Coach",
      description: "Strategic advisor for business growth and development",
      avatar: "https://images.unsplash.com/photo-1501286353178-1ec871214838?auto=format&fit=crop&w=64&h=64"
    },
  ]);
  
  const sampleProjects = [{
    id: 1,
    name: 'Content Analyzer Report',
    date: '2 days ago',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    users: ['A', 'M'],
    color: 'from-indigo-500 to-purple-600'
  }, {
    id: 2,
    name: 'Podcast Transcription',
    date: '1 week ago',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    users: ['K', 'S'],
    color: 'from-pink-500 to-rose-500'
  }, {
    id: 3,
    name: 'Marketing Video Script',
    date: '2 weeks ago',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    users: ['R', 'J'],
    color: 'from-amber-400 to-orange-500'
  }, {
    id: 4,
    name: 'YouTube Viral Clips',
    date: '3 weeks ago',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e',
    users: ['J', 'P', 'M'],
    color: 'from-emerald-500 to-teal-600'
  }, {
    id: 5,
    name: 'Q2 Sales Pitch',
    date: '1 month ago',
    image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
    users: ['S', 'A'],
    color: 'from-blue-500 to-cyan-500'
  }];
  
  const templates = [{
    id: 1,
    name: 'Social Media Post',
    category: 'Content',
    color: 'bg-gradient-to-r from-violet-600 to-indigo-600'
  }, {
    id: 2,
    name: 'Video Script Template',
    category: 'Video',
    color: 'bg-gradient-to-r from-amber-500 to-orange-600'
  }, {
    id: 3,
    name: 'Podcast Show Notes',
    category: 'Audio',
    color: 'bg-gradient-to-r from-emerald-500 to-green-600'
  }, {
    id: 4,
    name: 'Blog Post Outline',
    category: 'Content',
    color: 'bg-gradient-to-r from-blue-500 to-cyan-600'
  }, {
    id: 5,
    name: 'Email Newsletter',
    category: 'Marketing',
    color: 'bg-gradient-to-r from-rose-500 to-pink-600'
  }];
  
  const handleNavigation = (path: string, section: 'dashboard' | 'projects' | 'templates' | 'knowledge-base' | 'personas') => {
    setActiveSection(section);
    navigate(path);
  };

  const handleAddPersona = (newPersona: Persona) => {
    // Add avatar to new persona if not provided
    const personaWithAvatar = {
      ...newPersona,
      avatar: newPersona.avatar || "/lovable-uploads/f5e90732-46bb-4f6a-82c4-c07cb1e98cb9.png"
    };
    
    setPersonas([...personas, personaWithAvatar]);
    toast({
      title: "Persona Created",
      description: `${newPersona.name} has been added to your personas`
    });
    setIsPersonaModalOpen(false);
  };

  const handleDeletePersona = (personaId: string) => {
    setPersonas(personas.filter(persona => persona.id !== personaId));
    
    toast({
      title: "Persona Deleted",
      description: "The persona has been removed from your list",
      variant: "destructive"
    });
  };
  
  return <aside className={cn("fixed left-0 top-0 h-screen bg-[#0A0A0A] transition-all duration-300 ease-in-out z-10 border-r border-white/10", isOpen ? "w-64" : "w-16")}>
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
          {isOpen ? <span className="font-hanson tracking-wider text-white text-3xl font-extrabold">altyou</span> : <span className="text-xl font-hanson tracking-wider text-white font-bold">a</span>}
        </div>
        
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="mt-8">
        <nav>
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'dashboard' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('/dashboard', 'dashboard')}>
            <LayoutDashboard size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Dashboard</span>}
          </button>
          
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'projects' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('/dashboard', 'projects')}>
            <Folder size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">My Projects</span>}
          </button>
          
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'knowledge-base' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('/knowledge-base', 'knowledge-base')}>
            <Database size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Database</span>}
          </button>
          
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'personas' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => setActiveSection('personas')}>
            <UserRound size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Personas</span>}
          </button>
        </nav>
      </div>
      
      {isOpen && <div className="mt-8 px-4 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-320px)]">
            {activeSection === 'projects' && <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Sample Projects</h3>
                <div className="space-y-4">
                  {sampleProjects.map(project => <div key={project.id} className="rounded-md hover:bg-white/5 cursor-pointer overflow-hidden transition-all duration-200 hover:scale-[1.02] group">
                      <div className="relative w-full h-28 mb-2">
                        {project.image ? <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-md" /> : <div className={`w-full h-full rounded-md bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                            <span className="text-white font-medium opacity-80">{project.name.substring(0, 2)}</span>
                          </div>}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-md opacity-80 group-hover:opacity-100" />
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-xs text-white font-medium uppercase">ALTYOU</p>
                          <p className="text-xs text-gray-300">{project.date}</p>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-sm text-white font-medium group-hover:text-indigo-400 transition-colors">{project.name}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex -space-x-2">
                            {project.users.map((user, i) => <div key={i} className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs text-white border-2 border-[#0A0A0A]">
                                {user}
                              </div>)}
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>}
            
            {activeSection === 'templates' && <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Ready-to-go Templates</h3>
                <div className="space-y-3">
                  {templates.map(template => <div key={template.id} className={`${template.color} p-3 rounded-md hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]`}>
                      <p className="text-sm font-medium text-white">{template.name}</p>
                      <p className="text-xs text-white/80 mt-1">{template.category}</p>
                      <button className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-xs text-white font-medium transition-colors">
                        Use Template
                      </button>
                    </div>)}
                </div>
              </div>}
              
            {activeSection === 'personas' && <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">My Personas</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsPersonaModalOpen(true)}
                    className="h-7 px-2 text-xs flex items-center gap-1 text-white border-white/20 bg-neutral-800 hover:bg-blue-700"
                  >
                    <Plus className="h-3 w-3" /> Create
                  </Button>
                </div>
                <div className="space-y-3">
                  {personas.map(persona => (
                    <div key={persona.id} className="flex items-start gap-2 p-2 text-sm rounded-md text-white hover:bg-blue-900/30 group">
                      <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={persona.avatar} 
                          alt={persona.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{persona.name}</p>
                        <p className="text-xs text-gray-400 truncate">{persona.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeletePersona(persona.id)}
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 hover:bg-red-900/20 hover:text-red-500"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>}
          </ScrollArea>
        </div>}
      
      {isOpen && <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="space-y-2">
            <button className="flex items-center w-full px-4 py-3 rounded-md hover:bg-white/5 transition-colors" onClick={() => navigate('/profile')}>
              <User size={20} className="text-gray-400" />
              <span className="ml-3 text-white">Profile</span>
            </button>
            
            <button className="flex items-center w-full px-4 py-3 rounded-md hover:bg-white/5 transition-colors" onClick={() => navigate('/settings')}>
              <Settings size={20} className="text-gray-400" />
              <span className="ml-3 text-white">Settings</span>
            </button>
          </div>
        </div>}
      
      <PersonaCreationModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        onAddPersona={handleAddPersona}
      />
    </aside>;
};

export default Sidebar;
