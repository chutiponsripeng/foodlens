const NavIcon = ({ type, active }) => {
  const color = active ? "#378ADD" : "#8A97A8";
  if (type === "home")
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="2" width="16" height="16" rx="3" stroke={color} strokeWidth="1.5" />
        <circle cx="10" cy="10" r="3" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  if (type === "result")
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 16l4.5-5.5 3 3.5 2.5-3 4 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="2" width="16" height="16" rx="3" stroke={color} strokeWidth="1.5" />
      </svg>
    );
  if (type === "history")
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 6h12M4 10h9M4 14h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="2" width="16" height="16" rx="3" stroke={color} strokeWidth="1.5" />
      </svg>
    );
};

const tabs = [
  { id: "home", label: "สแกน", icon: "home" },
  { id: "result", label: "ผลลัพธ์", icon: "result" },
  { id: "history", label: "ประวัติ", icon: "history" },
];

export default function BottomNav({ current, onNavigate }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 grid grid-cols-3 py-2 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          className="flex flex-col items-center gap-1 py-1"
        >
          <NavIcon type={tab.icon} active={current === tab.id} />
          <span
            className="text-[10px] font-medium"
            style={{ color: current === tab.id ? "#378ADD" : "#8A97A8" }}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
