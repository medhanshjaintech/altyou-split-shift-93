
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
          <h3 className="text-xl font-bold text-sidebar-foreground">altyou</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Knowledge Base Files */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-sidebar-foreground/70">Knowledge Base</h3>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onSelectAll}
                  className="text-xs h-6"
                >
                  Select All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onDeselectAll}
                  className="text-xs h-6"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="h-48">
            <div className="space-y-1">
              {transcriptions.map((file) => (
                <div
                  key={file.id}
                  onClick={() => onToggleFile(file.id)}
                  className={`flex items-center gap-2 p-2 text-sm rounded-md cursor-pointer ${
                    file.selected ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator className="my-2" />

        {/* Uploads */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-sidebar-foreground/70">Uploads</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleFileUpload}
              className="text-xs h-6 flex items-center gap-1"
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
                    file.selected ? "bg-primary/10 text-primary" : "hover:bg-sidebar-accent"
                  }`}
                >
                  <File className="h-4 w-4" />
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
