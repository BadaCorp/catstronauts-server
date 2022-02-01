export interface Author {
  id: string;
  name: string;
  photo: string;
}

export interface Module {
  id: string;
  title: string;
  trackId: string;
  authorId: string;
  topic: string;
  length: number;
  content: string;
  videoUrl: string;
}

export interface Track {
  id: string;
  title: string;
  thumbnail: string;
  length: number;
  modulesCount: number;
  description: String;
  numberOfViews: number;
  modules: string[];
  authorId: string;
  topic: string;
  createAt: string;
}

export interface Root {}
