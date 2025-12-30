'use client';
import { memo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TYPE_MAPPER } from '@/lib/constants/custom-types';

// 明确属性类型，onCardClick 为双参函数（兼容所有使用场景）
export interface VideoCardProps {
  video: {
    vod_id: string | number;
    vod_name: string;
    vod_pic?: string;
    vod_remarks?: string;
    type_name?: string;
    vod_year?: string;
    source: string;
    play_url?: string;
  };
  cardId?: string | number;
  isActive?: boolean;
  onCardClick?: (videoId: string | number, videoUrl?: string) => void;
}

export const VideoCard = memo<VideoCardProps>(({
  video,
  cardId,
  isActive,
  onCardClick
}) => {
  // 自定义分类映射（兜底为「未分类」）
  const displayType = TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"];

  // 点击事件：调用 onCardClick 并传递参数
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCardClick?.(video.vod_id, video.play_url); // 可选链避免未定义报错
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
            {/* 自定义分类标签 */}
            {displayType && (
              <Badge
                variant="secondary"
                className="absolute bottom-2 left-2 text-xs z-10"
              >
                {displayType}
              </Badge>
            )}
            {/* 年份标签（兼容 Badge 组件类型） */}
            {video.vod_year && (
              <Badge
                variant="secondary"
                className="absolute bottom-2 right-2 text-xs z-10 bg-gray-200"
              >
                {video.vod_year}
              </Badge>
            )}
            {/* 热播/完结标签（自定义红色样式，兼容 Badge 类型） */}
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

// 同时支持默认导出和命名导出（兼容所有导入场景）
export default VideoCard;
