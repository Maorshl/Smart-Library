import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Search from "./Search";
import ScrollUpButton from "react-scroll-up-button";
import NavigationIcon from "@material-ui/icons/Navigation";
import useStyles from "../Style/index";

function PostsDisplay() {
  const postsDiv = useRef();
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [morePosts, setMorePosts] = useState(true);
  const [latestPostTime, setLatestPostTime] = useState(undefined);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    getData(true);
  }, [pageNum]);

  const search = () => {
    //* If no data to search=> return
    if ((!searchFilter && !searchText) || (searchText && !searchFilter)) return;
    if (!searchText && searchFilter) {
      setSearchFilter("");
      setShowRefresh(false);
    }
    //* Every time that clicked on search,
    //* page num will reset to prevent from incorrect post time to be part of a query.
    //* After search the => reset the posts array.
    setPosts([]);
    setPageNum(1);
    getData();
  };

  const getData = async scrolled => {
    setLoading(true);
    const { data } = await axios.get(
      `http://app.smartlibrary.link:8080/post/getPosts?pageNum=${pageNum}&latestPost=${latestPostTime}&searchFilter=${searchFilter}&searchText=${searchText}`
    );
    if (data === "No more posts") {
      //* Preventing from posts disappear when search and scrolling down.
      if (searchText && !scrolled) {
        setPosts([]);
      }
      setLoading(false);
      setMorePosts(false);
      return;
    }
    //* The time is the last object in the array, after i received him i delete it.
    setLatestPostTime(data[data.length - 1]);
    data.splice(data.length - 1, 1);
    if (pageNum === 1) {
      setLoading(false);
      return setPosts(data);
    }
    setPosts([...posts, ...data]);
    setLoading(false);
  };

  //* Every time the user scrolled until the bottom of the div
  //* it triggers this function and he ask for more posts.

  window.onscroll = () => {
    if (postsDiv.current.getBoundingClientRect().bottom <= window.innerHeight) {
      setPageNum(prevPageNum => prevPageNum + 1);
    }
  };

  return (
    <>
      <div className={classes.rootPostDisplay}>
        <ScrollUpButton
          ContainerClassName="AnyClassForContainer"
          TransitionClassName="AnyClassForTransition"
        >
          <NavigationIcon />
        </ScrollUpButton>
        <Typography variant="h2" color="primary" className={classes.headers}>
          Feed
        </Typography>
        <Search
          className="search"
          setSearchFilter={setSearchFilter}
          setSearchText={setSearchText}
          searchFilter={searchFilter}
          search={search}
          searchText={searchText}
          showRefresh={showRefresh}
          setShowRefresh={setShowRefresh}
        />
        <div className={classes.postsPostDisplay} ref={postsDiv}>
          {posts.map((post, i) => {
            return (
              <div>
                <PostCard post={post} key={i} />
              </div>
            );
          })}
          {loading && (
            <div className={classes.spinnerPostDisplay}>
              <CircularProgress color="secondary" />
            </div>
          )}
          {!morePosts && (
            <Typography
              variant="h6"
              color="primary"
              className={classes.noMorePosts}
            >
              No more posts to show! come back later :)
            </Typography>
          )}
        </div>
        <br />
      </div>
    </>
  );
}

export default PostsDisplay;
