import { categories } from "../components/CategoryIcons";

const historyData = [
  {
    section: "เช้า",
    meals: [
      { id: 1, name: "ข้าวสวย + ไข่ดาว", time: "07:30 น.", calories: 380, categoryId: "rice" },
    ],
  },
  {
    section: "กลางวัน",
    meals: [
      { id: 2, name: "ข้าวมันไก่", time: "12:15 น.", calories: 612, categoryId: "chicken" },
    ],
  },
  {
    section: "บ่าย",
    meals: [
      { id: 3, name: "ส้มตำ", time: "14:45 น.", calories: 187, categoryId: "veg" },
    ],
  },
];

const totalCalories = historyData.flatMap((s) => s.meals).reduce((sum, m) => sum + m.calories, 0);
const goalCalories = 1800;
const pct = Math.round((totalCalories / goalCalories) * 100);

export default function History({ onNavigate }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-3 pb-3">
        <div className="text-[10px] font-light" style={{ color: "#8A97A8" }}>วันเสาร์ที่ 21 มีนาคม 2569</div>
        <div className="text-[15px] font-semibold mt-1" style={{ color: "#0C447C" }}>ประวัติการกิน</div>
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
        {/* Daily Summary Card */}
        <div className="rounded-2xl p-4" style={{ background: "#378ADD" }}>
          <div className="text-[10px] font-light" style={{ color: "rgba(255,255,255,0.7)" }}>
            แคลอรี่รวมวันนี้
          </div>
          <div className="text-[26px] font-semibold text-white leading-tight mt-0.5">
            {totalCalories.toLocaleString()}{" "}
            <span className="text-[11px] font-light" style={{ opacity: 0.7 }}>
              / {goalCalories.toLocaleString()} kcal
            </span>
          </div>
          <div className="h-1.5 rounded-full mt-2.5 mb-1.5 overflow-hidden" style={{ background: "rgba(255,255,255,0.25)" }}>
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          <div className="text-[9px] font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
            เหลืออีก {(goalCalories - totalCalories).toLocaleString()} kcal — ทำได้ดีมาก!
          </div>
        </div>

        {/* Macro Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl py-2.5 px-2 text-center" style={{ background: "#E6F1FB" }}>
            <div className="text-[14px] font-semibold" style={{ color: "#0C447C" }}>98g</div>
            <div className="text-[9px] font-light mt-0.5" style={{ color: "#185FA5" }}>โปรตีน</div>
          </div>
          <div className="rounded-xl py-2.5 px-2 text-center" style={{ background: "#FAEEDA" }}>
            <div className="text-[14px] font-semibold" style={{ color: "#633806" }}>42g</div>
            <div className="text-[9px] font-light mt-0.5" style={{ color: "#854F0B" }}>ไขมัน</div>
          </div>
          <div className="rounded-xl py-2.5 px-2 text-center" style={{ background: "#EAF3DE" }}>
            <div className="text-[14px] font-semibold" style={{ color: "#27500A" }}>156g</div>
            <div className="text-[9px] font-light mt-0.5" style={{ color: "#3B6D11" }}>คาร์บ</div>
          </div>
        </div>

        {/* Meal List */}
        <div className="flex flex-col gap-2">
          {historyData.map((section) => (
            <div key={section.section}>
              <div
                className="text-[10px] font-medium mb-1.5 mt-1"
                style={{ color: "#8A97A8", letterSpacing: "0.04em" }}
              >
                {section.section}
              </div>
              {section.meals.map((meal) => {
                const cat = categories.find((c) => c.id === meal.categoryId);
                return (
                  <div
                    key={meal.id}
                    className="bg-white rounded-xl border flex items-center gap-2.5 px-3 py-2.5"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cat?.iconBg || "#888780" }}
                    >
                      {cat?.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[12px] font-medium" style={{ color: "#0C447C" }}>
                        {meal.name}
                      </div>
                      <div className="text-[9px] font-light mt-0.5" style={{ color: "#8A97A8" }}>
                        {meal.time} · {cat?.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-medium" style={{ color: "#378ADD" }}>
                        {meal.calories}
                      </div>
                      <div className="text-[9px]" style={{ color: "#8A97A8" }}>kcal</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Add Meal Button */}
        <button
          onClick={() => onNavigate("home")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-medium border"
          style={{ color: "#378ADD", borderColor: "#B5D4F4", background: "#E6F1FB" }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 3v9M3 7.5h9" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          เพิ่มมื้ออาหาร
        </button>
      </div>
    </div>
  );
}
