import React, { useEffect } from "react";
import CardTags from "./CardTags";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import CardAct from "./CardAct";
import useStyles from "../Style";
import LinkIcon from "@material-ui/icons/Link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PostCard({ post }) {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const classes = useStyles();

  return (
    <Card className={classes.rootPostCard} data-aos="fade-left">
      <CardHeader
        className="card-header"
        avatar={
          <Avatar aria-label="recipe" className={classes.avatarPostCard}>
            {post.author}
          </Avatar>
        }
        action={
          <IconButton aria-label="share" href={`${post.url}`} target="_blank">
            <LinkIcon />
          </IconButton>
        }
        title={post.title}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" component="p" data-testId="postHead">
          {post.head && post.head}
        </Typography>
        <Typography
          variant="body3"
          color="textSecondary"
          component="p"
          data-testId="postDescription"
        >
          {post.description}
        </Typography>
      </CardContent>
      <CardTags tags={post.tags} />
      <CardAct post={post} />
    </Card>
  );
}
