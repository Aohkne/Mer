import React, { useEffect, useState } from "react";

import styles from "./YoutubeVideoInfo.module.scss";
import classNames from "classnames/bind";
import Card from "../../components/Card/Card";

const cx = classNames.bind(styles);

const YouTubeVideoInfo = ({ data, type }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const videoId = data.youtube.split("v=")[1].split("&")[0];

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          setVideoInfo(data.items[0]);
        } else {
          throw new Error("No video data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!videoInfo) return <p>No video information available.</p>;

  const { snippet, statistics } = videoInfo;

  return (
    <div>
      <Card
        data={data}
        title={snippet.title}
        type={type}
        view={statistics.viewCount}
        like={statistics.likeCount}
      />
    </div>
  );
};

export default YouTubeVideoInfo;
