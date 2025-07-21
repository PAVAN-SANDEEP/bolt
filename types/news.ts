export interface NewsItem {
  id: string;
  title: string;
  content: string;
  why: string;
  how: string;
  category: string;
  imageUrl?: string;
  actionUrl?: string;
  createdAt: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}