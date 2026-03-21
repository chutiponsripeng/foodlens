import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { categories } from "../components/CategoryIcons"

export default function History({ onNavigate }) {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)

  // ดึงข้อมูลจาก Firestore ตอน component โหลด
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const q = query(
          collection(db, 'meals'),
          orderBy('createdAt', 'desc'),
          limit(20)
        )
        const snap = await getDocs(q)
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMeals(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMeals()
  }, [])

  // คำนวณแคลอรี่รวมวันนี้
  const today = new Date().toISOString().split('T')[0]
  const todayMeals = meals.filter(m => m.createdAt?.startsWith(today))
  const totalCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0)
  const goalCalories = 1800
  const pct = Math.min(Math.round((totalCalories / goalCalories) * 100), 100)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full pt-24">
        <div className="text-sm font-light" style={{ color: "#8A97A8" }}>กำลังโหลด...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-3 pb-3">
        <div className="text-[10px] font-light" style={{ color: "#8A97A8" }}>
          {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
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
            <div className="h-full rounded-full bg-white" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-[9px] font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
            {totalCalories >= goalCalories
              ? "ถึงเป้าหมายแล้ว!"
              : `เหลืออีก ${(goalCalories - totalCalories).toLocaleString()} kcal — ทำได้ดีมาก!`}
          </div>
        </div>

        {/* Macro Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl py-2.5 px-2 text-center" style={{ background: "#E6F1FB" }}>
            <div className="text-[14px] font-semibold" style={{ color: "#0C447C" }}>
              {todayMeals.reduce((sum, m) => sum + (m.protein || 0), 0)}g
            </div>
            <div className="text-[9px] font-light mt-0.5" style={{ color: "#185FA5" }}>โปรตีน</div>
          </div>
          <div className="rounded-xl py-2.5 px-2 text-center" style={{ background: "#FAEEDA" }}>
            <div className="text-[14px] font-semibold" style={{ color: "#633806" }}>
              {todayMeals.reduce((sum, m) => sum + (m.fat || 0), 0)}g
            </div>
            <div className="text-[9px] font-light mt-0.5" style={{ color: "#854F0B" }}>ไขมัน</div>
          </div>
          <div className="rounded-xl py-2.5 px-2 text-center" style={{ background: "#EAF3DE" }}>
            <div className="text-[14px] font-semibold" style={{ color: "#27500A" }}>
              {todayMeals.reduce((sum, m) => sum + (m.carbs || 0), 0)}g
            </div>
            <div className="text-[9px] font-light mt-0.5" style={{ color: "#3B6D11" }}>คาร์บ</div>
          </div>
        </div>

        {/* Meal List */}
        {meals.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-sm font-light" style={{ color: "#8A97A8" }}>ยังไม่มีประวัติการกิน</div>
            <div className="text-xs font-light mt-1" style={{ color: "#8A97A8" }}>ถ่ายรูปอาหารเพื่อเริ่มบันทึก</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-medium" style={{ color: "#8A97A8", letterSpacing: "0.04em" }}>
              รายการล่าสุด
            </div>
            {meals.map((meal) => {
              const cat = categories.find((c) => c.id === meal.categoryId) || categories[7]
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
                      {new Date(meal.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-medium" style={{ color: "#378ADD" }}>
                      {meal.calories}
                    </div>
                    <div className="text-[9px]" style={{ color: "#8A97A8" }}>kcal</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Add Meal Button */}
        <button
          onClick={() => onNavigate("home")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-medium border"
          style={{ color: "#378ADD", borderColor: "#B5D4F4", background: "#E6F1FB" }}
        >
          + เพิ่มมื้ออาหาร
        </button>
      </div>
    </div>
  )
}