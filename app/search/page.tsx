'use client';
import { useState, useEffect, useCallback } from 'react';
import TypeBadgeList from '@/components/search/TypeBadgeList';
import { VideoCard } from '@/components/search/VideoCard';
import { searchVideos } from '@/lib/api/search-api';
import { CUSTOM_VIDEO_TYPES, ALL_CUSTOM_TYPES, TYPE_MAPPER } from '@/lib/constants/custom-types';
import { settingsStore } from '@/lib/store/settings-store';
import { VideoSource } from '@/lib/types';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [badges, setBadges] = useState(CUSTOM_VIDEO_TYPES);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  // 获取启用的视频源
  const getEnabledSources = useCallback((): VideoSource[] => {
    const settings = settingsStore.getSettings();
    return [
      ...settings.sources,
      ...settings.subscriptions.filter(s => (s as any).group !== 'adult')
    ].filter(s => (s as any).enabled !== false) as VideoSource[];
  }, []);

  // 处理搜索
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    const sources = getEnabledSources();
    const results = await searchVideos(query.trim(), sources);
    const flatResults = results.flatMap(item => item.results);
    setSearchResults(flatResults);
    setLoading(false);
  }, [getEnabledSources]);

  // 统计自定义分类数量
  useEffect(() => {
    if (searchResults.length === 0) return;

    // 初始化分类计数为0
    const typeCount = ALL_CUSTOM_TYPES.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as Record<string, number>);

    // 遍历结果统计数量
    searchResults.forEach(video => {
      const customType = video.type_name || TYPE_MAPPER["默认"];
      if (typeCount[customType] !== undefined) {
        typeCount[customType]++;
      }
    });

    // 更新分类标签计数
    setBadges(CUSTOM_VIDEO_TYPES.map(item => ({
      ...item,
      count: typeCount[item.type] || 0
    })));
  }, [searchResults]);

  // 切换分类筛选
  const onToggleType = useCallback((type: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(type)) {
      newSelected.delete(type);
    } else {
      newSelected.add(type);
    }
    setSelectedTypes(newSelected);

    // 筛选结果
    if (newSelected.size === 0) {
      // 无选中分类，显示全部
      const sources = getEnabledSources();
      searchVideos(searchQuery, sources).then(res => {
        setSearchResults(res.flatMap(item => item.results));
      });
    } else {
      // 按选中分类筛选
      const filtered = searchResults.filter(video => newSelected.has(video.type_name));
      setSearchResults(filtered);
    }
  }, [selectedTypes, searchQuery, searchResults, getEnabledSources]);

  // 输入框回车搜索
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 搜索输入框 */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入视频名称搜索..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => handleSearch(searchQuery)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          搜索
        </button>
      </div>

      {/* 自定义分类筛选标签 */}
      <div className="mb-6 overflow-x-auto">
        <TypeBadgeList
          badges={badges}
          selectedTypes={selectedTypes}
          onToggleType={onToggleType}
        />
      </div>

      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <span className="text-xl text-gray-500">正在搜索...</span>
        </div>
      )}

      {/* 搜索结果展示 */}
      {!loading && searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {searchResults.map(video => (
            <VideoCard
              key={`${video.vod_id}-${video.source}`}
              video={video}
              onCardClick={() => {
                // 此处可添加视频点击跳转逻辑
                console.log("点击视频：", video.vod_name);
              }}
            />
          ))}
        </div>
      )}

      {/* 无结果提示 */}
      {!loading && searchResults.length === 0 && (
        <div className="flex justify-center items-center py-10 text-gray-500">
          暂无相关视频结果，请更换关键词或分类重试
        </div>
      )}
    </div>
  );
}
