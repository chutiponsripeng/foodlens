import { useState } from "react";
import Home from "./pages/Home";
import Result from "./pages/Result";
import History from "./pages/History";
import BottomNav from "./components/BottomNav";
import { analyzeFoodImage } from "./services/gemini";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (base64Image) => {
    setLoading(true)
    try {
      const result = await analyzeFoodImage(base64Image)
      setSelectedFood({
        ...result,
        goalCalories: 1080,
      })
      setPage("result")
    } catch (e) {
      console.error("Error analyzing food:", e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-sm min-h-screen bg-gray-50 flex flex-col relative">
        <div className="flex-1 overflow-y-auto pb-16">
          {page === "home" && <Home onScan={handleScan} loading={loading} onNavigate={setPage} />}
          {page === "result" && <Result food={selectedFood} onNavigate={setPage} />}
          {page === "history" && <History onNavigate={setPage} />}
        </div>
        <BottomNav current={page} onNavigate={setPage} />
      </div>
    </div>
  );
}