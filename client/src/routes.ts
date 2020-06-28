import * as querystring from 'querystring';

const isProduction = process.env.FRONT_ENV === 'production';
const isDevelopment = !isProduction;

const host = isDevelopment
  ? 'http://localhost:5000'
  : 'http://0.0.0.0:5000';

const prefix = 'api';

export interface Query {
  [key: string]: string | number | Array<string> | undefined;
}

export default {
  adminPath: (): string => [host, 'admin'].join('/'),
  adminApiPath: (): string => [host, prefix, 'admin'].join('/'),
  postsPath: (query: Query): string => [host, prefix, 'posts', `?${querystring.stringify(query)}`].join('/'),
  addPostPath: (): string => [host, 'posts', 'new'].join('/'),
  postPath: (id: string): string => [host, 'post', id].join('/'),
};
