
import { useState } from 'react';
import { LayoutDashboard, Folder, LayoutTemplate, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'projects' | 'templates'>('dashboard');
  
  const sampleProjects = [
    { id: 1, name: 'Content Analyzer Report', date: '2 days ago' },
    { id: 2, name: 'Podcast Transcription', date: '1 week ago' },
    { id: 3, name: 'Marketing Video Script', date: '2 weeks ago' }
  ];
  
  const templates = [
    { id: 1, name: 'Social Media Post', category: 'Content' },
    { id: 2, name: 'Video Script Template', category: 'Video' },
    { id: 3, name: 'Podcast Show Notes', category: 'Audio' }
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-screen bg-[#0A0A0A] transition-all duration-300 ease-in-out z-10 border-r border-white/10",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex items-center justify-between p-4">
        <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
          {isOpen ? (
            <span className="text-xl font-hanson tracking-wider text-white font-bold">altyou</span>
          ) : (
            <span className="text-xl font-hanson tracking-wider text-white font-bold">a</span>
          )}
        </div>
        
        <button 
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <div className="mt-8">
        <nav>
          <button
            className={cn(
              "flex items-center w-full px-4 py-3 transition-colors",
              activeSection === 'dashboard' 
                ? "bg-white/10 border-l-2 border-indigo-500" 
                : "hover:bg-white/5 border-l-2 border-transparent",
              !isOpen && "justify-center"
            )}
            onClick={() => setActiveSection('dashboard')}
          >
            <LayoutDashboard size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Dashboard</span>}
          </button>
          
          <button
            className={cn(
              "flex items-center w-full px-4 py-3 transition-colors",
              activeSection === 'projects' 
                ? "bg-white/10 border-l-2 border-indigo-500" 
                : "hover:bg-white/5 border-l-2 border-transparent",
              !isOpen && "justify-center"
            )}
            onClick={() => setActiveSection('projects')}
          >
            <Folder size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Sample Projects</span>}
          </button>
          
          <button
            className={cn(
              "flex items-center w-full px-4 py-3 transition-colors",
              activeSection === 'templates' 
                ? "bg-white/10 border-l-2 border-indigo-500" 
                : "hover:bg-white/5 border-l-2 border-transparent",
              !isOpen && "justify-center"
            )}
            onClick={() => setActiveSection('templates')}
          >
            <LayoutTemplate size={20} className="text-gray-400" />
            {isOpen && <span className="ml-3 text-white">Templates</span>}
          </button>
        </nav>
      </div>
      
      {isOpen && (
        <div className="mt-8 px-4">
          {activeSection === 'projects' && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Sample Projects</h3>
              <div className="space-y-3">
                {sampleProjects.map(project => (
                  <div key={project.id} className="p-2 rounded-md hover:bg-white/5 cursor-pointer">
                    <p className="text-sm text-white">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeSection === 'templates' && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Ready-to-go Templates</h3>
              <div className="space-y-3">
                {templates.map(template => (
                  <div key={template.id} className="p-2 rounded-md hover:bg-white/5 cursor-pointer">
                    <p className="text-sm text-white">{template.name}</p>
                    <p className="text-xs text-gray-500">{template.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {isOpen && (
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <div className="p-4 rounded-lg bg-indigo-900/30 border border-indigo-800/50">
            <p className="text-sm text-white font-medium">Need help?</p>
            <p className="text-xs text-gray-400 mt-1">Contact support for assistance with any issues.</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
