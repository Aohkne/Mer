import { Link } from "react-router-dom";

import styles from "./Card.module.scss";
import classNames from "classnames/bind";
import Tag from "../Tag/Tag";

const cx = classNames.bind(styles);

function Card({ data, title, type, template, view, like }) {
  return (
    <Link to={`/template/${data.code}`}>
      <div className={cx("card-wrapper")}>
        <img
          src={data.img}
          alt="card-img"
          className={cx("w-100", "card-img")}
        />

        <div className={cx("content")}>
          <div className={cx("info-wrapper")}>
            <div className={cx("info-title")}>{title}</div>

            <div className={cx("tag-container")}>
              <Tag type={type} />

              {data.template &&
                data.template.map((item, index) => (
                  <Tag template={item} key={index} />
                ))}
            </div>

            <div
              className={cx(
                "info-description",
                "d-flex",
                "justify-content-between"
              )}
            >
              <div className={cx("info-content")}>
                <img
                  src="/img/detail/view-icon.png"
                  alt="view-icon"
                  className={cx("view-icon")}
                />
                {view}
              </div>

              <div className={cx("info-content")}>
                <img
                  src="/img/detail/like-icon.png"
                  alt="like-icon"
                  className={cx("like-icon")}
                />
                {like}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
