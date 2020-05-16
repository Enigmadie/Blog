import * as querystring from 'querystring';

const host = '';
const prefix = 'api';

export interface Query {
  [key: string]: string | number | Array<string> | undefined;
}

export default {
  adminPath: (): string => [host, 'admin'].join('/'),
  adminApiPath: (): string => [host, prefix, 'admin'].join('/'),
  postsPath: (query: Query): string => [host, prefix, 'posts', `?${querystring.stringify(query)}`].join('/'),
};
