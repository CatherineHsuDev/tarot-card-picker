export type TarotCard = {
  id: string;
  nameEn: string;
  nameZh: string;
};

export type DeckCard = {
  card: TarotCard;
  isReversed: boolean;
  originalIndex: number;
};
