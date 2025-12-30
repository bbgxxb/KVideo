'use client';
import { useState, useEffect } from 'react';
import { TypeBadgeList } from '@/components/search/TypeBadgeList';
import { CUSTOM_VIDEO_TYPES, ALL_CUSTOM_TYPES, TYPE_MAPPER } from '@/lib/constants/custom-types';
import { searchVideos } from '@/lib/api/search-api';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [badges, setBadges] = useState(CUSTOM_VIDEO_TYPES); // 初始化为自定义分类
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  // 搜索逻辑（示例）
  const handleSearch = async (query: string) => {
    const sources = []; // 替换为你的数据源逻辑
    const results = await searchVideos(query, sources);
    const flatResults = results.flatMap(item => item.results);
    setSearchResults(flatResults);
  };

  // 统计自定义分类的视频数量
  useEffect(() => {
    if (searchResults.length === 0) return;

    // 初始化所有自定义分类的count为0
    const typeCount = ALL_CUSTOM_TYPES.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as Record<string, number>);

    // 遍历搜索结果，统计每个自定义分类的数量
    searchResults.forEach(video => {
      const customType = video.type_name || TYPE_MAPPER["默认"];
      if (typeCount[customType] !== undefined) {
        typeCount[customType]++;
      }
    });

    // 更新Badges的count值
    setBadges(CUSTOM_VIDEO_TYPES.map(item => ({
      ...item,
      count: typeCount[item.type] || 0
    })));
  }, [searchResults]);

  // 分类筛选切换逻辑
  const onToggleType = (type: string) => {
    const newSelected = new Set(selectedTypes);
    if (newSelected.has(type)) {
      newSelected.delete(type);
    } else {
      newSelected.add(type);
    }
    setSelectedTypes(newSelected);

    // 筛选搜索结果（仅显示选中分类的视频）
    if (newSelected.size === 0) {
      // 无选中分类时显示全部
      setSearchResults(prev => prev);
    } else {
      const filtered = searchResults.filter(video => newSelected.has(video.type_name));
      setSearchResults(filtered);
    }
  };

  return (
    <div>
      {/* 自定义分类筛选标签 */}
      <TypeBadgeList
        badges={badges}
        selectedTypes={selectedTypes}
        onToggleType={onToggleType}
      />
      {/* 搜索结果展示 */}
      <div className="mt-4">
        {searchResults.map(video => (
          <div key={video.vod_id} className="p-2 border-b">
            <h3>{video.vod_name}</h3>
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              {video.type_name} {/* 显示自定义分类 */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
