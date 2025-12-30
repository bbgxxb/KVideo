'use client';
import { useState } from 'react';
import VideoCard, { VideoCardProps } from '@/components/search/VideoCard';
import type { VideoItem } from '@/lib/api/search-api';

// 视频网格属性类型
interface VideoGridProps {
  videos: VideoItem[];
  onCardClick?: VideoCardProps['onCardClick'];
}

// 默认导出（适配 SearchResults.tsx 的默认导入）
export default function VideoGrid({ videos, onCardClick }: VideoGridProps) {
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  // 卡片点击回调（兼容双参，与 VideoCard 匹配）
  const handleCardClick = (videoId: string | number, videoUrl?: string) => {
    setActiveCardId(videoId);
    // 传递点击事件给父组件（如需要）
    onCardClick?.(videoId, videoUrl);
    if (videoUrl) {
      console.log('播放视频：', videoId, videoUrl);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {videos.map((video) => {
        const cardId = `${video.vod_id}-${video.source}`;
        const isActive = activeCardId === cardId;

        return (
          <VideoCard
            key={cardId}
            video={video}
            cardId={cardId}
            isActive={isActive}
            onCardClick={handleCardClick} // 双参函数，类型完全匹配
          />
        );
      })}
    </div>
  );
}
