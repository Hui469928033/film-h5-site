import posterScifi from "@/assets/poster-scifi.jpg";
import posterAction from "@/assets/poster-action.jpg";
import posterRomance from "@/assets/poster-romance.jpg";
import posterDoc from "@/assets/poster-doc.jpg";
import crowdScifi from "@/assets/crowd-scifi.jpg";
import crowdDoc from "@/assets/crowd-doc.jpg";
import courseMj from "@/assets/course-mj.jpg";
import courseSd from "@/assets/course-sd.jpg";

// --- Models ---
export interface Movie {
  id: string;
  title: string;
  genre: string[];
  rating: number;
  year: number;
  duration: string;
  description: string;
  poster: string;
  backdrop: string;
  isVip: boolean;
  price: number;
  trailerUrl: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  targetAmount: number;
  currentAmount: number;
  backers: number;
  daysLeft: number;
  tiers: {
      id: string;
      name: string;
      price: number;
      description: string;
      items: string[];
  }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: "Basic" | "Advanced";
  price: number;
  lessons: number;
  duration: string;
  chapters: { title: string; duration: string }[];
}

// --- Mock Data (ZH) - Adjusted for CNY ---
const MOVIES_ZH: Movie[] = [
  {
    id: "1",
    title: "霓虹地平线",
    genre: ["科幻", "赛博朋克"],
    rating: 9.2,
    year: 2026,
    duration: "2小时 14分",
    description: "在一个永不沉睡的城市里，一位半机械侦探揭开了一个威胁要重启人类文明的阴谋。",
    poster: posterScifi,
    backdrop: posterScifi,
    isVip: true,
    price: 12.00,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "2",
    title: "午夜狂奔",
    genre: ["动作", "惊悚"],
    rating: 8.5,
    year: 2025,
    duration: "1小时 58分",
    description: "东京街头的高能追逐。一个司机，一个包裹，没有规则。",
    poster: posterAction,
    backdrop: posterAction,
    isVip: true,
    price: 6.00,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
  },
  {
    id: "3",
    title: "雨天",
    genre: ["爱情", "剧情"],
    rating: 8.8,
    year: 2024,
    duration: "1小时 45分",
    description: "雨中的一次偶遇，引出一段跨越时间和距离的爱情故事。",
    poster: posterRomance,
    backdrop: posterRomance,
    isVip: false,
    price: 0,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "4",
    title: "荒野地球",
    genre: ["纪录片", "自然"],
    rating: 9.5,
    year: 2025,
    duration: "1小时 30分",
    description: "前往地球最偏远的角落，体验这场令人屏息的视觉杰作。",
    poster: posterDoc,
    backdrop: posterDoc,
    isVip: true,
    price: 3.00,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  }
];

const PROJECTS_ZH: Project[] = [
    {
        id: "p1",
        title: "《星际迷航：起源》短片孵化",
        description: "一部硬科幻短片，探索人类首次接触外星文明的真相。我们需要您的支持来完成后期特效制作。",
        image: crowdScifi,
        targetAmount: 2000000,
        currentAmount: 1250000,
        backers: 1240,
        daysLeft: 14,
        tiers: [
            { id: "t1", name: "早期支持者", price: 68, description: "感谢您的支持！", items: ["电子版感谢信", "片尾鸣谢名单"] },
            { id: "t2", name: "极客套装", price: 298, description: "限量周边等你拿", items: ["片尾鸣谢名单", "限量T恤", "电子版海报"] },
            { id: "t3", name: "联合制片人", price: 8888, description: "成为我们的伙伴", items: ["联合制片人署名", "探班剧组", "首映礼门票"] }
        ]
    },
    {
        id: "p2",
        title: "《最后的雨林》生态纪录片",
        description: "深入亚马逊雨林腹地，记录即将消失的部落与物种。这是一场与时间的赛跑。",
        image: crowdDoc,
        targetAmount: 500000,
        currentAmount: 128000,
        backers: 310,
        daysLeft: 28,
        tiers: [
             { id: "t1", name: "种子力量", price: 50, description: "为环保助力", items: ["电子版证书"] },
             { id: "t2", name: "丛林探险", price: 699, description: "获得独家素材", items: ["4K原始素材下载", "导演签名照"] }
        ]
    }
];

const COURSES_ZH: Course[] = [
    {
        id: "c1",
        title: "Midjourney 电影概念艺术实战",
        description: "从零开始学习如何使用 Midjourney 生成高质量的电影概念图、分镜脚本与海报。",
        image: courseMj,
        level: "Basic",
        price: 299,
        lessons: 12,
        duration: "6小时",
        chapters: [
            { title: "AI 绘画基础原理", duration: "45m" },
            { title: "Prompt 提示词工程进阶", duration: "60m" },
            { title: "电影光影与构图控制", duration: "90m" },
            { title: "实战：制作一套科幻电影概念图", duration: "120m" }
        ]
    },
    {
        id: "c2",
        title: "Stable Diffusion 视频风格化工作流",
        description: "掌握 ComfyUI 工作流，实现视频转视频（Vid2Vid）的风格迁移与动画制作。",
        image: courseSd,
        level: "Advanced",
        price: 1299,
        lessons: 18,
        duration: "10小时",
        chapters: [
            { title: "本地部署与环境搭建", duration: "60m" },
            { title: "ControlNet 精准控制", duration: "90m" },
            { title: "AnimateDiff 动画生成", duration: "120m" },
            { title: "商业案例解析", duration: "90m" }
        ]
    }
];

// --- Mock Data (EN) - Prices also adjusted to CNY roughly for consistency in this demo context ---
const MOVIES_EN: Movie[] = [
  {
    id: "1",
    title: "NEON HORIZON",
    genre: ["Sci-Fi", "Cyberpunk"],
    rating: 9.2,
    year: 2026,
    duration: "2h 14m",
    description: "In a city that never sleeps, a cyborg detective uncovers a conspiracy that threatens to reboot humanity.",
    poster: posterScifi,
    backdrop: posterScifi,
    isVip: true,
    price: 12.00,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  },
  {
    id: "2",
    title: "MIDNIGHT RUN",
    genre: ["Action", "Thriller"],
    rating: 8.5,
    year: 2025,
    duration: "1h 58m",
    description: "High-octane pursuit through the streets of Tokyo. One driver, one package, no rules.",
    poster: posterAction,
    backdrop: posterAction,
    isVip: true,
    price: 6.00,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
  },
  {
    id: "3",
    title: "RAINY DAYS",
    genre: ["Romance", "Drama"],
    rating: 8.8,
    year: 2024,
    duration: "1h 45m",
    description: "A chance encounter in the rain leads to a love story that defies time and distance.",
    poster: posterRomance,
    backdrop: posterRomance,
    isVip: false,
    price: 0,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  },
  {
    id: "4",
    title: "WILD EARTH",
    genre: ["Documentary", "Nature"],
    rating: 9.5,
    year: 2025,
    duration: "1h 30m",
    description: "Journey to the most remote corners of the planet in this breathtaking visual masterpiece.",
    poster: posterDoc,
    backdrop: posterDoc,
    isVip: true,
    price: 3.00,
    trailerUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  }
];

const PROJECTS_EN: Project[] = [
     {
        id: "p1",
        title: "Star Trek: Origins - Short Film",
        description: "A hard sci-fi short film exploring the truth of humanity's first contact.",
        image: crowdScifi,
        targetAmount: 2000000,
        currentAmount: 1250000,
        backers: 1240,
        daysLeft: 14,
        tiers: [
            { id: "t1", name: "Early Supporter", price: 68, description: "Thanks for support!", items: ["Digital Letter", "Credits Name"] }
        ]
    },
    {
        id: "p2",
        title: "The Last Rainforest",
        description: "Deep into the Amazon to record disappearing tribes and species.",
        image: crowdDoc,
        targetAmount: 500000,
        currentAmount: 128000,
        backers: 310,
        daysLeft: 28,
        tiers: [
             { id: "t1", name: "Seed Power", price: 50, description: "Help nature", items: ["Certificate"] }
        ]
    }
];

const COURSES_EN: Course[] = [
     {
        id: "c1",
        title: "Midjourney Concept Art Masterclass",
        description: "Learn to generate high-quality movie concept art from scratch.",
        image: courseMj,
        level: "Basic",
        price: 299,
        lessons: 12,
        duration: "6h",
        chapters: [{ title: "Basics", duration: "45m" }]
    },
    {
        id: "c2",
        title: "Stable Diffusion Video Workflow",
        description: "Master ComfyUI for video style transfer.",
        image: courseSd,
        level: "Advanced",
        price: 1299,
        lessons: 18,
        duration: "10h",
        chapters: [{ title: "Setup", duration: "60m" }]
    }
];

export const getMovies = (lang: "zh" | "en") => lang === "zh" ? MOVIES_ZH : MOVIES_EN;
export const getProjects = (lang: "zh" | "en") => lang === "zh" ? PROJECTS_ZH : PROJECTS_EN;
export const getCourses = (lang: "zh" | "en") => lang === "zh" ? COURSES_ZH : COURSES_EN;

export const MOVIES = MOVIES_ZH; 

export const MOCK_USER = {
  id: "u123",
  name: "王尼莫",
  avatar: "https://github.com/shadcn.png",
  isVip: false,
  balance: 888.00,
  backedProjects: ["p1"],
  enrolledCourses: ["c1"]
};
