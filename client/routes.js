import { stringify } from 'querystring';

const host = '';
const prefix = 'api';

export default {
  adminPath: () => [host, 'admin'].join('/'),
  adminApiPath: () => [host, prefix, 'admin'].join('/'),
  postsPath: (query) => [host, prefix, 'posts', `?${stringify(query)}`].join('/'),
};
