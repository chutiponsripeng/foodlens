import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import { categories } from "../components/CategoryIcons"
import { getUserId } from '../utils/userId'
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore"
import { getGoalCalories, setGoalCalories } from "../utils/goalCalories"

export default function History({ onNavigate }) {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [goalInput, setGoalInput] = useState(getGoalCalories())
  const [goalCalories, setGoalCaloriesState] = useState(getGoalCalories())
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const q = query(
          collection(db, 'meals'),
          where('userId', '==', getUserId()),
          orderBy('createdAt', 'desc'),
          limit(20)
        )
        const snap = await getDocs(q)
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setMeals(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMeals()
  }, [])

  const showToast = (msg, type = 'error') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSaveGoal = () => {
    const val = parseInt(goalInput)
    if (!val || val < 500 || val > 5000) {
      showToast('กรุณาใส่ค่าระหว่าง 500 - 5,000 kcal')
      return
    }
    setGoalCalories(val)
    setGoalCaloriesState(val)
    setShowGoalModal(false)
    showToast(`ตั้งเป้าหมาย ${val.toLocaleString()} kcal แล้ว!`, 'success')
  }

  const today = new Date().toISOString().split('T')[0]
  const todayMeals = meals.filter(m => m.createdAt?.startsWith(today))
  const totalCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0)
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

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-10 left-1/2 z-50 px-4 py-2.5 rounded-xl text-[12px] font-medium"
          style={{
            zIndex: 9999,
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            background: toast.type === 'success' ? '#E1F5EE' : '#FCEBEB',
            color: toast.type === 'success' ? '#085041' : '#A32D2D',
            border: `1px solid ${toast.type === 'success' ? '#9FE1CB' : '#F7C1C1'}`,
            animation: 'slideDown 0.3s ease'
          }}
        >
          {toast.type === 'success' ? '✓ ' : '⚠ '}{toast.msg}
        </div>
      )}

      {/* Goal Modal */}
      {showGoalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{
            zIndex: 100,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)"
           }}
        >
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs">
            <div className="text-[14px] font-semibold mb-1" style={{ color: "#0C447C" }}>
              ตั้งเป้าหมายแคลอรี่
            </div>
            <div className="text-[11px] font-light mb-4" style={{ color: "#8A97A8" }}>
              แนะนำ: 1,500–2,500 kcal/วัน
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="flex-1 border rounded-xl px-3 py-2 text-sm text-center font-medium"
                style={{ borderColor: "#B5D4F4", color: "#0C447C" }}
                min="500"
                max="5000"
              />
              <span className="text-sm font-light" style={{ color: "#8A97A8" }}>kcal</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[1500, 1800, 2000, 2200, 2500, 3000].map(v => (
                <button
                  key={v}
                  onClick={() => setGoalInput(v)}
                  className="py-1.5 rounded-lg text-[11px] font-medium border"
                  style={{
                    background: goalInput == v ? "#E6F1FB" : "#fff",
                    borderColor: goalInput == v ? "#378ADD" : "#E2E8F0",
                    color: goalInput == v ? "#0C447C" : "#8A97A8"
                  }}
                >
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowGoalModal(false)}
                className="flex-1 py-2.5 rounded-xl text-[13px] border"
                style={{ borderColor: "#E2E8F0", color: "#8A97A8" }}
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveGoal}
                className="flex-1 py-2.5 rounded-xl text-[13px] text-white font-medium"
                style={{ background: "#378ADD" }}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-3 pb-3">
        <div className="text-[10px] font-light" style={{ color: "#8A97A8" }}>
          {new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-[15px] font-semibold" style={{ color: "#0C447C" }}>ประวัติการกิน</div>
          <button
            onClick={() => setShowGoalModal(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium border"
            style={{ borderColor: "#B5D4F4", color: "#185FA5", background: "#E6F1FB" }}
          >
            เป้าหมาย {goalCalories.toLocaleString()} kcal (คลิกเพื่อแก้ไข)
          </button>
        </div>
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