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
 */

import YouTubeVideoInfo from "../../api/YoutubeVideoInfo/sever-youtube";

import { useState, useEffect } from "react";

import styles from "./Category.module.scss";
import classNames from "classnames/bind";
import { Row } from "react-bootstrap";

const cx = classNames.bind(styles);

function Category({ Category, Search, searchCate, relateCate }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFound, setIsFound] = useState(false);

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

  useEffect(() => {
    let tmpData = [];

    if (!Search && (!searchCate || searchCate.length === 0)) {
      switch (Category) {
        case "relate":
          tmpData = data.filter((item) => item.type === relateCate).slice(0, 4);
          break;
        case "new":
          tmpData = [...data].sort((a, b) => b.id - a.id).slice(0, 4);
          break;
        case "intro":
        case "outro":
        case "music":
        case "effect":
          tmpData = data.filter((item) => item.type === Category);
          break;
        default:
          tmpData = data;
          break;
      }
    } else {
      if (searchCate && searchCate.length > 0) {
        tmpData = data.filter((item) => {
          const matchType = searchCate.includes(item.type);
          const matchTemplate =
            Array.isArray(item.template) &&
            item.template.some((template) => searchCate.includes(template));
          return matchType || matchTemplate;
        });
      }

      if (Search) {
        const code = Search.toLowerCase().replace(/[^a-z0-9]/g, "");
        tmpData = tmpData.length > 0 ? tmpData : data;
        tmpData = tmpData.filter(
          (item) =>
            item.name
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "")
              .startsWith(code) || item.type.toLowerCase().startsWith(code)
        );
      }
    }

    setIsFound(tmpData.length > 0);
    setFilteredData(tmpData);
  }, [Category, Search, searchCate, relateCate, data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={cx("wrapper")}>
      <h3
        className={cx(
          "title",
          { "normal-bg": Category === "relate" },
          { "normal-bg": Category === "new" },
          { "intro-bg": Category === "intro" },
          { "outro-bg": Category === "outro" },
          { "music-bg": Category === "music" },
          { "effect-bg": Category === "effect" },
          { "template-bg": Category === "template" },
          { "template-bg": Category === "your result" },
          "title-color"
        )}
      >
        {Category.charAt(0).toUpperCase() + Category.slice(1)}
      </h3>

      {Search ? (
        isFound ? (
          <Row>
            {filteredData.map((item, index) => (
              <div className={cx("col-lg-3", "col-md-6", "my-3")} key={index}>
                <YouTubeVideoInfo data={item} type={item.type} code={Search} />
              </div>
            ))}
          </Row>
        ) : (
          <div className={cx("not-found", "description-color")}>
            Your Result Not Found
          </div>
        )
      ) : (
        <Row>
          {filteredData.map((item, index) => (
            <div className={cx("col-lg-3", "col-md-6", "my-3")} key={index}>
              <YouTubeVideoInfo data={item} type={item.type} code={Search} />
            </div>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Category;
