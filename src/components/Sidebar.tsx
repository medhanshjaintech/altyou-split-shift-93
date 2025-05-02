import { useState } from 'react';
import { LayoutDashboard, Folder, LayoutTemplate, ChevronLeft, ChevronRight, Database, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar = ({
  isOpen,
  toggleSidebar
}: SidebarProps) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'templates' | 'knowledge-bot'>('dashboard');
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
  const handleNavigation = (path: string, section: 'dashboard' | 'projects' | 'templates' | 'knowledge-bot') => {
    setActiveSection(section);
    navigate(path);
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
            {isOpen && <span className="ml-3 text-white">Sample Projects</span>}
          </button>
          
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'knowledge-bot' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => handleNavigation('/knowledge-bot', 'knowledge-bot')}>
            <Database size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Knowledge Bot</span>}
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
    </aside>;
};
export default Sidebar;
