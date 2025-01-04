import YouTubeVideoInfo from "../../api/YoutubeVideoInfo/sever-youtube";

import { useState, useEffect } from "react";

import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { Row } from "react-bootstrap";

const cx = classNames.bind(styles);

function Category({ Category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/powerpoint.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  let filteredData = [];

  if (Category === "new") {
    filteredData = data.sort((a, b) => b.id - a.id).slice(0, 4);
  } else if (Category === "intro") {
    filteredData = data.filter((item) => item.type === "intro");
  } else if (Category === "outro") {
    filteredData = data.filter((item) => item.type === "outro");
  } else if (Category === "music") {
    filteredData = data.filter((item) => item.type === "music");
  } else if (Category === "effect") {
    filteredData = data.filter((item) => item.type === "effect");
  }

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title", "normal-bg", "title-color")}>
        {Category.charAt(0).toUpperCase() + Category.slice(1)}
      </h3>

      <Row>
        {filteredData.map((item, index) => (
          <div className={cx("col-lg-3", "col-md-6", "my-3")} key={index}>
            <YouTubeVideoInfo data={item} type={item.type} />
          </div>
        ))}
      </Row>
    </div>
  );
}

export default Category;
