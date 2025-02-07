import React, { useState, useEffect } from "react";
import { List, ListItem, Caption, LineGraph, StatChange } from "playbook-ui";

const GraphDashboard = () => {
  // Manage selected category
  const [category, setCategory] = useState("Revenue");
  const [chartData, setChartData] = useState([]);

  // Fetch data whenever category changes
  useEffect(() => {
    fetch(`/graphs?category=${category}`)
      .then(response => response.json())
      .then(data => setChartData(data.chart_data));
  }, [category]); // Re-fetch when category changes

  return (
    <div className="display_flex">
      {/* Graph Navigation */}
      <div className="graph-nav">
        <Caption text="MENU" size="md" color="light" paddingX="sm" paddingY="xs" />
        <List ordered={false} dark={false} borderless={false}>
          {[
            { name: "Revenue", change: "increase", value: 25 },
            { name: "Orders", change: "decrease", value: 2 },
            { name: "Profit", change: "increase", value: 5 },
            { name: "Average Check" },
            { name: "Canceled", change: "decrease", value: 18 },
            { name: "Repeat Sales" }
          ].map((item) => (
            <ListItem
              key={item.name}
              className={`display_flex justify_content_space_between p_sm ${category === item.name ? "active" : ""}`}
              onClick={() => {
                console.log("WTF")
                setCategory(item.name)
              }}
            >
              <span>{item.name}</span>
              {item.value && <StatChange change={item.change} value={item.value} />}
            </ListItem>
          ))}
        </List>
      </div>

      {/* Graph Section */}
      <div className="graph pt_lg">
        <LineGraph
          id="line-default"
          gradient={false}
          chartData={chartData}
          xAxisCategories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
          yAxisMin={0}
          yAxisMax={10000}
          height="280"
          paddingTop="xl"
          paddingRight="lg"
          colors={["data-2", "data-1", "data-6", "data-7", "data-8", "data-3"]}
          customOption={{ yAxis: { tickInterval: 1000 } }}
        />
      </div>
    </div>
  );
};

export default GraphDashboard;
