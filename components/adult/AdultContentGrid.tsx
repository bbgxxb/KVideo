'use client';
import { RefObject } from 'react';
import { TYPE_MAPPER } from '@/lib/constants/custom-types';

// 定义成人视频类型
interface AdultVideo {
  vod_id: string | number;
  vod_name: string;
  vod_pic?: string;
  vod_remarks?: string;
  type_name?: string;
  source: string;
  play_url?: string;
}

// 定义组件接收的属性类型（完整匹配传入参数）
interface AdultContentGridProps {
  videos: AdultVideo[]; // 视频列表（必传）
  loading: boolean; // 加载状态
  hasMore: boolean; // 是否有更多视频
  onVideoClick: (video: AdultVideo) => void; // 视频点击回调
  prefetchRef: RefObject<HTMLDivElement | null>; // 预加载Ref
  loadMoreRef: RefObject<HTMLDivElement | null>; // 加载更多Ref
}

// 组件实现
export function AdultContentGrid({
  videos,
  loading,
  hasMore,
  onVideoClick,
  prefetchRef,
  loadMoreRef
}: AdultContentGridProps) {
  // 加载状态展示
  if (loading && videos.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        正在加载视频...
      </div>
    );
  }

  // 无数据展示
  if (!loading && videos.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        暂无成人视频内容
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 视频网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map(video => {
          // 替换为自定义分类
          const customType = TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"];
          return (
            <div
              key={`${video.vod_id}-${video.source}`}
              className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              onClick={() => onVideoClick(video)} // 绑定点击事件
            >
              {video.vod_pic && (
                <img
                  src={video.vod_pic}
                  alt={video.vod_name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              )}
              <div className="p-3">
                <h4 className="text-white truncate text-sm">{video.vod_name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-300 bg-gray-800 px-2 py-0.5 rounded">
                    {customType}
                  </span>
                  {video.vod_remarks && (
                    <span className="text-xs text-yellow-400 bg-gray-800 px-2 py-0.5 rounded">
                      {video.vod_remarks}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 加载更多状态 */}
      {loading && videos.length > 0 && (
        <div className="flex justify-center items-center py-4 text-gray-400">
          加载更多视频...
        </div>
      )}

      {/* 无更多数据提示 */}
      {!loading && !hasMore && videos.length > 0 && (
        <div className="flex justify-center items-center py-4 text-gray-400">
          已加载全部视频
        </div>
      )}

      {/* 用于无限滚动的Ref占位 */}
      <div ref={prefetchRef} className="h-10" />
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}

// 默认导出（适配父组件导入方式）
export default AdultContentGrid;
