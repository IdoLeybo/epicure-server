export interface card {
  image?: string;
  title?: string;
  content?: string;
  icon?: icon;
  price?: string;
  link?: string;
  aboveTitle?: string;
}

export interface gallery {
  size?: string;
  seeMoreLink?: string;
  seeMoreText?: string;
  cards: card[];
}

export interface dbRestaurant {
  _id: string;
  name: string;
  image: string;
  chef: dbChef;
  valid: boolean;
}

export interface dbChef {
  _id: string;
  chefName: string;
  image: string;
  description: string;
  valid: boolean;
}

export interface dbDish {
  _id: string;
  name: string;
  image: string;
  description: string;
  typeIcon: { spicy: boolean; vegan: boolean; vegetarian: boolean };
  price: string;
  restaurant: dbRestaurant;
  valid: boolean;
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

export interface icon {
  spicy: boolean;
  vegan: boolean;
  vegetarian: boolean;
}
