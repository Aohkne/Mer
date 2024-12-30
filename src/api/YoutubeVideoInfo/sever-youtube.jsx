import Tag from "../../components/Tag/Tag";

import React, { useEffect, useState } from "react";

import styles from "./YoutubeVideoInfo.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const YouTubeVideoInfo = ({ type, videoId }) => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className={cx("info-wrapper")}>
      <div className={cx("info-title")}>{snippet.title}</div>

      <Tag type={type} />

      <div
        className={cx("info-description", "d-flex", "justify-content-between")}
      >
        <div className={cx("info-content")}>
          <img
            src="/img/detail/view-icon.png"
            alt="view-icon"
            className={cx("view-icon")}
          />
          {statistics.viewCount}
        </div>

        <div className={cx("info-content")}>
          <img
            src="/img/detail/like-icon.png"
            alt="like-icon"
            className={cx("like-icon")}
          />
          {statistics.likeCount}
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoInfo;
