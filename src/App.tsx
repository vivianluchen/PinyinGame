import React, { useState } from "react";
import Game from "./components/game/Game";

function App() {
  const [gameMode, setGameMode] = useState<"beginner" | "intermediate" | null>(null);

  const startGame = (mode: "beginner" | "intermediate") => {
    setGameMode(mode);
  };

  const backToMenu = () => {
    setGameMode(null);
  };

  if (gameMode) {
    return <Game mode={gameMode} onBack={backToMenu} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">拼音打字游戏</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div 
              onClick={() => startGame("beginner")}
              className="bg-blue-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">初级模式</h2>
              <p className="text-gray-600">适合初学者，简单汉字练习</p>
            </div>
            <div 
              onClick={() => startGame("intermediate")}
              className="bg-green-50 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">中级模式</h2>
              <p className="text-gray-600">进阶练习，常用词组</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
