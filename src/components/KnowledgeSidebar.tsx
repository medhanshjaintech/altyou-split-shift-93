
import { useState } from "react";
import { File, FileText } from "lucide-react";
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

  return (
    <Sidebar variant="inset" side="left">
      <SidebarHeader>
        <div className="p-2">
          <h3 className="text-xl font-bold text-sidebar-foreground">altyou</h3>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Knowledge Base Files - Transcriptions */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-sidebar-foreground/70">Transcriptions</h3>
            <div className="flex gap-2">
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
          <h3 className="text-sm font-medium mb-2 text-sidebar-foreground/70">Uploads</h3>
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
