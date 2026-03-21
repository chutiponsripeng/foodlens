const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function analyzeFoodImage(base64Image) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            },
            {
              type: 'text',
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
        }
      ],
      max_tokens: 500
    })
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error?.message || 'Groq API error')

  const text = data.choices[0].message.content
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}