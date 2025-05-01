
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, File, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

interface KnowledgeFile {
  id: string;
  name: string;
  type: "transcription" | "upload";
  selected: boolean;
  dateAdded: string;
  size?: string;
  duration?: string;
}

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [knowledgeFiles, setKnowledgeFiles] = useState<KnowledgeFile[]>([
    { id: "1", name: "Interview with Marketing Director.txt", type: "transcription", selected: false, dateAdded: "2025-05-01", duration: "32:15" },
    { id: "2", name: "Product Demo Walkthrough.mp3", type: "transcription", selected: false, dateAdded: "2025-04-28", duration: "14:45" },
    { id: "3", name: "Marketing Strategy 2025.pdf", type: "upload", selected: false, dateAdded: "2025-04-25", size: "2.3 MB" },
    { id: "4", name: "Sales Pitch Presentation.docx", type: "upload", selected: false, dateAdded: "2025-04-20", size: "1.8 MB" },
    { id: "5", name: "Team Meeting Discussion.txt", type: "transcription", selected: false, dateAdded: "2025-04-15", duration: "45:30" },
    { id: "6", name: "Research Notes for Q3.pdf", type: "upload", selected: false, dateAdded: "2025-04-10", size: "3.5 MB" },
    { id: "7", name: "Customer Feedback Session.mp3", type: "transcription", selected: false, dateAdded: "2025-04-05", duration: "28:10" },
    { id: "8", name: "Product Roadmap 2025-2026.pptx", type: "upload", selected: false, dateAdded: "2025-04-01", size: "5.2 MB" },
    { id: "9", name: "Board Meeting Minutes.txt", type: "transcription", selected: false, dateAdded: "2025-03-28", duration: "67:45" },
    { id: "10", name: "Financial Report Q1 2025.xlsx", type: "upload", selected: false, dateAdded: "2025-03-25", size: "1.1 MB" },
  ]);

  const toggleFileSelection = (fileId: string) => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const selectAllFiles = () => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: true }))
    );
  };

  const deselectAllFiles = () => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: false }))
    );
  };

  const filteredFiles = knowledgeFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const transcriptions = filteredFiles.filter(file => file.type === "transcription");
  const uploads = filteredFiles.filter(file => file.type === "upload");

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <SidebarProvider defaultOpen={true}>
        <KnowledgeSidebar 
          files={knowledgeFiles}
          onToggleFile={toggleFileSelection}
          onSelectAll={selectAllFiles}
          onDeselectAll={deselectAllFiles}
        />

        <div className="flex-1 p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Knowledge Base</h1>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            
            <div className="mb-6 relative">
              <Input 
                placeholder="Search knowledge base..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Files ({knowledgeFiles.length})</TabsTrigger>
                <TabsTrigger value="transcriptions">Transcriptions ({transcriptions.length})</TabsTrigger>
                <TabsTrigger value="uploads">Uploads ({uploads.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFiles.map(file => (
                    <Card key={file.id} className="p-4 bg-neutral-900 border-neutral-800">
                      <div className="flex items-start space-x-3">
                        {file.type === "transcription" ? (
                          <FileText className="h-8 w-8 text-indigo-400" />
                        ) : (
                          <File className="h-8 w-8 text-green-400" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{file.name}</p>
                          <p className="text-sm text-gray-400">
                            {file.type === "transcription" ? `Duration: ${file.duration}` : `Size: ${file.size}`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Added: {file.dateAdded}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="transcriptions" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {transcriptions.map(file => (
                    <Card key={file.id} className="p-4 bg-neutral-900 border-neutral-800">
                      <div className="flex items-start space-x-3">
                        <FileText className="h-8 w-8 text-indigo-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{file.name}</p>
                          <p className="text-sm text-gray-400">Duration: {file.duration}</p>
                          <p className="text-xs text-gray-500 mt-1">Added: {file.dateAdded}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="uploads" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploads.map(file => (
                    <Card key={file.id} className="p-4 bg-neutral-900 border-neutral-800">
                      <div className="flex items-start space-x-3">
                        <File className="h-8 w-8 text-green-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{file.name}</p>
                          <p className="text-sm text-gray-400">Size: {file.size}</p>
                          <p className="text-xs text-gray-500 mt-1">Added: {file.dateAdded}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default KnowledgeBase;
