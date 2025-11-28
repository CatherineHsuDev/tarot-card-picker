// lib/tarot/splitName.ts

/**
 * 將英文牌名拆成兩行。
 * 規則：
 * - 1 詞：單行（Strength）
 * - 2 詞：單行（Justice, Temperance）
 * - 3 詞：前 2 詞成第一行、最後 1 詞成第二行
 */
export function splitName(nameEn: string) {
  const words = nameEn.trim().split(/\s+/);

  if (words.length <= 2) {
    // 1 或 2 個詞 → 不換行
    return { line1: nameEn, line2: "" };
  }

  // 3 個詞 → 前 2 詞一行、最後 1 詞一行
  return {
    line1: words.slice(0, 2).join(" "),
    line2: words[2],
  };
}
