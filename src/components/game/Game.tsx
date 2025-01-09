import React, { useState, useEffect } from "react";

interface GameProps {
  mode: "beginner" | "intermediate";
  onBack: () => void;
}

const Game: React.FC<GameProps> = ({ mode, onBack }) => {
  const [currentChar, setCurrentChar] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [showPinyin, setShowPinyin] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  // 汉字库
  const beginnerChars = [
    { char: "我", pinyin: "wo" },
    { char: "你", pinyin: "ni" },
    { char: "好", pinyin: "hao" },
    { char: "爱", pinyin: "ai" },
    { char: "妈", pinyin: "ma" },
    { char: "爸", pinyin: "ba" },
    { char: "天", pinyin: "tian" },
    { char: "地", pinyin: "di" },
    { char: "人", pinyin: "ren" },
    { char: "大", pinyin: "da" },
  ];

  const intermediateChars = [
    { char: "学习", pinyin: "xuexi" },
    { char: "快乐", pinyin: "kuaile" },
    { char: "朋友", pinyin: "pengyou" },
    { char: "家庭", pinyin: "jiating" },
    { char: "生活", pinyin: "shenghuo" },
  ];

  const getNextChar = () => {
    const chars = mode === "beginner" ? beginnerChars : intermediateChars;
    const randomIndex = Math.floor(Math.random() * chars.length);
    setCurrentChar(chars[randomIndex].char);
    setPinyin(chars[randomIndex].pinyin);
    setShowPinyin(false);
    setFeedback(null);
  };

  useEffect(() => {
    getNextChar();
  }, [mode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setUserInput(input);

    if (input === pinyin) {
      setFeedback("correct");
      setScore((prev) => prev + 10);
      // 播放正确音效
      new Audio("/sounds/correct.mp3").play().catch(() => {});
      
      setTimeout(() => {
        setUserInput("");
        getNextChar();
      }, 500);
    } else if (input.length >= pinyin.length) {
      setFeedback("incorrect");
      // 播放错误音效
      new Audio("/sounds/incorrect.mp3").play().catch(() => {});
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between mb-6">
          <div className="text-xl font-bold text-blue-600">得分: {score}</div>
          <div className="text-xl font-bold text-red-600">
            时间: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-4">{currentChar}</div>
          <div 
            className="text-gray-500 mb-4 cursor-pointer hover:text-blue-500"
            onClick={() => setShowPinyin(true)}
          >
            {showPinyin ? pinyin : "点击显示拼音提示"}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={handleInput}
            className={`w-64 px-4 py-2 text-xl border-2 rounded-lg focus:outline-none transition-colors ${
              feedback === "correct"
                ? "border-green-500 bg-green-50"
                : feedback === "incorrect"
                ? "border-red-500 bg-red-50"
                : "border-blue-300"
            }`}
            placeholder="输入拼音..."
            autoFocus
          />
          {feedback && (
            <div
              className={`mt-2 font-bold ${
                feedback === "correct" ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback === "correct" ? "正确!" : "不正确，请重试"}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            返回
          </button>
          <button
            onClick={getNextChar}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            跳过
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
