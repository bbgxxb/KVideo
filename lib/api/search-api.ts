import { VideoSource } from "@/lib/types";
import { TYPE_MAPPER } from "@/lib/constants/custom-types";

// 视频项类型定义
export interface VideoItem {
  vod_id: string | number;
  vod_name: string;
  vod_pic?: string;
  vod_remarks?: string;
  type_name?: string;
  vod_year?: string;
  vod_area?: string;
  vod_actor?: string;
  vod_director?: string;
  vod_intro?: string;
  source: string;
  play_url?: string;
  episodes?: Array<{ id: string | number; name: string; url: string }>;
}

// 按来源搜索视频
async function searchVideosBySource(
  query: string,
  source: VideoSource,
  page: number = 1
): Promise<{ results: VideoItem[]; source: string }> {
  // 此处已剥离豆瓣接口依赖，若你有其他数据源，可在此接入
  // 临时返回自定义推荐数据（模拟搜索结果）
  const mockResults = CUSTOM_RECOMMEND_VIDEOS.map(video => ({
    ...video,
    vod_name: query ? `${query}_${video.vod_name}` : video.vod_name
  }));

  return {
    results: mockResults,
    source: source.id
  };
}

// 批量搜索视频（核心：替换豆瓣分类为自定义分类）
export async function searchVideos(
  query: string,
  sources: VideoSource[],
  page: number = 1
): Promise<Array<{ results: VideoItem[]; source: string; responseTime?: number; error?: string }>> {
  const searchPromises = sources.map(async source => {
    try {
      const startTime = Date.now();
      const result = await searchVideosBySource(query, source, page);
      const responseTime = Date.now() - startTime;

      // 核心：替换所有视频的分类为自定义分类
      result.results = result.results.map(video => ({
        ...video,
        type_name: TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"]
      }));

      return {
        ...result,
        responseTime
      };
    } catch (error) {
      return {
        results: [],
        source: source.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });

  return Promise.all(searchPromises);
}

// 获取推荐视频（替换豆瓣推荐）
export async function getRecommendVideos(): Promise<VideoItem[]> {
  from "@/lib/constants/custom-types";
  // 直接返回自定义推荐列表
  return CUSTOM_RECOMMEND_VIDEOS.map(video => ({
    ...video,
    type_name: TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"]
  }));
}
