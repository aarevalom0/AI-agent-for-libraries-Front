export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string; 
  likes?: number;
  dislikes?: number;
}
