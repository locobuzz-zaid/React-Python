import React, { useEffect, useRef } from "react";
import { Divider, Card } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import SectionOne from "./SectionOne";

// Dummy chart options for Section 2
const areaOptions = {
  chart: { type: "area" },
  title: { text: "Area Chart" },
  series: [{ data: [2, 1, 3, 5, 4], name: "Area" }],
};
const columnOptions = {
  chart: { type: "column" },
  title: { text: "Column Chart" },
  series: [{ data: [3, 2, 5, 7, 6], name: "Column" }],
};

const Stack = () => {
  const gridRef1 = useRef();
  const gridRef2 = useRef();

  useEffect(() => {
    if (gridRef1.current && !gridRef1.current.gridstack) {
      GridStack.init(
        {
          float: true,
          resizable: { handles: "all" },
          draggable: { handle: ".ant-card-head" },
        },
        gridRef1.current
      );
    }
    if (gridRef2.current && !gridRef2.current.gridstack) {
      GridStack.init(
        {
          float: true,
          resizable: { handles: "all" },
          draggable: { handle: ".ant-card-head" },
        },
        gridRef2.current
      );
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <SectionOne gridRef={gridRef1} />
      <Divider orientation="left" style={{ marginTop: 40 }}>
        Section 2
      </Divider>
      <div className="grid-stack" ref={gridRef2} style={{ minHeight: 300 }}>
        <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="6" gs-h="4">
          <div className="grid-stack-item-content">
            <Card title="Area Chart">
              <HighchartsReact highcharts={Highcharts} options={areaOptions} />
            </Card>
          </div>
        </div>
        <div className="grid-stack-item" gs-x="6" gs-y="0" gs-w="6" gs-h="4">
          <div className="grid-stack-item-content">
            <Card title="Column Chart">
              <HighchartsReact
                highcharts={Highcharts}
                options={columnOptions}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;
