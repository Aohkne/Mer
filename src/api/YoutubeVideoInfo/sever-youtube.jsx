/**
 * Copyright 2024 Aohkne
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

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
