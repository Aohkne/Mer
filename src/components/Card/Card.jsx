import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
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
          <div className={cx("card-title")}>{data.title}</div>
          <div
            className={cx(
              "card-description",
              "d-flex",
              "justify-content-between"
            )}
          >
            <Tag type={data.type} />

            <div className={cx("card-download")}>
              <img src="/img/home/download-icon.png" alt="download-icon" />
              {100}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
