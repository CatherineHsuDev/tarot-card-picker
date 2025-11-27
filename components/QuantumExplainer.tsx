// components/QuantumExplainer.tsx
"use client";

type QuantumExplainerProps = {
  /** 放在不同頁面時額外加的 className（選填） */
  className?: string;
  /** 簡略版（用在 footer、空間較小的地方） */
  compact?: boolean;
};



import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function QuantumExplainer({ compact = false, className = "" }) {
  // 合併 className（不用 clsx）
  const mergedClass = ["mt-12 border-t pt-8", className]
    .filter(Boolean)
    .join(" ");

  const [expanded, setExpanded] = useState(false);

  return (
    <section className={mergedClass}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 mb-2">
        About the randomness
      </p>

      <h2 className="text-lg md:text-xl font-semibold mb-3">
        為什麼這個塔羅 App 要用「量子亂數」？
      </h2>

      {/* 第一段：所有尺寸都顯示 */}
      <p className="text-sm text-gray-700 mb-3">
        一般電腦常用的隨機函式（例如 <code>Math.random()</code>
        ）其實是「用公式算出來的假亂數」。這個 App
        使用的亂數，來自澳洲國立大學（ANU）的量子亂數服務，是實驗設備直接「量到」的物理現象，而不是演算法算出來的。
      </p>

      {/* ⭐ 小螢幕（折疊） md:hidden */}
      {!compact && (
        <>
          <div className="md:hidden">
            {!expanded ? (
              <button
                onClick={() => setExpanded(true)}
                className="flex items-center text-sm text-blue-700 hover:text-gray-700"
              >
                看更多
                <ChevronDown size={16} />
              </button>
            ) : (
              <>
                {/* 展開內容（手機單欄） */}
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                      什麼是量子亂數？
                    </h3>
                    <p className="text-sm text-gray-700">
                      在量子世界裡，即使在「看看起來什麼都沒有」的真空中，能量也會微微抖動。ANU
                      的實驗設備會觀測這種不可預測的抖動，並把它轉換成數字，這就是量子亂數。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                      和一般亂數有什麼不同？
                    </h3>
                    <p className="text-sm text-gray-700">
                      一般亂數是「照著公式算」，長期看起來像亂的；量子亂數是從實際物理測量來的，無法預測、也無法用同一套公式重現。
                      在這個 App 裡，牌的順序與正逆位，都是由這種亂數決定。
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                      如果量子服務連不上怎麼辦？
                    </h3>
                    <p className="text-sm text-gray-700">
                      當 ANU
                      服務暫時無法使用時，系統會自動改用瀏覽器內建的密碼等級亂數{" "}
                      <code>crypto.getRandomValues</code>{" "}
                      作為備援，確保抽牌流程不中斷，同時維持高品質的隨機性。
                    </p>
                  </div>
                </div>

                {/* 收起按鈕 */}
                <button
                  onClick={() => setExpanded(false)}
                  className="flex items-center mt-4 text-sm text-blue-700 hover:text-gray-700"
                >
                  收起
                  <ChevronUp size={16} />
                </button>
              </>
            )}
          </div>

          {/* ⭐ 桌機（md 以上） */}
          <div className="hidden md:grid mt-4 gap-4 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                什麼是量子亂數？
              </h3>
              <p className="text-sm text-gray-700">
                在量子世界裡，即使在「看起來什麼都沒有」的真空中，能量也會微微抖動。ANU
                的實驗設備會觀測這種不可預測的抖動，並把它轉換成數字，這就是量子亂數。
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                和一般亂數有什麼不同？
              </h3>
              <p className="text-sm text-gray-700">
                一般亂數是「照著公式算」，長期看起來像亂的；量子亂數是從實際物理測量來的，無法預測、也無法用同一套公式重現。
                在這個 App 裡，牌的順序與正逆位，都是由這種亂數決定。
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1.5">
                如果量子服務連不上怎麼辦？
              </h3>
              <p className="text-sm text-gray-700">
                當 ANU
                服務暫時無法使用時，系統會自動改用瀏覽器內建的密碼等級亂數{" "}
                <code>crypto.getRandomValues</code>{" "}
                作為備援，確保抽牌流程不中斷，同時維持高品質的隨機性。
              </p>
            </div>
          </div>
        </>
      )}

      {/* ⭐ 隨機來源（所有尺寸都顯示） */}
      <p className="mt-4 text-xs text-gray-500 leading-relaxed">
        隨機來源：{" "}
        <a
          href="https://qrng.anu.edu.au"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-gray-700"
        >
          ANU Quantum Random Numbers
        </a>{" "}
        （澳洲國立大學量子光學實驗室提供）。本 App 不使用{" "}
        <code>Math.random()</code> 進行洗牌與正逆位決定。
      </p>
    </section>
  );
}
