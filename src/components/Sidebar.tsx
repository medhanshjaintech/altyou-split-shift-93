
import { useState } from 'react';
import { LayoutDashboard, Folder, ChevronLeft, ChevronRight, Database, User, Settings, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PersonasModal from '@/components/PersonasModal';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  openProjectsWindow?: () => void; // New prop to open projects window
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
  toggleSidebar,
  openProjectsWindow
}: SidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'templates' | 'knowledge-base' | 'personas'>('dashboard');
  const [isPersonasModalOpen, setIsPersonasModalOpen] = useState(false);
  
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
  
  const handleNavigation = (path: string, section: 'dashboard' | 'projects' | 'templates' | 'knowledge-base' | 'personas') => {
    setActiveSection(section);
    if (section === 'personas') {
      setIsPersonasModalOpen(true);
    } else if (section === 'projects' && openProjectsWindow) {
      openProjectsWindow(); // Open projects window if provided
    } else {
      navigate(path);
    }
  };
  
  return (
    <>
      <aside className={cn("fixed left-0 top-0 h-screen bg-[#0A0A0A] transition-all duration-300 ease-in-out z-10 border-r border-white/10", isOpen ? "w-64" : "w-16")}>
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
            
            <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'projects' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('', 'projects')}>
              <Folder size={20} className="text-gray-400" />
              {isOpen && <span className="ml-3 text-white">My Projects</span>}
            </button>
            
            <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'knowledge-base' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('/knowledge-base', 'knowledge-base')}>
              <Database size={20} className="text-gray-400" />
              {isOpen && <span className="ml-3 text-white">Database</span>}
            </button>
            
            <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'personas' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('', 'personas')}>
              <UserRound size={20} className="text-gray-400" />
              {isOpen && <span className="ml-3 text-white">Personas</span>}
            </button>
          </nav>
        </div>
        
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
      </aside>
      
      {/* Personas Modal */}
      <PersonasModal
        isOpen={isPersonasModalOpen}
        onClose={() => {
          setIsPersonasModalOpen(false);
          setActiveSection('dashboard');
        }}
        personas={personas}
        setPersonas={setPersonas}
      />
    </>
  );
};

export default Sidebar;
