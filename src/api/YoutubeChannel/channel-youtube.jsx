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

import { useEffect, useState } from "react";

import styles from "./YoutubeChannelInfo.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function YoutubeChannelStats({ channelId }) {
  const [subscriberCount, setSubscriberCount] = useState("");
  const [viewCount, setViewCount] = useState("");

  useEffect(() => {
    const fetchYoutubeData = async () => {
      const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
      const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
          throw new Error("Channel not found");
        }

        const stats = data.items[0].statistics;

        setSubscriberCount((+stats.subscriberCount).toLocaleString("vi-VN"));
        setViewCount((+stats.viewCount).toLocaleString("vi-VN"));
      } catch (error) {
        console.error("Error fetching YouTube channel stats:", error);
      }
    };

    fetchYoutubeData();
  }, [channelId]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("subcriber", "description-color")}>
        <span className={cx("title-color-withbg")}>subscribers</span>
        {subscriberCount}
      </div>
      <div className={cx("view", "description-color")}>
        <span className={cx("title-color-withbg")}>views</span>
        {viewCount}
      </div>
    </div>
  );
}

export default YoutubeChannelStats;
