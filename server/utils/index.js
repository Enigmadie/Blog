const mappedPosts = (posts) => posts.map((post) => {
  post.categories = post.categories.map((el) => ({ value: el, label: el }));
  return post;
});

module.exports = mappedPosts;
