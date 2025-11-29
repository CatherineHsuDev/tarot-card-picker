"use client";

import { useState, useRef, useEffect } from "react";
import { SAMPLE_CARDS } from "@/lib/tarot/cards-sample";
import { createQuantumDeck, drawFromDeck } from "@/lib/tarot/quantumDeck";
import type { DeckCard } from "@/lib/tarot/types";
import { QuantumExplainer } from "@/components/QuantumExplainer";
import { splitName } from "@/lib/tarot/splitName";
import {
  Copy,
  Check,
  Minus,
  Plus,
  Loader2,
  HelpCircle,
  Hash,
  Tag,
  Shuffle,
  Trash2,
} from "lucide-react";

/** ⭐ 統一處理「1～31 的安全張數」 */
function normalizeCount(raw: number): number {
  if (Number.isNaN(raw)) return 1;
  let next = Math.trunc(raw);
  if (next < 1) next = 1;
  if (next > 31) next = 31;
  return next;
}

export default function HomePage() {
  const [drawn, setDrawn] = useState<DeckCard[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [count, setCount] = useState<number>(1); // ⭐ 使用者想抽幾張
  const [options, setOptions] = useState<string[]>([""]); // ⭐ dynamic options
  const [copySuccess, setCopySuccess] = useState(false);

  const lastDrawTimeRef = useRef<number | null>(null);

  // ⭐ 當 count 改變時，自動調整 options 長度
  useEffect(() => {
    if (Number.isNaN(count)) return;

    const safeCount = normalizeCount(count);

    setOptions((prev) => {
      const next = [...prev];

      // 延長到 safeCount
      while (next.length < safeCount) next.push("");

      // 縮短到 safeCount
      if (next.length > safeCount) next.length = safeCount;

      return next;
    });
  }, [count]);

  // ⭐ 處理 options 單欄位變更
  const handleOptionChange = (index: number, value: string) => {
    setOptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleDraw = async () => {
    const now = Date.now();
    if (lastDrawTimeRef.current && now - lastDrawTimeRef.current < 800) {
      return;
    }
    lastDrawTimeRef.current = now;

    // 統一用 normalizeCount
    const safeCount = normalizeCount(count);

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

    // 統一用 normalizeCount 做邊界控制
    setCount(normalizeCount(num));
  };

  const handlePlusChange = () => {
    setCount((prev) => normalizeCount(prev + 1));
  };

  const handleMinusChange = () => {
    setCount((prev) => normalizeCount(prev - 1));
  };

  const handleCopyResult = async () => {
    if (!drawn) return;

    const lines = [
      question ? `問題：${question}` : "",
      ...drawn.map((dc, index) => {
        const opt = options[index] || "無";
        return `${opt}：${dc.card.nameZh} ${dc.isReversed ? "逆位" : "正位"}`;
      }),
    ].join("\n");

    await navigator.clipboard.writeText(lines);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1500);
  };

  // 是否可以按按鈕：正在 loading 或 count 無效時不給按
  const isDrawDisabled = loading || Number.isNaN(count);

  // placeholder 要用的張數（至少 1 張）
  const placeholderCount = normalizeCount(count);

  return (
    <main className="w-full min-h-screen px-6 py-10 md:py-14">
      <div className="mx-auto max-w-xl space-y-8">
        {/* 抽牌區塊 */}
        <section>
          <h3 className="text-2xl font-bold">抽塔羅牌（量子亂數）</h3>
          <h6 className="text-xl font-bold mb-4">Tarot Draw (Quantum RNG)</h6>

          {/* 使用者輸入問題（選填） */}
          <div className="mb-3">
            <label className="flex text-sm text-gray-700 mb-1 items-center gap-1">
              <HelpCircle size={16} />
              你想問的問題（選填）/ Question (optional)
            </label>
            <div className="flex justify-between gap-5">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="例：這份工作適不適合我？ / e.g. Is this job right for me?"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/60"
              />

              {/* ⭐ 清除全部按鈕 */}
              {/* <button
                onClick={() => {
                  setQuestion("");
                  setCount(1);
                  setOptions([""]);
                  setDrawn(null);
                }}
                className="
                  px-3 py-2 rounded-md border border-gray-300 text-sm cursor-pointer
                  text-gray-700 
                  hover:bg-black hover:text-white 
                  transition-colors
                "
              >
                清除全部
              </button> */}
              <button
                type="button"
                onClick={() => {
                  setQuestion("");
                  setCount(1);
                  setOptions([""]);
                  setDrawn(null);
                }}
                className="
                  w-9 h-9 rounded-md border border-gray-300 flex items-center justify-center
                  text-gray-700 cursor-pointer
                  hover:bg-black hover:text-white 
                  transition-colors
                "
                aria-label="Reset all"
                title="Reset all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 抽幾張的輸入欄位 */}
          <div className="mb-4 flex items-center gap-3">
            <label className="text-sm text-gray-700">想抽幾張？</label>
            <input
              type="text"
              inputMode="numeric"
              min={1}
              max={31}
              step={1}
              value={Number.isNaN(count) ? "" : count}
              onChange={(e) => handleCountChange(e.target.value)}
              className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-black/60"
            />
            <button
              onClick={handleMinusChange}
              className="group w-8 h-8 border border-gray-300 rounded-md inline-flex items-center justify-center cursor-pointer
             hover:bg-black transition-colors"
            >
              <Minus
                size={16}
                className="text-gray-800 group-hover:text-white transition-colors"
              />
            </button>
            <button
              className="group w-8 h-8 border border-gray-300 rounded-md inline-flex items-center justify-center cursor-pointer
             hover:bg-black transition-colors"
            >
              <Plus
                size={16}
                onClick={handlePlusChange}
                className="text-gray-800 group-hover:text-white transition-colors "
              />
            </button>

            <span className="text-xs text-gray-500">最少 1 張，最多 31 張</span>
            {Number.isNaN(count) && (
              <span className="text-red-500 text-xs">請輸入 1～31 的整數</span>
            )}
          </div>

          {/* <button
            onClick={handleDraw}
            className="cursor-pointer bg-black text-white px-5 py-2 rounded-full text-sm disabled:opacity-60 cursor-pointer"
            disabled={isDrawDisabled}
          >
            {loading ? "洗牌中..." : "開始抽牌"}
          </button> */}
          <button
            type="button"
            onClick={handleDraw}
            className="bg-black text-white px-5 py-2 rounded-full text-sm disabled:opacity-60 cursor-pointer inline-flex items-center gap-2"
            disabled={isDrawDisabled}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Shuffling…</span>
              </>
            ) : (
              <>
                <Shuffle className="h-4 w-4" />
                <span>Draw cards</span>
              </>
            )}
          </button>

          {/* ⭐ 抽牌前（drawn === null）→ 顯示 placeholder */}
          {drawn === null && (
            <div className="mt-6 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-6 justify-items-center">
              {Array.from({ length: placeholderCount }).map((_, i) => (
                // <div
                //   key={`placeholder-${i}`}
                //   className="flex flex-col items-center w-full h-40"
                // >
                //   <div className="w-full h-40 border border-gray-300 rounded-lg flex items-center text-gray-400 text-sm" />
                //   <span className="mt-1 text-sm text-gray-600">{i + 1}</span>
                //   <input
                //     type="text"
                //     placeholder="選項含意"
                //     value={options[i] ?? ""}
                //     onChange={(e) => handleOptionChange(i, e.target.value)}
                //     className="w-full rounded-md border border-gray-300 text-sm text-center focus:outline-none focus:ring-2 focus:ring-black/60"
                //   />
                // </div>
                <div
                  key={`placeholder-${i}`}
                  className="flex flex-col items-center w-full h-40"
                >
                  <div className="w-full h-40 border border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-300 text-xs gap-1">
                    <span className="text-xl">🂠</span>
                    <span>Card #{i + 1}</span>
                  </div>
                  <span className="mt-1 text-xs text-gray-600">{i + 1}</span>

                  <div className="relative w-full mt-1">
                    <Tag className="w-3 h-3 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Label / 標籤"
                      value={options[i] ?? ""}
                      onChange={(e) => handleOptionChange(i, e.target.value)}
                      className="w-full rounded-md border border-gray-300 text-xs text-center pl-5 pr-2 py-1 focus:outline-none focus:ring-2 focus:ring-black/60"
                    />
                  </div>
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

                      {/* ⭐ 抽出的順序編號 ＋ 選項文字 */}
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-600">
                          {index + 1}
                        </span>
                        <span className="text-wrap text-sm text-gray-600">
                          {options[index] || "無"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 抽牌結果文字複製區 */}

        {drawn !== null && drawn.length > 0 && (
          <div className="relative mt-10 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            {/* Copy Button */}
            <button
              onClick={handleCopyResult}
              className="absolute top-3 right-3 p-2 border border-gray-300 rounded-md 
                 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              {copySuccess ? <Check size={16} /> : <Copy size={16} />}
            </button>

            {/* <h5 className="mb-2 font-medium text-gray-800">一鍵複製</h5> */}

            {question && (
              <p className="text-sm text-gray-600 mb-1">問題：{question}</p>
            )}

            {drawn.map((dc, index) => (
              <p key={dc.card.id} className="text-sm text-gray-600">
                {options[index] || "無"}：{dc.card.nameZh}{" "}
                {dc.isReversed ? "逆位" : "正位"}
              </p>
            ))}
          </div>
        )}

        {/* 量子亂數說明區塊 */}
        <QuantumExplainer />
      </div>
    </main>
  );
}
