"use client";

import React from "react";
import { MapPin, ArrowUpRight, Eye } from "lucide-react";
import { Community } from "@/utils/types";

interface CommunityCardProps {
  community: Community;
  getIcon: (name: string) => React.ReactElement;
  onClick: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  community,
  getIcon,
  onClick,
}) => {
  return (
    <div className="quartz-card rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 group hover:border-indigo-300 transition-all overflow-hidden flex flex-col h-full">
      <div className="h-48 relative overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur rounded-2xl shadow-sm">
          {getIcon(community.name)}
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {community.name}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mt-1">
              <MapPin size={10} className="text-indigo-500" />{" "}
              {community.location}
            </p>
          </div>
        </div>
        <p className="text-slate-500 text-sm font-medium mt-4 line-clamp-2 leading-relaxed">
          {community.description}
        </p>
        <div className="grid grid-cols-3 gap-4 mt-auto pt-8 border-t border-slate-50">
          <div className="text-right flex items-center justify-end gap-2 col-start-3">
            <button
              onClick={onClick}
              className="flex items-center gap-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm border border-slate-200 whitespace-nowrap px-4 py-2 text-xs font-semibold tracking-wide"
            >
              <Eye size={14} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
