export interface Categories {
  value: string;
  label: string;
}

export interface Post {
  _id: string;
  title: string;
  categories: Categories[];
  preview: string;
  content: string;
  image: string | Blob;
  created_at: string;
}


export interface Post2 {
  _id: string;
  title: string;
  categories: Categories[];
  preview: string;
  content: string;
  image: string | Blob;
  created_at: string;
}

export interface Authentication {
  login: string;
  password: string;
}


export interface Style {
  [key: string]: string;
}
