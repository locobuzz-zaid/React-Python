import React, { useState } from "react";
import { Card, Typography, Tag, Input, Button, Collapse, Divider } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const lineOptions = {
  title: { text: "Line Chart" },
  series: [{ data: [1, 3, 2, 4, 6, 3, 5], type: "line", name: "Line" }],
};
const barOptions = {
  chart: { type: "bar" },
  title: { text: "Bar Chart" },
  series: [{ data: [5, 3, 4, 7, 2], name: "Bar" }],
};
const pieOptions = {
  chart: { type: "pie" },
  title: { text: "Pie Chart" },
  series: [
    {
      name: "Share",
      data: [
        { name: "A", y: 30 },
        { name: "B", y: 40 },
        { name: "C", y: 30 },
      ],
    },
  ],
};

const SectionOne = ({ gridRef }) => {
  const [editMode, setEditMode] = useState(false);
  const [sectionName, setSectionName] = useState("Section 1");
  const [description, setDescription] = useState(
    "This is a description for Section 1."
  );
  const [tags, setTags] = useState(["charts", "demo"]);
  const [inputTag, setInputTag] = useState("");

  const handleSave = () => setEditMode(false);

  const handleAddTag = () => {
    if (inputTag && !tags.includes(inputTag)) {
      setTags([...tags, inputTag]);
      setInputTag("");
    }
  };

  const handleRemoveTag = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <Collapse defaultActiveKey={["1"]} style={{ marginBottom: 24 }}>
      <Panel
        header={
          editMode ? (
            <Input
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              style={{ fontWeight: "bold", fontSize: 18, width: 200 }}
            />
          ) : (
            <span style={{ fontWeight: "bold", fontSize: 18 }}>
              {sectionName}
            </span>
          )
        }
        key="1"
        extra={
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setEditMode(!editMode);
            }}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
        }
      >
        {editMode ? (
          <>
            <Paragraph
              editable={{ onChange: setDescription }}
              style={{ marginBottom: 8 }}
            >
              {description}
            </Paragraph>
            <div style={{ marginBottom: 8 }}>
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => handleRemoveTag(tag)}
                  style={{ marginBottom: 4 }}
                >
                  {tag}
                </Tag>
              ))}
              <Input
                size="small"
                style={{ width: 100, marginLeft: 8 }}
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                onPressEnter={handleAddTag}
                placeholder="Add tag"
              />
              <Button
                size="small"
                onClick={handleAddTag}
                style={{ marginLeft: 4 }}
              >
                Add
              </Button>
            </div>
            <Button type="primary" onClick={handleSave}>
              Save Section
            </Button>
          </>
        ) : (
          <>
            <Paragraph>{description}</Paragraph>
            <div style={{ marginBottom: 8 }}>
              {tags.map((tag) => (
                <Tag key={tag} color="blue" style={{ marginBottom: 4 }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </>
        )}

        <Divider />
        <div className="grid-stack" ref={gridRef} style={{ minHeight: 400 }}>
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="4">
            <div className="grid-stack-item-content">
              <Card title="Line Chart">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={lineOptions}
                />
              </Card>
            </div>
          </div>
          <div className="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="4">
            <div className="grid-stack-item-content">
              <Card title="Bar Chart">
                <HighchartsReact highcharts={Highcharts} options={barOptions} />
              </Card>
            </div>
          </div>
          <div className="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="4">
            <div className="grid-stack-item-content">
              <Card title="Pie Chart">
                <HighchartsReact highcharts={Highcharts} options={pieOptions} />
              </Card>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};

export default SectionOne;
