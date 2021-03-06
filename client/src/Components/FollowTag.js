import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
import axios from "axios";

function FollowTag({ tag }) {
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    checkIfFollowed();
  }, []);

  const follow = async () => {
    const userName = Cookies.get("userName");
    await axios.post("http://app.smartlibrary.link:8080/post/follow", {
      userName,
      tag,
    });
    setFollowed(true);
  };
  const unFollow = async () => {
    const userName = Cookies.get("userName");
    await axios.patch("http://app.smartlibrary.link:8080/post/unFollow", {
      userName,
      tag,
    });
    setFollowed(false);
  };

  return (
    <div>
      {followed ? (
        <Button onClick={unFollow} variant="contained" color="primary">
          Unfollow
        </Button>
      ) : (
        <Button onClick={follow} variant="contained" color="secondary">
          Follow
        </Button>
      )}
    </div>
  );

  async function checkIfFollowed() {
    const userName = Cookies.get("userName");
    const { data } = await axios.get(
      `http://app.smartlibrary.link:8080/post/followers/${tag}`
    );
    if (data.includes(userName)) {
      setFollowed(true);
    }
  }
}

export default FollowTag;
