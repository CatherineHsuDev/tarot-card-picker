import type { TarotCard, DeckCard } from "./types";

// 呼叫 /api/quantum 拿量子亂數
async function fetchQuantumBytes(count: number): Promise<number[]> {
  const res = await fetch(`/api/quantum?length=${count}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await res.json();
  return data.bytes as number[];
}

/**
 * 用量子亂數建立牌堆（正逆 & 順序）
 */
export async function createQuantumDeck(
  baseCards: TarotCard[],
  reversedRatio = 0.4
): Promise<DeckCard[]> {
  const n = baseCards.length;

  // n 個亂數決定正逆 + (n-1) 個亂數洗牌
  const bytes = await fetchQuantumBytes(n + (n - 1));
  const orientBytes = bytes.slice(0, n);
  const shuffleBytes = bytes.slice(n);

  // 1. 決定正逆
  const deck: DeckCard[] = baseCards.map((card, index) => {
    const b = orientBytes[index];
    const threshold = Math.floor(256 * reversedRatio);
    return {
      card,
      isReversed: b < threshold,
      originalIndex: index,
    };
  });

  // 2. Fisher–Yates 洗牌（不使用 Math.random）
  for (let i = n - 1, k = 0; i > 0; i--, k++) {
    const r = shuffleBytes[k];
    const j = r % (i + 1);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

/**
 * 抽 count 張牌（不改正逆、不改順序）
 */
export function drawFromDeck(deck: DeckCard[], count: number) {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { drawn, remaining };
}
