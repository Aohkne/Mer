import { useEffect, useState } from "react";

import Nav from "../../components/Nav/Nav";
import Tag from "../../components/Tag/Tag";
import Category from "../../layouts/Category/Category";

import styles from "./Template.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Template() {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCate, setSearchCate] = useState([]);
  const [isActive, setIsActive] = useState({});
  const [findBySearchCate, setFindBySearchCate] = useState(false);
  const [allType, setAllType] = useState([]);
  const [allTemplate, setAllTemplate] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClickTag = (e, cate) => {
    e.stopPropagation();
    setIsActive((prev) => ({
      ...prev,
      [cate]: !prev[cate],
    }));

    setSearchCate((prevCate) => {
      if (prevCate.includes(cate)) {
        return prevCate.filter((item) => item !== cate);
      }
      return [...prevCate, cate];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/powerpoint.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();

        const filteredType = result.reduce((acc, item) => {
          if (!acc.some((el) => el.type === item.type)) {
            acc.push({ type: item.type });
          }

          return acc;
        }, []);
        setAllType(filteredType);

        const filteredTemplate = result.reduce((acc, item) => {
          if (item.template) {
            item.template.forEach((temp) => {
              if (!acc.some((el) => el.template === temp)) {
                acc.push({ template: temp });
              }
            });
          }
          return acc;
        }, []);
        setAllTemplate(filteredTemplate);
      } catch (err) {
        console.log(err);
      } finally {
        console.log("loadding");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {}, [searchCate]);

  return (
    <div className={cx("wrapper")} onClick={() => setIsOpenFilter(false)}>
      <div className={cx("action")}>
        <div className={cx("input-container")}>
          <input type="text" onChange={handleSearch} />

          <button className={cx("normal-bg")}>
            <img src="/img/icon/search-icon.png" alt="search-icon" />
          </button>
        </div>

        <div className={cx("filter-action")}>
          <button
            className={cx("filter-btn", "normal-bg", "title-color")}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpenFilter((status) => !status);
            }}
          >
            Filter
            <img src="/img/icon/filter-icon.png" alt="search-icon" />
          </button>

          {isOpenFilter && (
            <div className={cx("filter-container")}>
              <h3>Tag</h3>
              <div className={cx("tag-list")}>
                {allType.map((item, index) => (
                  <div
                    className={cx("tag-hover", { active: isActive[item.type] })}
                    key={index}
                    onClick={(e) => handleClickTag(e, item.type)}
                  >
                    <Tag type={item.type} />
                  </div>
                ))}
              </div>
              <h3>Template</h3>
              <div className={cx("template-list")}>
                {allTemplate.map((item, index) => (
                  <div
                    className={cx("tag-hover", {
                      active: isActive[item.template],
                    })}
                    key={index}
                    onClick={(e) => handleClickTag(e, item.template)}
                  >
                    <Tag template={item.template} />
                  </div>
                ))}
              </div>

              <button
                className={cx("filter-submit")}
                onClick={() => {
                  setFindBySearchCate(true);
                }}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      <Nav direction={"horizontal"} />

      {search.trim() !== "" || findBySearchCate ? (
        <div className={cx("content", "col-lg-12", "col-md-12")}>
          <Category
            Category={"your result"}
            Search={search}
            searchCate={searchCate}
          />
        </div>
      ) : (
        <div className={cx("content", "col-lg-12", "col-md-12")}>
          <Category Category={"intro"} />
          <Category Category={"outro"} />
          <Category Category={"music"} />
          <Category Category={"effect"} />
          <Category Category={"template"} />
        </div>
      )}
    </div>
  );
}

export default Template;
