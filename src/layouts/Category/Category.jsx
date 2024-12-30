import Card from "../../components/Card/Card";

import { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import styles from "./Category.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Category() {
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

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title", "normal-bg", "title-color")}>Popular</h3>
      <Row>
        {data.map((item, index) => (
          <div className={cx("col-lg-3", "col-md-6", "my-3")} key={index}>
            <Card data={item} />
          </div>
        ))}
      </Row>
    </div>
  );
}

export default Category;
