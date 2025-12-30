'use client';
import { useState } from 'react';
import { SourceBadges } from '@/components/search/SourceBadges';
import { TypeBadges } from '@/components/search/TypeBadges';
// 核心修复：默认导入 VideoGrid（与 VideoGrid.tsx 的默认导出匹配）
import VideoGrid from '@/components/search/VideoGrid';
import { useSourceBadges } from '@/lib/hooks/useSourceBadges';
import { useTypeBadges } from '@/lib/hooks/useTypeBadges';
import { Video, SourceBadge } from '@/lib/types';

// 搜索结果属性类型
interface SearchResultsProps {
  initialVideos?: Video[];
  isAdult?: boolean;
}

export default function SearchResults({ initialVideos = [], isAdult = false }: SearchResultsProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const { sourceBadges, selectedSources, onToggleSource } = useSourceBadges();
  const { typeBadges, selectedTypes, onToggleType } = useTypeBadges();

  // 视频卡片点击回调（兼容双参）
  const handleCardClick = (videoId: string | number, videoUrl?: string) => {
    console.log('点击视频卡片：', videoId, videoUrl);
    // 可添加跳转播放页逻辑
    if (videoUrl) {
      window.location.href = `/play?vid=${videoId}&url=${encodeURIComponent(videoUrl)}`;
    }
  };

  return (
    <div className="space-y-4">
      {/* 来源标签筛选 */}
      <SourceBadges
        badges={sourceBadges as SourceBadge[]}
        selectedSources={selectedSources}
        onToggleSource={onToggleSource}
      />

      {/* 分类标签筛选 */}
      <TypeBadges
        badges={typeBadges}
        selectedTypes={selectedTypes}
        onToggleType={onToggleType}
      />

      {/* 视频网格（默认导入，类型匹配） */}
      <VideoGrid
        videos={videos}
        onCardClick={handleCardClick}
      />

      {/* 无结果提示 */}
      {videos.length === 0 && (
        <div className="flex justify-center items-center py-10 text-gray-500">
          暂无匹配的视频结果，请调整筛选条件重试
        </div>
      )}
    </div>
  );
}
