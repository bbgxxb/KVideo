// 自定义分类列表（完整覆盖豆瓣分类）
export const CUSTOM_VIDEO_TYPES = [
  { type: "都市", count: 0 },
  { type: "赘婿", count: 0 },
  { type: "战神", count: 0 },
  { type: "古代言情", count: 0 },
  { type: "现代言情", count: 0 },
  { type: "历史", count: 0 },
  { type: "脑洞", count: 0 },
  { type: "玄幻", count: 0 },
  { type: "电视节目", count: 0 },
  { type: "搞笑", count: 0 },
  { type: "网剧", count: 0 },
  { type: "喜剧", count: 0 },
  { type: "萌宝", count: 0 },
  { type: "神豪", count: 0 },
  { type: "致富", count: 0 },
  { type: "奇幻脑洞", count: 0 },
  { type: "超能", count: 0 },
  { type: "强者回归", count: 0 },
  { type: "甜宠", count: 0 },
  { type: "励志", count: 0 },
  { type: "豪门恩怨", count: 0 },
  { type: "复仇", count: 0 },
  { type: "长生", count: 0 },
  { type: "神医", count: 0 },
  { type: "马甲", count: 0 },
  { type: "亲情", count: 0 },
  { type: "小人物", count: 0 },
  { type: "奇幻", count: 0 },
  { type: "无敌", count: 0 },
  { type: "现实", count: 0 },
  { type: "重生", count: 0 },
  { type: "闪婚", count: 0 },
  { type: "职场商战", count: 0 },
  { type: "穿越", count: 0 },
  { type: "年代", count: 0 },
  { type: "权谋", count: 0 },
  { type: "高手下山", count: 0 },
  { type: "悬疑", count: 0 },
  { type: "家国情仇", count: 0 },
  { type: "虐恋", count: 0 },
  { type: "古装", count: 0 },
  { type: "时空之旅", count: 0 },
  { type: "玄幻仙侠", count: 0 },
  { type: "欢喜冤家", count: 0 },
  { type: "传承觉醒", count: 0 },
  { type: "情感", count: 0 },
  { type: "逆袭", count: 0 },
  { type: "家庭", count: 0 },
];

// 豆瓣分类 → 自定义分类 映射（兜底：无匹配归为「现实」）
export const TYPE_MAPPER = {
  "剧情": "现实",
  "喜剧": "喜剧",
  "动作": "战神",
  "爱情": "情感",
  "科幻": "超能",
  "悬疑": "悬疑",
  "惊悚": "悬疑",
  "恐怖": "脑洞",
  "纪录片": "历史",
  "动画": "奇幻",
  "古装": "古装",
  "武侠": "高手下山",
  "仙侠": "玄幻仙侠",
  "都市": "都市",
  "奇幻": "奇幻",
  "冒险": "时空之旅",
  "犯罪": "复仇",
  "励志": "励志",
  "家庭": "家庭",
  "战争": "家国情仇",
  "传记": "历史",
  "音乐": "电视节目",
  "歌舞": "电视节目",
  "戏曲": "电视节目",
  "西部": "脑洞",
  "默片": "历史",
  "短片": "网剧",
  "真人秀": "电视节目",
  "脱口秀": "搞笑",
  "儿童": "萌宝",
  "伦理": "豪门恩怨",
  "情色": "成人",
  "默认": "现实"
};

// 自定义推荐列表（替换豆瓣推荐数据，可自行修改）
export const CUSTOM_RECOMMEND_VIDEOS = [
  {
    vod_id: "custom_reco_1",
    vod_name: "都市赘婿：战神归来",
    vod_pic: "https://picsum.photos/200/300?random=1",
    type_name: "赘婿",
    vod_remarks: "热门",
    source: "custom"
  },
  {
    vod_id: "custom_reco_2",
    vod_name: "古代言情：甜宠王妃",
    vod_pic: "https://picsum.photos/200/300?random=2",
    type_name: "古代言情",
    vod_remarks: "高分",
    source: "custom"
  },
  {
    vod_id: "custom_reco_3",
    vod_name: "神医：马甲遍地走",
    vod_pic: "https://picsum.photos/200/300?random=3",
    type_name: "神医",
    vod_remarks: "热播",
    source: "custom"
  },
  {
    vod_id: "custom_reco_4",
    vod_name: "职场商战：逆袭成首富",
    vod_pic: "https://picsum.photos/200/300?random=4",
    type_name: "职场商战",
    vod_remarks: "完结",
    source: "custom"
  },
  {
    vod_id: "custom_reco_5",
    vod_name: "悬疑：豪门恩怨与复仇",
    vod_pic: "https://picsum.photos/200/300?random=5",
    type_name: "悬疑",
    vod_remarks: "连载",
    source: "custom"
  },
  {
    vod_id: "custom_reco_6",
    vod_name: "年代致富：从摆摊开始",
    vod_pic: "https://picsum.photos/200/300?random=6",
    type_name: "致富",
    vod_remarks: "经典",
    source: "custom"
  }
];

// 所有自定义分类类型集合
export const ALL_CUSTOM_TYPES = CUSTOM_VIDEO_TYPES.map(item => item.type);
