import { categories } from "../components/CategoryIcons";

const MacroCard = ({ label, value, unit, bg, iconBg, textColor, icon }) => (
  <div className="bg-white rounded-xl border flex flex-col items-center py-2.5 px-1 gap-1" style={{ borderColor: "#E2E8F0" }}>
    <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: bg }}>
      {icon}
    </div>
    <div className="text-[15px] font-semibold" style={{ color: textColor }}>{value}{unit}</div>
    <div className="text-[8px] font-light" style={{ color: "#8A97A8" }}>{label}</div>
  </div>
);

export default function Result({ food, onNavigate }) {
  if (!food) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-24 gap-4 px-8 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "#E6F1FB" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="3" y="7" width="26" height="19" rx="4" stroke="#378ADD" strokeWidth="2" />
            <circle cx="16" cy="16.5" r="5" stroke="#378ADD" strokeWidth="2" />
            <path d="M12 7L14 4h4l2 3" stroke="#378ADD" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="text-sm font-medium" style={{ color: "#0C447C" }}>ยังไม่มีผลลัพธ์</div>
        <div className="text-xs font-light" style={{ color: "#8A97A8" }}>ถ่ายรูปอาหารก่อนเพื่อดูผลลัพธ์</div>
        <button
          onClick={() => onNavigate("home")}
          className="px-6 py-2.5 rounded-xl text-white text-sm font-medium"
          style={{ background: "#378ADD" }}
        >
          ไปหน้าสแกน
        </button>
      </div>
    );
  }

  const cat = categories.find((c) => c.id === "chicken");
  const pct = Math.round((food.calories / food.goalCalories) * 100);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3 pb-4" style={{ background: "#378ADD" }}>
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-1.5 mb-2"
          style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6l4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          กลับ
        </button>
        <div className="text-[15px] font-semibold text-white">{food.name}</div>
        <div className="text-[10px] font-light mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
          วิเคราะห์โดย AI — มั่นใจ {food.confidence}%
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
        {/* Food Image Placeholder */}
        <div className="rounded-2xl overflow-hidden relative" style={{ background: "#E6F1FB", height: 120 }}>
          <div className="flex items-center justify-center h-full">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <ellipse cx="32" cy="44" rx="18" ry="7" fill="#EF9F27" opacity="0.25" />
              <ellipse cx="32" cy="41" rx="16" ry="5.5" fill="#FAC775" opacity="0.5" />
              <ellipse cx="32" cy="38" rx="14" ry="4.5" fill="#FAEEDA" />
              <path d="M23 32c0-6 3.5-9 9-9s9 3 9 9" fill="#D85A30" opacity="0.8" />
              <circle cx="32" cy="22" r="6" fill="#F5C4B3" />
              <circle cx="32" cy="22" r="4" fill="#D85A30" opacity="0.6" />
            </svg>
          </div>
          {/* Category Badge */}
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: cat?.bg }}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: cat?.iconBg }}
            >
              {cat?.icon && (
                <div style={{ transform: "scale(0.65)", transformOrigin: "center" }}>{cat.icon}</div>
              )}
            </div>
            <span className="text-[9px] font-medium" style={{ color: cat?.textColor }}>
              {food.category}
            </span>
          </div>
          <div
            className="absolute top-2.5 right-2.5 text-white text-[9px] font-medium px-2 py-1 rounded-full"
            style={{ background: "#0C447C" }}
          >
            AI {food.confidence}%
          </div>
        </div>

        {/* Calorie Card */}
        <div className="bg-white rounded-xl border p-3 flex items-center gap-3" style={{ borderColor: "#E2E8F0" }}>
          <div>
            <div className="text-[30px] font-semibold leading-none" style={{ color: "#0C447C" }}>
              {food.calories}
            </div>
            <div className="text-[10px] font-light mt-1" style={{ color: "#8A97A8" }}>แคลอรี่</div>
          </div>
          <div className="flex-1">
            <div className="text-[9px] mb-1.5" style={{ color: "#8A97A8" }}>
              {pct}% ของเป้าหมายวันนี้
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#EFF3F8" }}>
              <div
                className="h-full rounded-full"
                style={{ background: "#378ADD", width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <div className="text-[9px] mt-1.5" style={{ color: "#185FA5" }}>
              เป้า {food.goalCalories.toLocaleString()} kcal/วัน
            </div>
          </div>
        </div>

        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-2">
          <MacroCard
            label="โปรตีน"
            value={food.protein}
            unit="g"
            bg="#E6F1FB"
            textColor="#0C447C"
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11V5c0-1.7 1.3-3 3-3s3 1.3 3 3v6" stroke="#378ADD" strokeWidth="1.1" strokeLinecap="round" />
                <path d="M2 11h10" stroke="#378ADD" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            }
          />
          <MacroCard
            label="ไขมัน"
            value={food.fat}
            unit="g"
            bg="#FAEEDA"
            textColor="#633806"
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2c0 0-3.5 2.5-3.5 5.5S5 11.5 7 11.5s3.5-1.5 3.5-4S7 2 7 2z" fill="#EF9F27" opacity="0.7" />
              </svg>
            }
          />
          <MacroCard
            label="คาร์โบไฮเดรต"
            value={food.carbs}
            unit="g"
            bg="#EAF3DE"
            textColor="#27500A"
            icon={
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <ellipse cx="7" cy="9.5" rx="4" ry="2" fill="#639922" opacity="0.6" />
                <ellipse cx="7" cy="8" rx="3.5" ry="1.5" fill="#639922" opacity="0.4" />
                <path d="M4.5 8C4.5 6 5.5 5 7 5s2.5 1 2.5 3" stroke="#27500A" strokeWidth="1" strokeLinecap="round" />
              </svg>
            }
          />
        </div>

        {/* Save Button */}
        <button
          onClick={() => onNavigate("history")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-medium"
          style={{ background: "#1D9E75" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 2v9M5 9l2.5 2.5L10 9" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            <rect x="2" y="12" width="11" height="1.5" rx="0.75" fill="white" />
          </svg>
          บันทึกลงประวัติการกิน
        </button>

        {/* Nutritional Info Note */}
        <div
          className="rounded-xl p-3 flex gap-2 items-start"
          style={{ background: "#E6F1FB" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
            <circle cx="7" cy="7" r="6" stroke="#378ADD" strokeWidth="1.2" />
            <path d="M7 6v4" stroke="#378ADD" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7" cy="4.5" r="0.7" fill="#378ADD" />
          </svg>
          <span className="text-[10px] font-light leading-relaxed" style={{ color: "#185FA5" }}>
            ค่าแคลอรี่เป็นการประมาณจาก AI อาจมีความคลาดเคลื่อนตามขนาดอาหารจริง
          </span>
        </div>
      </div>
    </div>
  );
}
