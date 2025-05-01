import { useState } from 'react';
import { LayoutDashboard, Folder, LayoutTemplate, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar = ({
  isOpen,
  toggleSidebar
}: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'templates'>('dashboard');
  const sampleProjects = [{
    id: 1,
    name: 'Content Analyzer Report',
    date: '2 days ago',
    image: '/lovable-uploads/d6514f20-6f3f-4b8e-a6d0-813ec1bf1539.png',
    users: ['A', 'M']
  }, {
    id: 2,
    name: 'Podcast Transcription',
    date: '1 week ago',
    image: null,
    users: ['K', 'S']
  }, {
    id: 3,
    name: 'Marketing Video Script',
    date: '2 weeks ago',
    image: null,
    users: ['R']
  }];
  const templates = [{
    id: 1,
    name: 'Social Media Post',
    category: 'Content'
  }, {
    id: 2,
    name: 'Video Script Template',
    category: 'Video'
  }, {
    id: 3,
    name: 'Podcast Show Notes',
    category: 'Audio'
  }];
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
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'dashboard' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => setActiveSection('dashboard')}>
            <LayoutDashboard size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Dashboard</span>}
          </button>
          
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'projects' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => setActiveSection('projects')}>
            <Folder size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Sample Projects</span>}
          </button>
          
          <button className={cn("flex items-center w-full px-4 py-3 transition-colors", activeSection === 'templates' ? "bg-white/10 border-l-2 border-indigo-500" : "hover:bg-white/5 border-l-2 border-transparent", !isOpen && "justify-center")} onClick={() => setActiveSection('templates')}>
            <LayoutTemplate size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Templates</span>}
          </button>
        </nav>
      </div>
      
      {isOpen && <div className="mt-8 px-4 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-320px)]">
            {activeSection === 'projects' && <div>
                <h3 className="text-sm font-medium text-gray-400 mb-4">Sample Projects</h3>
                <div className="space-y-4">
                  {sampleProjects.map(project => <div key={project.id} className="rounded-md hover:bg-white/5 cursor-pointer overflow-hidden">
                      {project.image && <div className="relative w-full h-28 mb-2">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover rounded-md" />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <p className="text-xs text-white font-medium uppercase">ALTYOU</p>
                            <p className="text-xs text-gray-400">{project.date}</p>
                          </div>
                        </div>}
                      <div className="p-2">
                        <p className="text-sm text-white font-medium">{project.name}</p>
                        {!project.image && <p className="text-xs text-gray-500 mt-1">{project.date}</p>}
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
                  {templates.map(template => <div key={template.id} className="p-2 rounded-md hover:bg-white/5 cursor-pointer">
                      <p className="text-sm text-white">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>)}
                </div>
              </div>}
          </ScrollArea>
        </div>}
      
      {isOpen && <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="p-4 rounded-lg bg-indigo-900/30 border border-indigo-800/50">
            <p className="text-sm text-white font-medium">Need help?</p>
            <p className="text-xs text-gray-400 mt-1">Contact support for assistance with any issues.</p>
          </div>
        </div>}
    </aside>;
};
export default Sidebar;