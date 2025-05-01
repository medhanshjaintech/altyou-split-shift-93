
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProjectCardProps {
  image?: string;
  title: string;
  editedTime: string;
  userAvatar?: string;
  userInitial?: string;
  className?: string;
  avatarColor?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  editedTime,
  userAvatar,
  userInitial,
  className,
  avatarColor = 'bg-indigo-600'
}) => {
  return (
    <div className={cn("flex flex-col bg-[#1A1F2C] rounded-lg overflow-hidden cursor-pointer h-[220px] transition-all hover:ring-1 hover:ring-white/20", className)}>
      <div className="relative flex-1 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1A1F2C]">
            <span className="text-white/30 text-lg">{title}</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-[#1A1F2C] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <p className="text-xs text-gray-400">Edited {editedTime}</p>
        </div>
        <Avatar className={`h-8 w-8 ${avatarColor}`}>
          {userAvatar && <img src={userAvatar} alt="User" />}
          <AvatarFallback className="text-white text-xs">
            {userInitial || 'A'}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProjectCard;
