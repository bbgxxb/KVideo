import { TYPE_MAPPER } from '@/lib/constants/custom-types';

// 成人视频类型定义
interface AdultVideo {
  vod_id: string | number;
  vod_name: string;
  vod_pic?: string;
  vod_remarks?: string;
  type_name?: string;
  source: string;
}

// 成人内容网格属性
interface AdultContentGridProps {
  videos: AdultVideo[];
}

export function AdultContentGrid({ videos }: AdultContentGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-400">
        暂无成人视频内容
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map(video => {
        // 替换为自定义分类
        const customType = TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"];
        return (
          <div
            key={`${video.vod_id}-${video.source}`}
            className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
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
  );
}
