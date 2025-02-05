import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Nav from "../../components/Nav/Nav";
import styles from "./TemplateDetail.module.scss";
import classNames from "classnames/bind";
import Tag from "../../components/Tag/Tag";

const cx = classNames.bind(styles);

function TemplateDetail({ data }) {
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
    <div className={cx("wrapper")}>
      <Nav direction={"horizontal"} />

      <div className={cx("row")}>
        <div
          className={cx("img", "col-xl-8", "col-lg-8", "col-md-8", "col-sm-12")}
        >
          <img src={data.img} alt={data.code} />
        </div>

        <div
          className={cx(
            "content",
            "col-xl-4",
            "col-lg-4",
            "col-md-4",
            "col-sm-12"
          )}
        >
          <h2 className={cx("title", "description-color")}>{snippet.title}</h2>

          <div className={cx("tag-container")}>
            <Tag type={data.type} />

            {data.template &&
              data.template.map((item, index) => (
                <Tag template={item} key={index} />
              ))}
          </div>

          <div className={cx("info")}>
            <div className={cx("info-content", "description-color")}>
              <img
                src="/img/detail/view-icon.png"
                alt="view-icon"
                className={cx("view-icon")}
              />
              {statistics.viewCount}
            </div>

            <div className={cx("info-content", "description-color")}>
              <img
                src="/img/detail/like-icon.png"
                alt="like-icon"
                className={cx("like-icon")}
              />
              {statistics.likeCount}
            </div>
          </div>

          <div className={cx("action")}>
            <button className={cx("download-btn", "w-100")}>DOWNLOAD</button>

            <div className={cx("link-btn")}>
              <button className={cx("share-btn")}>
                <Link to={""}>
                  <img src="/img/icon/share-icon.png" alt="share-icon" />
                  Share
                </Link>
              </button>

              <button className={cx("youtube-btn")}>
                <Link to={data.youtube} target="blank">
                  <img src="/img/icon/youtube-icon.png" alt="youtube-icon" />
                  Youtube
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetail;
