
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, File, Search, Trash2, Upload, Database } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface KnowledgeFile {
  id: string;
  name: string;
  type: "transcription" | "upload" | "generated";
  selected: boolean;
  dateAdded: string;
  size?: string;
  duration?: string;
  associatedPersona?: string;
}

const KnowledgeBase = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
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
    { id: "11", name: "Marketing Expert Analysis", type: "generated", selected: false, dateAdded: "2025-05-02", associatedPersona: "marketing-expert" },
    { id: "12", name: "Tech Guru Insights", type: "generated", selected: false, dateAdded: "2025-05-01", associatedPersona: "tech-guru" },
    { id: "13", name: "Business Strategy Review", type: "generated", selected: false, dateAdded: "2025-04-29", associatedPersona: "business-coach" },
  ]);

  const toggleFileSelection = (fileId: string) => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
    
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };

  const selectAllFiles = () => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: true }))
    );
    setSelectedFiles(knowledgeFiles.map(file => file.id));
  };

  const deselectAllFiles = () => {
    setKnowledgeFiles(prevFiles =>
      prevFiles.map(file => ({ ...file, selected: false }))
    );
    setSelectedFiles([]);
  };

  const filteredFiles = knowledgeFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const transcriptions = filteredFiles.filter(file => file.type === "transcription");
  const uploads = filteredFiles.filter(file => file.type === "upload");
  const generated = filteredFiles.filter(file => file.type === "generated");

  const handleFileUpload = () => {
    // In a real application, this would trigger a file upload
    toast({
      title: "Upload Feature",
      description: "File upload functionality would be implemented here."
    });
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to delete",
        variant: "destructive"
      });
      return;
    }
    
    setKnowledgeFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    
    toast({
      title: "Files Deleted",
      description: `${selectedFiles.length} file(s) have been deleted.`
    });
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Database</h1>
            <span className="bg-neutral-800 text-xs px-2 py-1 rounded-full text-gray-400">
              {knowledgeFiles.length} Files
            </span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFileUpload}
              className="text-white border-white/20 bg-neutral-800 hover:bg-white/10 flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleDeleteSelected}
              disabled={selectedFiles.length === 0}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <Button variant="outline" size="sm" asChild className="text-white border-white/20 bg-neutral-800 hover:bg-white/10">
              <Link to="/dashboard" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4 text-white" />
                <span className="text-white">Back</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mb-6 relative">
          <Input 
            placeholder="Search database..."
            className="pl-10 bg-neutral-800 border-white/20 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={selectAllFiles} className="text-xs h-6 text-white border-white/20 bg-neutral-800 hover:bg-blue-700">
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={deselectAllFiles} className="text-xs h-6 text-white border-white/20 bg-neutral-800 hover:bg-blue-700">
              Clear
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="text-white">
          <TabsList className="mb-4 bg-neutral-800 border border-white/10">
            <TabsTrigger 
              value="all" 
              className="text-white data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              All Files ({filteredFiles.length})
            </TabsTrigger>
            <TabsTrigger 
              value="transcriptions" 
              className="text-white data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              Transcriptions ({transcriptions.length})
            </TabsTrigger>
            <TabsTrigger 
              value="uploads" 
              className="text-white data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              Uploads ({uploads.length})
            </TabsTrigger>
            <TabsTrigger 
              value="generated" 
              className="text-white data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              Generated ({generated.length})
            </TabsTrigger>
          </TabsList>

          {/* All Files Tab */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map(file => (
                <Card key={file.id} className={`p-4 ${file.selected ? 'bg-blue-900/30' : 'bg-neutral-900'} border-neutral-800 cursor-pointer transition-colors`} onClick={() => toggleFileSelection(file.id)}>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-8">
                      <Checkbox 
                        checked={file.selected} 
                        onCheckedChange={() => toggleFileSelection(file.id)} 
                        className="rounded-sm" 
                      />
                    </div>
                    {file.type === "transcription" ? (
                      <FileText className="h-8 w-8 text-blue-400" />
                    ) : file.type === "upload" ? (
                      <File className="h-8 w-8 text-green-400" />
                    ) : (
                      <Database className="h-8 w-8 text-purple-400" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-400">
                        {file.type === "transcription" ? `Duration: ${file.duration}` : 
                         file.type === "upload" ? `Size: ${file.size}` :
                         `Generated content`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Added: {file.dateAdded}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transcriptions Tab */}
          <TabsContent value="transcriptions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transcriptions.map(file => (
                <Card key={file.id} className={`p-4 ${file.selected ? 'bg-blue-900/30' : 'bg-neutral-900'} border-neutral-800 cursor-pointer transition-colors`} onClick={() => toggleFileSelection(file.id)}>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-8">
                      <Checkbox 
                        checked={file.selected} 
                        onCheckedChange={() => toggleFileSelection(file.id)} 
                        className="rounded-sm" 
                      />
                    </div>
                    <FileText className="h-8 w-8 text-blue-400" />
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

          {/* Uploads Tab */}
          <TabsContent value="uploads" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploads.map(file => (
                <Card key={file.id} className={`p-4 ${file.selected ? 'bg-blue-900/30' : 'bg-neutral-900'} border-neutral-800 cursor-pointer transition-colors`} onClick={() => toggleFileSelection(file.id)}>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-8">
                      <Checkbox 
                        checked={file.selected} 
                        onCheckedChange={() => toggleFileSelection(file.id)} 
                        className="rounded-sm" 
                      />
                    </div>
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

          {/* Generated Tab */}
          <TabsContent value="generated" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generated.map(file => (
                <Card key={file.id} className={`p-4 ${file.selected ? 'bg-blue-900/30' : 'bg-neutral-900'} border-neutral-800 cursor-pointer transition-colors`} onClick={() => toggleFileSelection(file.id)}>
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center h-8">
                      <Checkbox 
                        checked={file.selected} 
                        onCheckedChange={() => toggleFileSelection(file.id)} 
                        className="rounded-sm" 
                      />
                    </div>
                    <Database className="h-8 w-8 text-purple-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{file.name}</p>
                      <p className="text-sm text-gray-400">Generated content</p>
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
  );
};

export default KnowledgeBase;
