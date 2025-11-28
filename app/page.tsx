"use client";

import { useState, useRef } from "react";
import { SAMPLE_CARDS } from "@/lib/tarot/cards-sample";
import { createQuantumDeck, drawFromDeck } from "@/lib/tarot/quantumDeck";
import type { DeckCard } from "@/lib/tarot/types";
import { QuantumExplainer } from "@/components/QuantumExplainer";
import { splitName } from "@/lib/tarot/splitName";

export default function HomePage() {
  const [drawn, setDrawn] = useState<DeckCard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState<number>(1); // ⭐ 使用者想抽幾張
  // const [question, setQuestion] = useState(""); // ⭐ 使用者輸入的問題（表單用）
  const lastDrawTimeRef = useRef<number | null>(null);

  const handleDraw = async () => {
    const now = Date.now();
    if (lastDrawTimeRef.current && now - lastDrawTimeRef.current < 800) {
      return;
    }
    lastDrawTimeRef.current = now;

    // 再保險一次，確保是 1–31 的整數
    let safeCount = Number.isNaN(count) ? 1 : Math.trunc(count);
    if (safeCount < 1) safeCount = 1;
    if (safeCount > 31) safeCount = 31;

    setLoading(true);
    setDrawn(null);

    try {
      const deck = await createQuantumDeck(SAMPLE_CARDS, 0.4);
      const { drawn } = drawFromDeck(deck, safeCount);
      setDrawn(drawn);
    } finally {
      setLoading(false);
    }
  };

  const handleCountChange = (raw: string) => {
    // 允許使用者暫時清空欄位
    if (raw === "") {
      setCount(NaN);
      return;
    }

    const num = Number(raw);

    if (Number.isNaN(num)) {
      // 非數字 → 標記為 NaN，按鈕會 disable
      setCount(NaN);
      return;
    }

    // 轉成整數並限制在 1–31
    let next = Math.trunc(num); // 去掉小數
    if (next < 1) next = 1;
    if (next > 31) next = 31;

    setCount(next);
  };

  // 是否可以按按鈕：正在 loading 或 count 無效時不給按
  const isDrawDisabled = loading || Number.isNaN(count);

  return (
    <main className="w-full min-h-screen px-6 py-10 md:py-14">
      <div className="mx-auto max-w-xl space-y-8">
        {/* 抽牌區塊 */}
        <section>
          <h1 className="text-2xl font-bold mb-4">抽塔羅牌（量子亂數）</h1>
          {/* 使用者輸入問題（選填） */}
          <div className="mb-3">
            <label className="block text-sm text-gray-700 mb-1">
              你想問的問題（選填）
            </label>
            <input
              type="text"
              // value={question}
              // onChange={(e) => setQuestion(e.target.value)}
              placeholder="例：這份工作適不適合我？"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
            />
          </div>
          {/* 抽幾張的輸入欄位 */}
          <div className="mb-4 flex items-center gap-3">
            <label className="text-sm text-gray-700">想抽幾張？</label>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={31}
              step={1}
              value={Number.isNaN(count) ? "" : count}
              onChange={(e) => handleCountChange(e.target.value)}
              className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm text-right focus:outline-none focus:ring-2 focus:ring-black/60"
            />
            <span className="text-xs text-gray-500">最少 1 張，最多 31 張</span>
            {Number.isNaN(count) && (
              <span className="text-red-500 text-xs">請輸入 1～31 的整數</span>
            )}
          </div>
          <button
            onClick={handleDraw}
            className="cursor-pointer bg-black text-white px-5 py-2 rounded-full text-sm disabled:opacity-60"
            disabled={isDrawDisabled}
          >
            {loading ? "洗牌中..." : "開始抽牌"}
          </button>

          {/* ⭐ 抽牌前（drawn === null）→ 顯示 placeholder */}
          {drawn === null && (
            <div className="mt-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 justify-items-center">
              {Array.from({
                length: Number.isNaN(count) ? 1 : Math.max(1, count),
              }).map((_, i) => (
                <div
                  key={`placeholder-${i}`}
                  className="flex flex-col items-center w-full h-40"
                >
                  <div
                    // key={`placeholder-${i}`}
                    className="w-full h-40 border border-gray-300 rounded-lg flex items-center text-gray-400 text-sm"
                  ></div>
                  <span className="mt-1 text-sm text-gray-600">{i + 1}</span>
                </div>
              ))}
            </div>
          )}

          {/* ⭐ 抽牌後（drawn !== null && drawn.length > 0）→ 顯示卡片 */}
          {drawn !== null && drawn.length > 0 && (
            <div className="mt-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 justify-items-center">
              {drawn.map((dc, index) => {
                const { line1, line2 } = splitName(dc.card.nameEn);

                return (
                  <div
                    key={dc.card.id}
                    className="flex flex-col items-center text-center w-auto"
                  >
                    <img
                      src={`/card-set/${dc.originalIndex}.png`}
                      alt={dc.card.nameEn}
                      className={`w-full h-40 mx-auto mb-2 object-contain ${
                        dc.isReversed ? "rotate-180" : ""
                      }`}
                    />

                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {/* 中文名 */}
                        <p className="font-semibold text-base">
                          {dc.card.nameZh}
                        </p>

                        {/* 英文名（換成多行版本） */}
                        <p className="font-semibold text-xs leading-tight">
                          {line1}
                          {line2 && <br />}
                          {line2}
                        </p>

                        {/* 正逆位 */}
                        <p className="text-gray-500 text-sm">
                          {dc.isReversed ? "逆位" : "正位"}
                        </p>
                      </div>

                      {/* ⭐ 抽出的順序編號 */}
                      <span className="mt-1 text-sm text-gray-600">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 量子亂數說明區塊 */}
        <QuantumExplainer />
      </div>
    </main>
  );
}
