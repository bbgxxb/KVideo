'use client';
import { memo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TYPE_MAPPER } from '@/lib/constants/custom-types';

// 核心修改：扩展 onCardClick 类型，支持传入参数（兼容无参和带参调用）
export interface VideoCardProps {
  video: {
    vod_id: string | number;
    vod_name: string;
    vod_pic?: string;
    vod_remarks?: string;
    type_name?: string;
    vod_year?: string;
    source: string;
    play_url?: string; // 确保 video 包含 play_url（用于传递给 handleCardClick）
  };
  cardId?: string | number;
  isActive?: boolean;
  // 支持无参调用，也支持传入视频ID和播放URL（兼容原有逻辑）
  onCardClick?: () => void | ((videoId: string | number, videoUrl?: string) => void);
}

export const VideoCard = memo<VideoCardProps>(({
  video,
  cardId,
  isActive,
  onCardClick
}) => {
  const displayType = TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"];

  // 核心修改：点击事件触发时，传递 videoId 和 play_url 给 onCardClick
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof onCardClick === 'function') {
      // 传递视频ID和播放URL（与 VideoGrid 的 handleCardClick 参数对应）
      onCardClick(video.vod_id, video.play_url);
    }
  };

  return (
    <div className={`relative ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      <Link
        href={`/play?vid=${video.vod_id}&source=${video.source}&title=${encodeURIComponent(video.vod_name)}`}
        onClick={handleClick}
        className="block h-full"
      >
        <Card hover={true} className="p-0 overflow-hidden h-full">
          <div className="relative aspect-[2/3] w-full bg-gray-100">
            {video.vod_pic ? (
              <img
                src={video.vod_pic}
                alt={video.vod_name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex justify-center items-center text-gray-400">
                暂无海报
              </div>
            )}
            {/* 分类标签 */}
            {displayType && (
              <Badge
                variant="secondary"
                className="absolute bottom-2 left-2 text-xs z-10"
              >
                {displayType}
              </Badge>
            )}
            {/* 年份标签 */}
            {video.vod_year && (
              <Badge
                variant="secondary"
                className="absolute bottom-2 right-2 text-xs z-10 bg-gray-200"
              >
                {video.vod_year}
              </Badge>
            )}
            {/* 热播/完结标签 */}
            {video.vod_remarks && (
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 text-xs z-10 bg-red-500 text-white"
              >
                {video.vod_remarks}
              </Badge>
            )}
          </div>
          {/* 视频名称 */}
          <div className="p-2">
            <h3 className="text-sm font-medium truncate">{video.vod_name}</h3>
          </div>
        </Card>
      </Link>
    </div>
  );
});

export default VideoCard;
