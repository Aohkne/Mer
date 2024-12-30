import { Link } from "react-router-dom";

import YouTubeVideoInfo from "../../api/YoutubeVideoInfo/sever-youtube";

import styles from "./Card.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Card({ data }) {
  return (
    <Link to={`/template/${data.code}`}>
      <div className={cx("card-wrapper")}>
        <img
          src={data.img}
          alt="card-img"
          className={cx("w-100", "card-img")}
        />

        <div className={cx("content")}>
          <YouTubeVideoInfo
            type={data.type}
            videoId={data.youtube.split("v=")[1].split("&")[0]}
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
