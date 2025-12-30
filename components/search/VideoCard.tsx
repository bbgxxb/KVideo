'use client';
import { memo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TYPE_MAPPER } from '@/lib/constants/custom-types';

export interface VideoCardProps {
  video: {
    vod_id: string | number;
    vod_name: string;
    vod_pic?: string;
    vod_remarks?: string;
    type_name?: string;
    vod_year?: string;
    source: string;
  };
  onCardClick?: () => void;
  isActive?: boolean;
}

export const VideoCard = memo<VideoCardProps>(({
  video,
  onCardClick,
  isActive
}) => {
  const displayType = TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCardClick?.();
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
            {/* 年份标签（已修复：variant 改为 secondary） */}
            {video.vod_year && (
              <Badge
                variant="secondary"
                className="absolute bottom-2 right-2 text-xs z-10 bg-gray-200"
              >
                {video.vod_year}
              </Badge>
            )}
            {/* 热播/完结标签（核心修复：destructive 改为 secondary + 自定义红色样式） */}
            {video.vod_remarks && (
              <Badge
                variant="secondary" // 改为组件支持的类型
                className="absolute top-2 left-2 text-xs z-10 bg-red-500 text-white" // 自定义红色样式，还原原视觉
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
