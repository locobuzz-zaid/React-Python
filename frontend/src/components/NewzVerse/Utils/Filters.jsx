import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Checkbox, Input, Tabs, Popover, Radio } from "antd";
import {
  FilterOutlined,
  FlagOutlined,
  PlayCircleOutlined,
  SmileOutlined,
  TagOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { getDashboardDataAPI } from "../../../redux/actions/NewzVerse/NewzVerseAPI"; // Uncomment when needed
import { setDashboardsData } from "../../../redux/actions/NewzVerse/NewzVerse";

import nvScore from "../../../assets/Dashboard/Filters/nv_score.svg";
import keyActors from "../../../assets/Dashboard/Filters/key_actors.svg";
import country from "../../../assets/Dashboard/Filters/country.svg";
import source from "../../../assets/Dashboard/Filters/source.svg";
import tags from "../../../assets/Dashboard/Filters/tags.svg";
import sentiment from "../../../assets/Dashboard/Filters/sentiment.svg";
import sortBy from "../../../assets/Dashboard/Filters/sort_by.svg";
import expandMore from "../../../assets/Dashboard/Filters/expand_more.svg";
import { getDashboardGlobalBrands } from "../../../redux/constants/NewzVerseConst";

const { TabPane } = Tabs;

const attributeIcons = {
  nv_score_range: nvScore,
  key_actors: keyActors,
  country: country,
  sources: source,
  tag: tags,
  sentiment: sentiment,
  sort_by: sortBy,
};

const attributeLabels = {
  nv_score_range: "NV Score",
  key_actors: "Key Actors",
  country: "Country",
  sources: "Sources",
  tag: "Tag",
  sentiment: "Sentiment",
  sort_by: "Sort By",
};

const Filters = () => {
  const dispatch = useDispatch();
  const dashboardsData = useSelector(
    (state) => state?.NewzVerse?.dashboards_data
  );
  const dashboardActiveKey = useSelector(
    (state) => state?.NewzVerse?.active_key - 1
  );
  const dashboardBrandsList = useSelector(
    (state) => state?.NewzVerse?.dashboard_brands_list
  );
  const dashboardDeepDiveLevel = useSelector(
    (state) => state?.NewzVerse?.dashboard_deep_dive_level
  );

  const keyCompanyFromAPI =
    dashboardsData?.[dashboardActiveKey]?.dashboard_filters?.find(
      (f) => f.attribute === "key_company"
    )?.value || [];

  const keyPeopleFromAPI =
    dashboardsData?.[dashboardActiveKey]?.dashboard_filters?.find(
      (f) => f.attribute === "key_people"
    )?.value || [];

  const rawFilters =
    dashboardsData?.[dashboardActiveKey]?.dashboard_filters || [];

  const dashboardFilters = [
    { attribute: "nv_score_range", value: ["0-30", "31-70", "71-100"] },
    { attribute: "key_actors", value: [] },
    ...rawFilters.filter(
      (f) =>
        f.attribute !== "key_actors" &&
        f.attribute !== "key people" &&
        f.attribute !== "nv_score_range"
    ),
  ];

  const initialFilterState = {
    ...dashboardFilters.reduce((acc, filter) => {
      acc[filter.attribute] = [];
      return acc;
    }, {}),
    key_actors: [],
    // nv_score_range: ["71-100"],
    sort_by: ["Highest NV Score"], // <-- this will now override the reduce value
  };

  let p_token = localStorage.getItem("p_token");

  const [checkedItems, setCheckedItems] = useState(initialFilterState);
  const [visiblePopover, setVisiblePopover] = useState(null);
  const [searchTerms, setSearchTerms] = useState({});
  const [keyActorTab, setKeyActorTab] = useState("company");
  const [selectedFilters, setSelectedFilters] = useState(initialFilterState);

  const handleToggleItem = (attribute, item) => {
    setCheckedItems((prev) => {
      const currentItems = prev[attribute] || [];
      const updated = currentItems.includes(item)
        ? currentItems.filter((i) => i !== item)
        : [...currentItems, item];
      return { ...prev, [attribute]: updated };
    });
  };

  const handleToggleKeyActor = (type, item) => {
    const prefix = type === "company" ? "company:" : "people:";
    const taggedItem = `${prefix}${item}`;
    handleToggleItem("key_actors", taggedItem);
  };

  const handleDeselectAll = (attribute) => {
    setCheckedItems((prev) => ({ ...prev, [attribute]: [] }));
  };

  const handleDone = (attribute) => {
    let updated = {
      ...selectedFilters,
      [attribute]: checkedItems[attribute] || [],
    };
    // console.log("updated", updated, "checkedItems", checkedItems);

    if (attribute === "key_actors") {
      updated.key_company = checkedItems["key_actors"]
        .filter((val) => val.startsWith("company:"))
        .map((val) => val.replace("company:", ""));
      updated.key_people = checkedItems["key_actors"]
        .filter((val) => val.startsWith("people:"))
        .map((val) => val.replace("people:", ""));
    }

    dashboardFilters.forEach((filter) => {
      const attr = filter.attribute;
      if (!(attr in updated)) {
        updated[attr] = [];
      }
    });

    setSelectedFilters(updated);
    setVisiblePopover(null);

    let global_brands = getDashboardGlobalBrands(
      dashboardsData,
      dashboardBrandsList,
      dashboardActiveKey
    );
    const payloadObj = {
      p_token: p_token ? p_token : null,
      brand_list: global_brands,
      start_date: dashboardsData?.[dashboardActiveKey]?.duration?.start_date,
      end_date: dashboardsData?.[dashboardActiveKey]?.duration?.end_date,
      filters: [],
      widget_id: dashboardDeepDiveLevel === 2 ? "2.1" : "3.3",
      dashboard_type: dashboardActiveKey + 1,
      dashboardsData,
      dashboard_filters: [
        {
          attribute: "theme_id",
          values:
            dashboardDeepDiveLevel === 2
              ? dashboardsData?.[dashboardActiveKey]?.selected_theme_data
                  ?.theme_id === 0
                ? []
                : [
                    dashboardsData[dashboardActiveKey]?.selected_theme_data
                      ?.theme_id,
                  ]
              : [],
        },
        {
          attribute: "key_company",
          values: updated?.key_company || [],
        },
        {
          attribute: "key_people",
          values: updated?.key_people || [],
        },
        {
          attribute: "country",
          values: updated?.country,
        },
        {
          attribute: "sources",
          values: updated?.sources,
        },
        {
          attribute: "tag",
          values: updated?.tag,
        },
        {
          attribute: "sentiment",
          values: updated?.sentiment,
        },
        {
          attribute: "sort_by",
          values: updated?.sort_by,
        },
        {
          attribute: "nv_score_range",
          values: updated?.nv_score_range,
        },
      ],
      offset: 0,
      rows: 10,
    };

    dispatch(getDashboardDataAPI(payloadObj));

    let updatedDashboardsData = dashboardsData?.map((dashboard, index) => {
      if (dashboard?.dashboard_type === dashboardActiveKey + 1) {
        if (dashboardDeepDiveLevel === 2) {
          dashboard.key_news_list.data = [];
          dashboard.applied_dashboard_filters = [
            {
              attribute: "key_company",
              values: updated?.key_company || [],
            },
            {
              attribute: "key_people",
              values: updated?.key_people || [],
            },
            {
              attribute: "country",
              values: updated?.country,
            },
            {
              attribute: "sources",
              values: updated?.sources,
            },
            {
              attribute: "tag",
              values: updated?.tag,
            },
            {
              attribute: "sentiment",
              values: updated?.sentiment,
            },
            {
              attribute: "sort_by",
              values: updated?.sort_by,
            },
            {
              attribute: "nv_score_range",
              values: updated?.nv_score_range,
            },
          ];
        } else {
          dashboard.article_data_list.data = [];
          dashboard.applied_dashboard_filters = [
            {
              attribute: "key_company",
              values: updated?.key_company || [],
            },
            {
              attribute: "key_people",
              values: updated?.key_people || [],
            },
            {
              attribute: "country",
              values: updated?.country,
            },
            {
              attribute: "sources",
              values: updated?.sources,
            },
            {
              attribute: "tag",
              values: updated?.tag,
            },
            {
              attribute: "sentiment",
              values: updated?.sentiment,
            },
            {
              attribute: "sort_by",
              values: updated?.sort_by,
            },
            {
              attribute: "nv_score_range",
              values: updated?.nv_score_range,
            },
          ];
        }
      }
      return dashboard;
    });
    dispatch(setDashboardsData(updatedDashboardsData));
  };

  const renderKeyActorsPopover = () => {
    const data =
      keyActorTab === "company" ? keyCompanyFromAPI : keyPeopleFromAPI;
    const prefix = keyActorTab === "company" ? "company:" : "people:";
    const search = searchTerms["key_actors"] || "";

    const filtered = data.filter((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div style={{ width: 300 }}>
        <Tabs
          activeKey={keyActorTab}
          onChange={(key) => {
            setKeyActorTab(key);
            setSearchTerms((prev) => ({ ...prev, key_actors: "" }));
          }}
        >
          <TabPane tab="Company" key="company" />
          <TabPane tab="People" key="people" />
        </Tabs>

        <Input
          placeholder={`Search ${
            keyActorTab === "company" ? "Company" : "People"
          }`}
          value={search}
          onChange={(e) =>
            setSearchTerms((prev) => ({ ...prev, key_actors: e.target.value }))
          }
          style={{ marginBottom: 8, borderRadius: 8 }}
        />

        <div style={{ maxHeight: 200, overflowY: "auto", paddingRight: 8 }}>
          {filtered.map((item, index) => {
            const tagged = `${prefix}${item}`;
            return (
              <div
                key={`key_actors-${item}-${index}`}
                style={{ marginBottom: 4 }}
              >
                <Checkbox
                  checked={checkedItems["key_actors"]?.includes(tagged)}
                  onChange={() => handleToggleKeyActor(keyActorTab, item)}
                >
                  {item}
                </Checkbox>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Button
            size="small"
            style={{
              backgroundColor: "transparent",
              color: "#1657C8",
              borderRadius: 6,
              border: "1px solid #1657C8",
            }}
            type="link"
            onClick={() => handleDeselectAll("key_actors")}
          >
            Deselect all
          </Button>
          <Button
            size="small"
            style={{
              backgroundColor: "#1657C8",
              color: "#fff",
              borderRadius: 6,
            }}
            type="link"
            onClick={() => handleDone("key_actors")}
          >
            Done
          </Button>
        </div>
      </div>
    );
  };

  const renderPopoverContent = (attribute, values) => {
    if (attribute === "key_actors") return renderKeyActorsPopover();

    const search = searchTerms[attribute] || "";
    const filtered = values.filter((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    );

    if (attribute === "sort_by" || attribute === "nv_score_range") {
      return (
        <div style={{ width: 250 }}>
          <Radio.Group
            value={checkedItems[attribute]?.[0] || null}
            onChange={(e) =>
              setCheckedItems((prev) => ({
                ...prev,
                [attribute]: [e.target.value],
              }))
            }
            style={{ display: "flex", flexDirection: "column", gap: 6 }}
          >
            {filtered.map((item, index) => (
              <Radio key={`${attribute}-${item}-${index}`} value={item}>
                {item}
              </Radio>
            ))}
          </Radio.Group>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {attribute === "nv_score_range" ? (
              <Button
                size="small"
                style={{
                  backgroundColor: "transparent",
                  color: "#1657C8",
                  borderRadius: 6,
                  border: "1px solid #1657C8",
                }}
                type="link"
                onClick={() => handleReset(attribute)}
              >
                Reset
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              size="small"
              style={{
                backgroundColor: "#1657C8",
                color: "#fff",
                borderRadius: 6,
              }}
              type="link"
              onClick={() => handleDone(attribute)}
            >
              Done
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ width: 250 }}>
        {attribute === "country" || attribute === "sources" ? (
          <Input
            placeholder={`Search ${attributeLabels[attribute]}`}
            value={search}
            onChange={(e) =>
              setSearchTerms((prev) => ({
                ...prev,
                [attribute]: e.target.value,
              }))
            }
            style={{ marginBottom: 8, borderRadius: 8 }}
          />
        ) : (
          ""
        )}

        <div style={{ maxHeight: 200, overflowY: "auto", paddingRight: 8 }}>
          {filtered.map((item, index) => (
            <div
              key={`${attribute}-${item}-${index}`}
              style={{ marginBottom: 4 }}
            >
              <Checkbox
                checked={checkedItems[attribute]?.includes(item)}
                onChange={() => handleToggleItem(attribute, item)}
              >
                {item}
              </Checkbox>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <Button
            size="small"
            style={{
              backgroundColor: "transparent",
              color: "#1657C8",
              borderRadius: 6,
              border: "1px solid #1657C8",
            }}
            type="link"
            onClick={() => handleDeselectAll(attribute)}
          >
            Deselect all
          </Button>
          <Button
            size="small"
            style={{
              backgroundColor: "#1657C8",
              color: "#fff",
              borderRadius: 6,
            }}
            type="link"
            onClick={() => handleDone(attribute)}
          >
            Done
          </Button>
        </div>
      </div>
    );
  };

  const handleReset = (attribute) => {
    setCheckedItems((prev) => ({ ...prev, [attribute]: [] }));
    setSelectedFilters((prev) => ({ ...prev, [attribute]: [] }));
    setVisiblePopover(null);
  };

  // console.log(
  //   "dashboardFilters",
  //   dashboardFilters,
  //   "attributeLabels",
  //   attributeLabels
  // );

  return (
    <Row
      justify="end"
      align="middle"
      gutter={[12, 12]}
      style={{ marginTop: 16 }}
    >
      {dashboardFilters.map((filter) => {
        const { attribute, value } = filter;
        if (!attributeLabels[attribute]) return null;

        const count = checkedItems[attribute]?.length || 0;

        return (
          <Col key={attribute}>
            <Popover
              content={renderPopoverContent(attribute, value)}
              trigger="click"
              open={visiblePopover === attribute}
              onOpenChange={(open) =>
                setVisiblePopover(open ? attribute : null)
              }
              placement="bottomLeft"
            >
              <Button
                style={{
                  borderRadius: "10px",
                  border: count > 0 ? "2px solid #1657C8" : "",
                  backgroundColor: count > 0 ? "#DAE2FF" : "",
                }}
                // icon={attributeIcons[attribute] || <FilterOutlined />}
              >
                <img
                  src={attributeIcons[attribute] || <FilterOutlined />}
                  style={{ marginRight: "5px", marginLeft: "-5px" }}
                />
                {count > 0 ? (
                  <span
                    style={{
                      background: "#fff",
                      width: "20px",
                      borderRadius: "6px",
                      marginLeft: "-5px",
                      fontSize: "12px",
                    }}
                  >
                    {count > 0 && `${count} `}
                  </span>
                ) : (
                  ""
                )}
                {attributeLabels[attribute]}
                <img src={expandMore} style={{ marginRight: "-10px" }} />
              </Button>
            </Popover>
          </Col>
        );
      })}
    </Row>
  );
};

export default Filters;
