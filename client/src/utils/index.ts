/* eslint-disable no-param-reassign */

import i18n from 'i18next';
import { toast } from 'react-toastify';
import { formatDistanceToNow, format, differenceInDays } from 'date-fns';
import { Post, Categories } from 'interfaces';
import url from 'url';

export const selectErrorMessage = (e: any): void => {
  const key = e.response ? 'server' : 'network';
  toast.error(i18n.t(key));
};

export const getPage = (href: string): number => {
  const { query } = url.parse(href, true);
  return query.page ? Number(query.page) : 1;
};

export const getDistanceDate = (postDate: Date): string => {
  const differenceDate = differenceInDays(new Date(), postDate);

  return differenceDate > 3
    ? format(postDate, 'dd/MM/yyyy')
    : formatDistanceToNow(postDate, { includeSeconds: true, addSuffix: true });
};

export const getImageUrl = (imgName: string): string => `https://storage.googleapis.com/blog-enigma/${imgName}`;


export const mapCategories = (posts: Post[]): Post[] => posts.map((post: Post) => {
  post.categories = post.categories
    .map(({ category }: Categories) => ({ value: category, label: category }));
  return post;
});
