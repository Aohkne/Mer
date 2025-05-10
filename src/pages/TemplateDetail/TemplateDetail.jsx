import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  ThreadsShareButton,
  LinkedinShareButton,
} from "react-share";

import {
  FacebookIcon,
  EmailIcon,
  TelegramIcon,
  ThreadsIcon,
  LinkedinIcon,
} from "react-share";

import { Check, CircleAlert, Copy, Eye, ThumbsUp, X } from "lucide-react";

import Nav from "../../components/Nav/Nav";
import styles from "./TemplateDetail.module.scss";
import classNames from "classnames/bind";
import Tag from "../../components/Tag/Tag";
import Category from "../../layouts/Category/Category";

const cx = classNames.bind(styles);

function TemplateDetail({ data }) {
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  // OPEN SHARE POPUP
  const toggleSharePopup = (e) => {
    setIsSharePopupVisible(!isSharePopupVisible);
    e.stopPropagation();
  };

  // COPY LINK
  const copyLink = () => {
    navigator.clipboard.writeText(data.youtube);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={cx("wrapper")}>
      <Nav direction={"horizontal"} />

      <div className={cx("row")}>
        <div
          className={cx(
            "video-container",
            "col-xl-8",
            "col-lg-8",
            "col-md-7",
            "col-sm-12"
          )}
        >
          <iframe
            width="100%"
            height="100%"
            src={data.youtube.replace("watch?v=", "embed/")}
            title={data.code}
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            allowFullScreen
          ></iframe>
        </div>

        <div
          className={cx(
            "content",
            "col-xl-4",
            "col-lg-4",
            "col-md-5",
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
              <Eye size={32} />
              {statistics.viewCount}
            </div>

            <div className={cx("info-content", "description-color")}>
              <ThumbsUp size={25} />
              {statistics.likeCount}
            </div>
          </div>

          <div className={cx("action")}>
            <div className={cx("download-container")}>
              {statistics.likeCount >= 20 ? (
                <a
                  className={cx("download-btn", "w-100")}
                  href={encodeURI(data.download)}
                  download={data.code + ".zip"}
                >
                  DOWNLOAD
                </a>
              ) : (
                <>
                  <div className={cx("download-msg")}>
                    <CircleAlert />
                    This video is yet to reach 20 likes
                  </div>
                  <button className={cx("download-btn", "disabled", "w-100")}>
                    DOWNLOAD
                  </button>
                </>
              )}
            </div>

            <div className={cx("link-btn")}>
              <button className={cx("share-btn")} onClick={toggleSharePopup}>
                <Link to={""}>
                  <img src="/img/icon/share-icon.png" alt="share-icon" />
                  Share
                </Link>
              </button>

              {isSharePopupVisible && (
                <div
                  className={cx("share-popup-container")}
                  onClick={() => setIsSharePopupVisible(false)}
                >
                  <div
                    className={cx("share-popup")}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={cx("share-popup-title")}>
                      Share this template
                      <X onClick={() => setIsSharePopupVisible(false)} />
                    </div>

                    <div className={cx("share-content")}>
                      <div className={cx("share-popup-subtitle")}>
                        Share this link via
                      </div>
                      <div className={cx("share-icon-list")}>
                        <div className={cx("share-item")}>
                          <FacebookShareButton url={data.youtube}>
                            <FacebookIcon size={45} round={true} />
                          </FacebookShareButton>
                        </div>

                        <div className={cx("share-item")}>
                          <EmailShareButton url={data.youtube}>
                            <EmailIcon size={45} round={true} />
                          </EmailShareButton>
                        </div>

                        <div className={cx("share-item")}>
                          <TelegramShareButton url={data.youtube}>
                            <TelegramIcon size={45} round={true} />
                          </TelegramShareButton>
                        </div>

                        <div className={cx("share-item")}>
                          <ThreadsShareButton url={data.youtube}>
                            <ThreadsIcon size={45} round={true} />
                          </ThreadsShareButton>
                        </div>

                        <div className={cx("share-item")}>
                          <LinkedinShareButton url={data.youtube}>
                            <LinkedinIcon size={45} round={true} />
                          </LinkedinShareButton>
                        </div>
                      </div>
                    </div>

                    <div className={cx("share-copy")}>
                      <div className={cx("share-popup-subtitle")}>
                        Or copy link
                      </div>

                      <div className={cx("copy-link-container")}>
                        <input
                          type="text"
                          value={data.youtube}
                          readOnly
                          className={cx("copy-link-input")}
                        />
                        {copied ? (
                          <Check className={cx("copy-icon", "copied")} />
                        ) : (
                          <Copy
                            onClick={copyLink}
                            className={cx("copy-icon")}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

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

      <div className={cx("related_contaianer")}>
        <Category Category={"relate"} relateCate={data.type} />
      </div>
    </div>
  );
}

export default TemplateDetail;
