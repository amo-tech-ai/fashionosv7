
import React from 'react';
import { Mail, Users, Ticket, Layout, MessageSquare, Clock } from 'lucide-react';
import { InteractionLog } from '../../types';

interface CRMContactTimelinePreviewProps {
  history: InteractionLog[];
}

const getIcon = (type: string) => {
  switch (type) {
    case 'Email': return <Mail size={12} />;
    case 'Meeting': return <Users size={12} />;
    case 'RSVP': return <Ticket size={12} />;
    case 'Placement': return <Layout size={12} />;
    default: return <MessageSquare size={12} />;
  }
};

export const CRMContactTimelinePreview: React.FC<CRMContactTimelinePreviewProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="py-8 text-center border border-dashed border-gray-100 rounded-2xl">
        <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">No history recorded</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gray-50">
      {history.slice(0, 5).map((item) => (
        <div key={item.id} className="relative pl-8 group">
          <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:border-black transition-colors z-10">
            {getIcon(item.type)}
          </div>
          <div>
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-[10px] font-bold uppercase tracking-tight text-gray-900">{item.title}</p>
              <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{item.date}</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-tight line-clamp-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
