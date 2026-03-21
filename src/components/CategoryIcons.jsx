export const categories = [
  {
    id: "rice",
    name: "ข้าว",
    bg: "#FAEEDA",
    border: "#FAC775",
    iconBg: "#EF9F27",
    textColor: "#633806",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <ellipse cx="11" cy="15" rx="6" ry="2.5" fill="white" opacity="0.9" />
        <ellipse cx="11" cy="13" rx="5" ry="2" fill="white" opacity="0.7" />
        <path d="M8 13C8 10 9.5 8.5 11 8.5s3 1.5 3 4.5" fill="white" opacity="0.5" />
        <ellipse cx="11" cy="8.5" rx="2.5" ry="2" fill="white" opacity="0.8" />
      </svg>
    ),
  },
  {
    id: "chicken",
    name: "ไก่/เนื้อ",
    bg: "#FAECE7",
    border: "#F5C4B3",
    iconBg: "#D85A30",
    textColor: "#712B13",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M7 16c0-3 1.5-4.5 4-4.5s4 1.5 4 4.5" fill="white" opacity="0.8" />
        <circle cx="11" cy="8.5" r="3" fill="white" opacity="0.85" />
        <path d="M9 6C9 4.9 9.9 4 11 4s2 .9 2 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "noodle",
    name: "เส้น",
    bg: "#EEEDFE",
    border: "#CECBF6",
    iconBg: "#7F77DD",
    textColor: "#3C3489",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 9c2 2.5 4 4 6 4s4-1.5 6-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5 13c2 2 4 3 6 3s4-1 6-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5 6c2 2.5 4 4 6 4s4-1.5 6-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    id: "veg",
    name: "ผัก",
    bg: "#EAF3DE",
    border: "#C0DD97",
    iconBg: "#639922",
    textColor: "#27500A",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 17V10" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M11 10C11 10 8 8 7 6c2.5 0 4 1.5 4 4z" fill="white" opacity="0.9" />
        <path d="M11 10C11 10 14 8 15 6c-2.5 0-4 1.5-4 4z" fill="white" opacity="0.9" />
        <path d="M11 13C11 13 8.5 11 8 9c2 .2 3 1.5 3 4z" fill="white" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "curry",
    name: "แกง",
    bg: "#E1F5EE",
    border: "#9FE1CB",
    iconBg: "#1D9E75",
    textColor: "#085041",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M6 12h10l-2 6H8L6 12z" fill="white" opacity="0.85" />
        <path d="M5 12h12" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M9 12V9c0-1.2.6-2.5 2-2.5S13 7.8 13 9v3" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "dessert",
    name: "ขนม",
    bg: "#FBEAF0",
    border: "#F4C0D1",
    iconBg: "#D4537E",
    textColor: "#72243E",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="6" y="12" width="10" height="5" rx="2" fill="white" opacity="0.85" />
        <path d="M8 12V10c0-1.7 1.3-3 3-3s3 1.3 3 3v2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M10 9c0-1.1.4-1.8 1-1.8" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "drink",
    name: "เครื่องดื่ม",
    bg: "#E6F1FB",
    border: "#B5D4F4",
    iconBg: "#378ADD",
    textColor: "#0C447C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M8 6h6l-1 11H9L8 6z" fill="white" opacity="0.85" />
        <path d="M7 9h8" stroke="#378ADD" strokeWidth="1" strokeLinecap="round" />
        <path d="M14 7l2-2" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "other",
    name: "อื่นๆ",
    bg: "#F1EFE8",
    border: "#D3D1C7",
    iconBg: "#888780",
    textColor: "#444441",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="2.2" fill="white" />
        <circle cx="11" cy="5.5" r="1.8" fill="white" opacity="0.7" />
        <circle cx="11" cy="16.5" r="1.8" fill="white" opacity="0.7" />
      </svg>
    ),
  },
];

export function CategoryIcon({ category, size = 38 }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{ width: size, height: size, background: category.iconBg }}
    >
      {category.icon}
    </div>
  );
}

export function CategoryCard({ category, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-xl p-2 border transition-all"
      style={{
        background: category.bg,
        borderColor: active ? category.iconBg : category.border,
        boxShadow: active ? `0 0 0 2px ${category.iconBg}33` : "none",
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl"
        style={{ width: 38, height: 38, background: category.iconBg }}
      >
        {category.icon}
      </div>
      <span className="text-[9px] font-medium leading-tight text-center" style={{ color: category.textColor }}>
        {category.name}
      </span>
    </button>
  );
}

export function MealCategoryIcon({ categoryId, size = 34 }) {
  const cat = categories.find((c) => c.id === categoryId) || categories[7];
  return (
    <div
      className="flex items-center justify-center rounded-xl flex-shrink-0"
      style={{ width: size, height: size, background: cat.bg }}
    >
      <div
        className="flex items-center justify-center rounded-lg"
        style={{ width: size - 8, height: size - 8, background: cat.iconBg }}
      >
        {cat.icon}
      </div>
    </div>
  );
}
