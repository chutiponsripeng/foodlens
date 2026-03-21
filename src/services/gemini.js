const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${API_KEY}`

export async function analyzeFoodImage(base64Image) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `วิเคราะห์อาหารในรูปนี้ ตอบเป็น JSON เท่านั้น ไม่ต้องมีข้อความอื่น:
{
  "name": "ชื่ออาหารภาษาไทย",
  "calories": ตัวเลขแคลอรี่,
  "protein": ตัวเลขโปรตีนกรัม,
  "fat": ตัวเลขไขมันกรัม,
  "carbs": ตัวเลขคาร์บกรัม,
  "confidence": ตัวเลขความมั่นใจ 0-100,
  "category": "หมวดหมู่อาหาร"
}`
          }
        ]
      }]
    })
  })

  const data = await response.json()

  // ถ้า API error ให้ throw error ที่อ่านได้
  if (!response.ok) {
    throw new Error(data.error?.message || 'Gemini API error')
  }

  const text = data.candidates[0].content.parts[0].text
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}