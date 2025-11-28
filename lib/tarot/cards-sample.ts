import type { TarotCard } from "./types";

// 全 78 張塔羅牌，依照 0–77 的順序排列
// 陣列索引 0 對應 public/card-set/0.png，以此類推
export const TAROT_CARDS: TarotCard[] = [
  // 0–21 大阿爾卡那（Major Arcana）
  { id: "major-00", nameEn: "The Fool", nameZh: "愚者" }, // 0
  { id: "major-01", nameEn: "The Magician", nameZh: "魔術師" }, // 1
  { id: "major-02", nameEn: "The High Priestess", nameZh: "女祭司" }, // 2
  { id: "major-03", nameEn: "The Empress", nameZh: "女皇" }, // 3
  { id: "major-04", nameEn: "The Emperor", nameZh: "皇帝" }, // 4
  { id: "major-05", nameEn: "The Hierophant", nameZh: "教皇" }, // 5
  { id: "major-06", nameEn: "The Lovers", nameZh: "戀人" }, // 6
  { id: "major-07", nameEn: "The Chariot", nameZh: "戰車" }, // 7
  { id: "major-08", nameEn: "Strength", nameZh: "力量" }, // 8
  { id: "major-09", nameEn: "The Hermit", nameZh: "隱者" }, // 9
  { id: "major-10", nameEn: "Wheel of Fortune", nameZh: "命運之輪" }, // 10
  { id: "major-11", nameEn: "Justice", nameZh: "正義" }, // 11
  { id: "major-12", nameEn: "The Hanged Man", nameZh: "吊人" }, // 12
  { id: "major-13", nameEn: "Death", nameZh: "死神" }, // 13
  { id: "major-14", nameEn: "Temperance", nameZh: "節制" }, // 14
  { id: "major-15", nameEn: "The Devil", nameZh: "惡魔" }, // 15
  { id: "major-16", nameEn: "The Tower", nameZh: "高塔" }, // 16
  { id: "major-17", nameEn: "The Star", nameZh: "星星" }, // 17
  { id: "major-18", nameEn: "The Moon", nameZh: "月亮" }, // 18
  { id: "major-19", nameEn: "The Sun", nameZh: "太陽" }, // 19
  { id: "major-20", nameEn: "Judgement", nameZh: "審判" }, // 20
  { id: "major-21", nameEn: "The World", nameZh: "世界" }, // 21

  // 22–35 權杖（Wands）
  { id: "wands-ace", nameEn: "Ace of Wands", nameZh: "權杖王牌" }, // 22
  { id: "wands-02", nameEn: "Two of Wands", nameZh: "權杖二" }, // 23
  { id: "wands-03", nameEn: "Three of Wands", nameZh: "權杖三" }, // 24
  { id: "wands-04", nameEn: "Four of Wands", nameZh: "權杖四" }, // 25
  { id: "wands-05", nameEn: "Five of Wands", nameZh: "權杖五" }, // 26
  { id: "wands-06", nameEn: "Six of Wands", nameZh: "權杖六" }, // 27
  { id: "wands-07", nameEn: "Seven of Wands", nameZh: "權杖七" }, // 28
  { id: "wands-08", nameEn: "Eight of Wands", nameZh: "權杖八" }, // 29
  { id: "wands-09", nameEn: "Nine of Wands", nameZh: "權杖九" }, // 30
  { id: "wands-10", nameEn: "Ten of Wands", nameZh: "權杖十" }, // 31
  { id: "wands-page", nameEn: "Page of Wands", nameZh: "權杖侍者" }, // 32
  { id: "wands-knight", nameEn: "Knight of Wands", nameZh: "權杖騎士" }, // 33
  { id: "wands-queen", nameEn: "Queen of Wands", nameZh: "權杖皇后" }, // 34
  { id: "wands-king", nameEn: "King of Wands", nameZh: "權杖國王" }, // 35

  // 36–49 聖杯（Cups）
  { id: "cups-ace", nameEn: "Ace of Cups", nameZh: "聖杯王牌" }, // 36
  { id: "cups-02", nameEn: "Two of Cups", nameZh: "聖杯二" }, // 37
  { id: "cups-03", nameEn: "Three of Cups", nameZh: "聖杯三" }, // 38
  { id: "cups-04", nameEn: "Four of Cups", nameZh: "聖杯四" }, // 39
  { id: "cups-05", nameEn: "Five of Cups", nameZh: "聖杯五" }, // 40
  { id: "cups-06", nameEn: "Six of Cups", nameZh: "聖杯六" }, // 41
  { id: "cups-07", nameEn: "Seven of Cups", nameZh: "聖杯七" }, // 42
  { id: "cups-08", nameEn: "Eight of Cups", nameZh: "聖杯八" }, // 43
  { id: "cups-09", nameEn: "Nine of Cups", nameZh: "聖杯九" }, // 44
  { id: "cups-10", nameEn: "Ten of Cups", nameZh: "聖杯十" }, // 45
  { id: "cups-page", nameEn: "Page of Cups", nameZh: "聖杯侍者" }, // 46
  { id: "cups-knight", nameEn: "Knight of Cups", nameZh: "聖杯騎士" }, // 47
  { id: "cups-queen", nameEn: "Queen of Cups", nameZh: "聖杯皇后" }, // 48
  { id: "cups-king", nameEn: "King of Cups", nameZh: "聖杯國王" }, // 49


  // 50-63 寶劍（Swords）
  { id: "swords-ace", nameEn: "Ace of Swords", nameZh: "寶劍王牌" }, // 50
  { id: "swords-02", nameEn: "Two of Swords", nameZh: "寶劍二" }, // 51
  { id: "swords-03", nameEn: "Three of Swords", nameZh: "寶劍三" }, // 52
  { id: "swords-04", nameEn: "Four of Swords", nameZh: "寶劍四" }, // 53
  { id: "swords-05", nameEn: "Five of Swords", nameZh: "寶劍五" }, // 54
  { id: "swords-06", nameEn: "Six of Swords", nameZh: "寶劍六" }, // 55
  { id: "swords-07", nameEn: "Seven of Swords", nameZh: "寶劍七" }, // 56
  { id: "swords-08", nameEn: "Eight of Swords", nameZh: "寶劍八" }, // 57
  { id: "swords-09", nameEn: "Nine of Swords", nameZh: "寶劍九" }, // 58
  { id: "swords-10", nameEn: "Ten of Swords", nameZh: "寶劍十" }, // 59
  { id: "swords-page", nameEn: "Page of Swords", nameZh: "寶劍侍者" }, // 60
  { id: "swords-knight", nameEn: "Knight of Swords", nameZh: "寶劍騎士" }, // 61
  { id: "swords-queen", nameEn: "Queen of Swords", nameZh: "寶劍皇后" }, // 62
  { id: "swords-king", nameEn: "King of Swords", nameZh: "寶劍國王" }, // 63

    // 64-77 錢幣（Pentacles） 
  { id: "pentacles-ace", nameEn: "Ace of Pentacles", nameZh: "錢幣王牌" }, // 64
  { id: "pentacles-02", nameEn: "Two of Pentacles", nameZh: "錢幣二" }, // 65
  { id: "pentacles-03", nameEn: "Three of Pentacles", nameZh: "錢幣三" }, // 66
  { id: "pentacles-04", nameEn: "Four of Pentacles", nameZh: "錢幣四" }, // 67
  { id: "pentacles-05", nameEn: "Five of Pentacles", nameZh: "錢幣五" }, // 68
  { id: "pentacles-06", nameEn: "Six of Pentacles", nameZh: "錢幣六" }, // 69
  { id: "pentacles-07", nameEn: "Seven of Pentacles", nameZh: "錢幣七" }, // 70
  { id: "pentacles-08", nameEn: "Eight of Pentacles", nameZh: "錢幣八" }, // 71
  { id: "pentacles-09", nameEn: "Nine of Pentacles", nameZh: "錢幣九" }, // 72
  { id: "pentacles-10", nameEn: "Ten of Pentacles", nameZh: "錢幣十" }, // 73
  { id: "pentacles-page", nameEn: "Page of Pentacles", nameZh: "錢幣侍者" }, // 74
  { id: "pentacles-knight", nameEn: "Knight of Pentacles", nameZh: "錢幣騎士" }, // 75
  { id: "pentacles-queen", nameEn: "Queen of Pentacles", nameZh: "錢幣皇后" }, // 76
  { id: "pentacles-king", nameEn: "King of Pentacles", nameZh: "錢幣國王" }, // 77

];

// 為了不改你既有的 import，保留 SAMPLE_CARDS 這個名稱
export const SAMPLE_CARDS = TAROT_CARDS;
