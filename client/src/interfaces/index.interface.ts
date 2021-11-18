export interface card {
  image?: string;
  title?: string;
  content?: string;
  icon?: string;
  price?: number;
  link?: string;
  aboveTitle?: string;
}

export interface gallery {
  size?: string;
  seeMoreLink?: string;
  seeMoreText?: string;
  cards: card[];
}
