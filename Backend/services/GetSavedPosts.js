const Post = require("../models/Post");

async function GetSavedPosts(req, res) {
  let { userName, searchFilter, searchText } = req.query;

  const text = new RegExp(searchText, "i");
  searchFilter ? searchFilter : (searchFilter = "title");

  const usersSavedPosts = await Post.find({
    likes: { $in: [userName] },
    $and: [{ [searchFilter]: text }],
  });
  res.send(usersSavedPosts);
}

module.exports = GetSavedPosts;
