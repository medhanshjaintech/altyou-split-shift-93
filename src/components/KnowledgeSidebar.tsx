
import { useState } from "react";
import { File, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";

interface KnowledgeFile {
  id: string;
  name: string;
  type: "transcription" | "upload";
  selected: boolean;
}

interface KnowledgeSidebarProps {
  files: KnowledgeFile[];
  onToggleFile: (fileId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const KnowledgeSidebar = ({
  files,
  onToggleFile,
  onSelectAll,
  onDeselectAll,
}: KnowledgeSidebarProps) => {
  const transcriptions = files.filter(file => file.type === "transcription");
  const uploads = files.filter(file => file.type === "upload");

  const handleFileUpload = () => {
    // This would trigger a file upload in a real application
    console.log("File upload triggered");
    // For now we'll just show an alert
    alert("File upload feature would open a file picker in a real application");
  };

  return (
    <Sidebar variant="inset" side="left">
      <SidebarHeader>
        <div className="p-2">
          <h3 className="text-xl font-bold text-blue-500">altyou</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Knowledge Base Files */}
        <div className="p-4">
          <div className="space-y-2 mb-2">
            <h3 className="text-sm font-medium text-white">Knowledge Base</h3>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onSelectAll}
                className="text-xs h-6 text-white border-white/20 bg-neutral-800 hover:bg-blue-700"
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onDeselectAll}
                className="text-xs h-6 text-white border-white/20 bg-neutral-800 hover:bg-blue-700"
              >
                Clear
              </Button>
            </div>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {transcriptions.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onToggleFile(file.id)}
                  className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer ${
                    file.selected ? "bg-blue-800/50 text-white" : "text-white hover:bg-blue-900/30"
                  }`}
                >
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator className="my-2 bg-white/10" />

        {/* Uploads */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white">Uploads</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFileUpload}
              className="text-xs h-6 flex items-center gap-1 text-white border-white/20 bg-neutral-800 hover:bg-blue-700"
            >
              <Upload className="h-3 w-3" /> Upload
            </Button>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {uploads.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onToggleFile(file.id)}
                  className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer ${
                    file.selected ? "bg-blue-800/50 text-white" : "text-white hover:bg-blue-900/30"
                  }`}
                >
                  <File className="h-4 w-4 text-green-500" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default KnowledgeSidebar;
