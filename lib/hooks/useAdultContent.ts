import { useState, useEffect, useCallback } from 'react';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import { settingsStore } from '@/lib/store/settings-store';
import { TYPE_MAPPER } from '@/lib/constants/custom-types';

// 成人视频类型定义
interface AdultVideo {
  vod_id: string | number;
  vod_name: string;
  vod_pic?: string;
  vod_remarks?: string;
  type_name?: string;
  source: string;
  play_url?: string;
}

const PAGE_LIMIT = 20;

export function useAdultContent(categoryValue: string) {
  const [videos, setVideos] = useState<AdultVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 加载成人视频（替换豆瓣分类）
  const loadVideos = useCallback(async (pageNum: number, append = false) => {
    if (loading) return;

    setLoading(true);
    try {
      const settings = settingsStore.getSettings();
      const adultSources = [
        ...settings.adultSources,
        ...settings.subscriptions.filter(s => (s as any).group === 'adult')
      ].filter(s => (s as any).enabled !== false);

      const response = await fetch('/api/adult/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sources: adultSources,
          category: categoryValue,
          page: pageNum.toString(),
          limit: PAGE_LIMIT.toString()
        })
      });

      if (!response.ok) throw new Error('Failed to fetch adult videos');

      const data = await response.json();
      // 替换分类为自定义分类
      const newVideos = (data.videos || []).map((video: AdultVideo) => ({
        ...video,
        type_name: TYPE_MAPPER[video.type_name as keyof typeof TYPE_MAPPER] || TYPE_MAPPER["默认"]
      }));

      setVideos(prev => append ? [...prev, ...newVideos] : newVideos);
      setHasMore(newVideos.length === PAGE_LIMIT);
    } catch (error) {
      console.error('Failed to load adult videos:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, categoryValue]);

  // 分类切换时重置数据
  useEffect(() => {
    setPage(1);
    setVideos([]);
    setHasMore(true);
    loadVideos(1, false);
  }, [categoryValue, loadVideos]);

  // 无限滚动逻辑
  const { prefetchRef, loadMoreRef } = useInfiniteScroll({
    hasMore,
    loading,
    page,
    onLoadMore: (nextPage) => {
      setPage(nextPage);
      loadVideos(nextPage, true);
    },
  });

  return {
    videos,
    loading,
    hasMore,
    prefetchRef,
    loadMoreRef,
  };
}
