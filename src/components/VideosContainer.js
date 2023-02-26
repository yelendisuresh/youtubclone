import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { YOUTUBE_API } from "../utils/constant";
import VideoCard from "./VideoCard";

const VideosContainer = () => {
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    try {
      const res = await fetch(YOUTUBE_API);
      const json = await res.json();
      console.log(json.items);
      setVideos(json.items);
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div className="flex flex-wrap">
      {videos.map((video) => {
        return (
          <Link to={`/watch?v=${video.id}`}>
            <VideoCard key={video.id} info={video} />{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default VideosContainer;
