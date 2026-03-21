# FoodLens 🥗📸

FoodLens คือเว็บแอปพลิเคชันที่ช่วยวิเคราะห์และประเมินข้อมูลโภชนาการจากภาพถ่ายอาหารของคุณอย่างรวดเร็ว ผ่านขุมพลังของ AI **Groq (Meta Llama 4 Scout)** เพื่อให้คุณสามารถติดตามปริมาณแคลอรี่ โปรตีน คาร์โบไฮเดรต และไขมันในแต่ละมื้อได้อย่างสะดวกสบาย พร้อมตั้งเป้าหมายแคลอรี่รายวันที่ 1,800 kcal (มีอัพเดตภายหลัง)

## ✨ ฟีเจอร์หลัก (Key Features)

- 📸 **สแกนและวิเคราะห์อาหาร**: ถ่ายรูปหรืออัปโหลดรูปภาพอาหารเพื่อวิเคราะห์โภชนาการได้ทันที
- 🧠 **แม่นยำและรวดเร็วด้วย AI**: ขับเคลื่อนด้วยโมเดล `meta-llama/llama-4-scout-17b-16e-instruct` ผ่าน API ของ Groq ประเมินแบบตอบกลับเป็น JSON ทันใจ (พร้อมเปอร์เซ็นต์ความมั่นใจ)
- 📊 **ข้อมูลโภชนาการแบบครบจบ**: แสดงค่า แคลอรี่รวม, โปรตีน, ไขมัน และคาร์โบไฮเดรต
- 👤 **ระบบผู้ใช้งานแบบ Local (Anonymous ID)**: แยกสถิติประวัติอาหาร (History) ของแต่ละคนบนเครื่องแต่ละเครื่อง ผ่านระบบ Local Storage (สแกนเครื่องใคร ประวัติเก็บเครื่องนั้น)
- 📖 **ประวัติสุขภาพ (History)**: เก็บประวัติมื้ออาหารของคุณบนฐานข้อมูล Firebase Firestore แบบแยกตามรหัสเครื่อง
- 📱 **Mobile-Friendly UI**: ออกแบบหน้าจอให้สวยงาม ใช้งานง่าย เข้ากันได้ดีที่สุดบนอุปกรณ์พกพา
- 🚀 **รองรับการ Deploy บน Firebase Hosting**: รองรับ Single Page Application (SPA) เป็นที่เรียบร้อย

## 🛠️ เทคโนโลยีและเครื่องมือที่ใช้ (Tech Stack)

- **Frontend Core**: React 18, Vite
- **Styling**: Tailwind CSS
- **AI Provider**: Groq API (`meta-llama/llama-4-scout-17b-16e-instruct`)
- **Backend / Database / Hosting**: Firebase (Firestore, Hosting)

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### 1. โคลนโปรเจกต์และติดตั้ง Dependencies
เปิดเทอร์มินัลในโฟลเดอร์โปรเจกต์แล้วรันคำสั่ง:
```bash
npm install
```

### 2. ตั้งค่า Environment Variables (ตัวแปรแวดล้อม)
สร้างไฟล์ `.env` ที่ root ของโปรเจกต์ และเพิ่ม API Key ของ Groq ลงไป:
```env
VITE_GROQ_API_KEY=นำ_API_KEY_จาก_GroqCloud_มาใส่ที่นี่
# หากมีตั้งค่า Firebase Config เพิ่มเติม (ถ้าไม่ได้กำหนดค่า Default) ให้ใส่ไว้ที่นี่
```
> **หมายเหตุ**: สามารถไปสร้าง Groq API Key ได้ฟรีที่ [GroqCloud Console](https://console.groq.com/)

### 3. รันโปรเจกต์ หรือ Deploy ระบบ
- **รันบนเครื่อง Local:**
  ```bash
  npm run dev
  ```
  หลังจากรันคำสั่ง ให้เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

- **กระบวนการ Deploy บน Firebase Hosting:**
  ```bash
  npm run build
  firebase deploy
  ```

## 📝 ภาพรวมการทำงานที่สำคัญ (Key Implementations)

- `src/services/gemini.js` - ถูกสลับเป็นคำสั่งในการยิงหา **Groq API** แทน (เพื่อความเร็วและรองรับโมเดล Llama Vision)
- `src/utils/userId.js` - ตัวสร้างและเรียกใช้งาน `foodlens_user_id` สุ่มแบบไม่ระบุตัวตน 
- `firebase.json` - ตั้งค่า `rewrites` เอาไว้เพื่อรองรับระบบ Route ของแแอปให้ดึงจาก `dist/index.html` 

## 🤝 การมีส่วนร่วมในการพัฒนา (Contributing)
หากใครพบเจอบั๊กหรือต้องการเพิ่มฟีเจอร์ใหม่ สามารถสร้าง Pull Request (PR) หรือเปิด Issue แจ้งเข้ามาได้เลยครับ
