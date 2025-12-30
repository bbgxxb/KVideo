'use client';
import { useState } from 'react';
import { VideoCard } from '@/components/search/VideoCard';
import type { VideoItem } from '@/lib/api/search-api';

// 假设原有组件逻辑，核心修改 handleCardClick 函数
export default function VideoGrid({ videos }: { videos: VideoItem[] }) {
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  // 核心修改：删除 e: React.MouseEvent 参数，仅保留 videoId 和 videoUrl
  const handleCardClick = (videoId: string | number, videoUrl?: string) => {
    // 原有业务逻辑（示例）：跳转播放页、记录活跃卡片等
    setActiveCardId(videoId);
    if (videoUrl) {
      console.log('播放视频：', videoId, videoUrl);
      // 可添加跳转逻辑：window.location.href = `/play?url=${encodeURIComponent(videoUrl)}`;
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
            // 现在参数类型匹配，可以正常传入
            onCardClick={handleCardClick}
          />
        );
      })}
    </div>
  );
}
