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

export interface restaurant {
  chefName: string;
  name: string;
  id?: string;
  _id?: string;
}

export interface chef {
  chefName: string;
  id?: string;
  _id?: string;
}

export interface dish {
  chefName: string;
  id?: string;
  _id?: string;
}
