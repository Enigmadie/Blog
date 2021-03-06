import * as querystring from 'querystring';

declare const FRONT_ENV: string;

const isProduction = FRONT_ENV === 'production';
const isDevelopment = !isProduction;

const host = 'https://server-blog.godos.ru';
  // ? 'http://localhost:5000'
  // : 'https://server-blog.godos.ru';

const prefix = 'api';

export interface Query {
  [key: string]: string | number | Array<string> | undefined;
}

export default {
  adminApiPath: (): string => [host, prefix, 'admin'].join('/'),
  postsApiPath: (query: Query): string => [host, prefix, 'posts', `?${querystring.stringify(query)}`].join('/'),
  commentsApiPath: (query: Query): string => [host, prefix, 'comments', `?${querystring.stringify(query)}`].join('/'),
  profileApiPath: (query: Query): string => [host, prefix, 'profile', `?${querystring.stringify(query)}`].join('/'),

  registryPath: (): string => [host, 'registry'].join('/'),
  changePasswordPath: (): string => [host, 'changepassword'].join('/'),
  authPath: (): string => [host, 'auth'].join('/'),
  postPath: (id = ''): string => [host, 'post', id].join('/'),
  commentPath: (id = ''): string => [host, 'comment', id].join('/'),
};
