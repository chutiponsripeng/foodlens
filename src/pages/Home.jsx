import { useState, useEffect } from "react"
import { categories, CategoryCard } from "../components/CategoryIcons"
import { db } from "../firebase/config"
import { getUserId } from '../utils/userId'
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore"


export default function Home({ onScan, loading }) {
  const [activeCategory, setActiveCategory] = useState(null)
  const [recentScans, setRecentScans] = useState([])

  // ดึงข้อมูลสแกนล่าสุดจาก Firestore
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const q = query(
          collection(db, 'meals'),
          where('userId', '==', getUserId()), //localstorage
          orderBy('createdAt', 'desc'),
          limit(3)
        )
        const snap = await getDocs(q)
        const data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setRecentScans(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchRecent()
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]
      onScan(base64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-3 pb-4">
        <div className="flex items-center gap-2 mt-1">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#378ADD" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="6.5" r="3" stroke="white" strokeWidth="1.4" />
              <path d="M4.5 13C4.5 11.3 6.1 10 8 10s3.5 1.3 3.5 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-base font-semibold leading-tight" style={{ color: "#0C447C" }}>FoodLens</div>
            <div className="text-[8px] font-light" style={{ color: "#8A97A8" }}>วิเคราะห์แคลอรี่ด้วย AI</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
        {/* Greeting */}
        <div>
          <div className="text-sm font-medium" style={{ color: "#0C447C" }}>สวัสดี!</div>
          <div className="text-[11px] font-light mt-0.5" style={{ color: "#8A97A8" }}>
            ถ่ายรูปอาหารเพื่อดูแคลอรี่ทันที
          </div>
        </div>

        {/* Upload Zone */}
        <label
          className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2 cursor-pointer"
          style={{ border: "1.5px dashed #85B7EB" }}
        >
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "#E6F1FB" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="5" width="18" height="14" rx="3" stroke="#378ADD" strokeWidth="1.5" />
              <circle cx="11" cy="12" r="3.2" stroke="#378ADD" strokeWidth="1.5" />
              <path d="M8 5L9.2 3h3.6L14 5" stroke="#378ADD" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-[13px] font-medium text-center" style={{ color: "#0C447C" }}>
            ถ่ายรูป หรือ เลือกจากคลัง
          </div>
          <div className="text-[10px] font-light text-center" style={{ color: "#8A97A8" }}>
            AI วิเคราะห์แคลอรี่อัตโนมัติ
          </div>
        </label>

        {/* Camera Button */}
        <label
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-[13px] font-medium cursor-pointer"
          style={{ background: loading ? "#85B7EB" : "#378ADD" }}
        >
          <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <rect x="1" y="3.5" width="13" height="9" rx="2" stroke="white" strokeWidth="1.3" />
            <circle cx="7.5" cy="8" r="2.2" stroke="white" strokeWidth="1.3" />
            <path d="M5 3.5L6 2h3l1 1.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {loading ? "กำลังวิเคราะห์..." : "เปิดกล้องถ่ายรูป"}
        </label>

        {/* Category Grid */}
        <div>
          <div className="text-[10px] font-medium mb-2" style={{ color: "#8A97A8", letterSpacing: "0.04em" }}>
            หมวดอาหาร — แตะเพื่อเลือก
          </div>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Recent Scans */}
        <div>
          <div className="text-[10px] font-medium mb-2" style={{ color: "#8A97A8", letterSpacing: "0.04em" }}>
            สแกนล่าสุด
          </div>
          {recentScans.length === 0 ? (
            <div className="text-center py-4">
              <div className="text-xs font-light" style={{ color: "#8A97A8" }}>ยังไม่มีประวัติการสแกน</div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentScans.map((item) => {
                const cat = categories.find((c) => c.id === item.categoryId) || categories[7]
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border flex items-center gap-3 px-3 py-2.5"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: cat?.iconBg || "#888780" }}
                    >
                      {cat?.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-[12px] font-medium" style={{ color: "#0C447C" }}>{item.name}</div>
                      <div className="text-[9px] font-light mt-0.5" style={{ color: "#8A97A8" }}>{cat?.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[13px] font-medium" style={{ color: "#378ADD" }}>{item.calories}</div>
                      <div className="text-[9px]" style={{ color: "#8A97A8" }}>kcal</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}