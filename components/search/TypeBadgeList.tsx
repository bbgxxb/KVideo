'use client';
import { FC } from 'react';

// 定义组件接收的属性类型
interface TypeBadgeListProps {
  badges: { type: string; count: number }[]; // 分类列表（含计数）
  selectedTypes: Set<string>; // 已选中的分类
  onToggleType: (type: string) => void; // 分类切换回调
}

// 组件实现（使用FC类型，明确属性约束）
const TypeBadgeList: FC<TypeBadgeListProps> = ({ badges, selectedTypes, onToggleType }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <button
          key={badge.type}
          onClick={() => onToggleType(badge.type)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTypes.has(badge.type)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
          disabled={badge.count === 0} // 计数为0时禁用
        >
          {badge.type} {badge.count > 0 && `(${badge.count})`}
        </button>
      ))}
    </div>
  );
};

// 默认导出（适配页面的默认导入）
export default TypeBadgeList;
