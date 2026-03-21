# FoodLens — React + TailwindCSS

แอปวิเคราะห์แคลอรี่อาหารไทยด้วย AI

## โครงสร้างไฟล์

```
src/
├── App.jsx                    # Root component + routing state
├── main.jsx                   # Entry point
├── index.css                  # Tailwind + Google Fonts
├── components/
│   ├── BottomNav.jsx          # Bottom navigation bar
│   └── CategoryIcons.jsx      # SVG icons + color system ทุกหมวดอาหาร
└── pages/
    ├── Home.jsx               # หน้าสแกน + category grid
    ├── Result.jsx             # หน้าผลลัพธ์ + macros
    └── History.jsx            # หน้าประวัติ + daily summary
```

## การติดตั้ง

```bash
npm install
npm run dev
```

## การ integrate กับ API จริง

### Home.jsx
แทนที่ `onScan` handler ด้วย:
```js
const handleScan = async (imageFile) => {
  const result = await callGeminiVision(imageFile);
  setSelectedFood(result);
  navigate("result");
};
```

### Result.jsx
รับ `food` prop จาก API response:
```js
{
  name: "ข้าวมันไก่",
  category: "ไก่/เนื้อ + ข้าว",
  confidence: 94,
  calories: 612,
  goalCalories: 1800,
  protein: 42,
  fat: 18,
  carbs: 78,
}
```

### History.jsx
เชื่อม Firebase Firestore:
```js
const meals = await getDocs(collection(db, "meals"));
```

## สีหมวดอาหาร (Color System)

| หมวด       | สี       | Hex iconBg  |
|------------|----------|-------------|
| ข้าว       | Amber    | `#EF9F27`   |
| ไก่/เนื้อ  | Coral    | `#D85A30`   |
| เส้น       | Purple   | `#7F77DD`   |
| ผัก        | Green    | `#639922`   |
| แกง        | Teal     | `#1D9E75`   |
| ขนม        | Pink     | `#D4537E`   |
| เครื่องดื่ม | Blue     | `#378ADD`   |
| อื่นๆ      | Gray     | `#888780`   |
