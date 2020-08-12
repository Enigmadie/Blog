export interface Categories {
  value?: string;
  label?: string;
  category? : string;
}

export interface Post {
  id: string;
  title: string;
  categories: Categories[];
  preview: string;
  content: string;
  image: string | Blob;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormik {
  id: string;
  title: string;
  categories: Categories[];
  preview: string;
  content: string;
  image: string | Blob;
}

export interface Authentication {
  login: string;
  password: string;
}

export interface Registration {
  login: string;
  password: string;
  avatar: string;
  avatarSmall: string;
}

export interface Profile {
  id: string;
  login: string;
  isAdmin: boolean;
  avatar: string;
  avatarSmall: string;
}

export interface Comment {
  id: string;
  content: string;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
}

export interface CommentFormik {
  content: string;
}

export interface Style {
  [key: string]: string;
}
