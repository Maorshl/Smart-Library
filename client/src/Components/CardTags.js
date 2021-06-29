import { Chip } from "@material-ui/core";
import React from "react";

function CardTags({ tags }) {
  return (
    <div>
      {tags &&
        tags.map((tag) => {
          return <Chip label={tag} />;
        })}
    </div>
  );
}

export default CardTags;