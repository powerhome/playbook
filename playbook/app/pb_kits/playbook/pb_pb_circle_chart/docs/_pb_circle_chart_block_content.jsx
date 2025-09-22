import React from "react";
import { PbCircleChart, Title } from "playbook-ui";

const data= [
        {
          name: "Waiting for Calls",
          y: 41,
        },
        {
          name: "On Call",
          y: 49,
        },
        {
          name: "After Call",
          y: 10,
        },
      ]


const PbCircleChartBlockContent = (props) => {
const chartOptions = {
    series: [{
      data: data,
      innerSize: '100%',
      borderWidth: 20,
      borderColor: null,
    }],
    chart: {
      events: {
        render: function() {
          const chart = this;
          const blockElement = document.querySelector('.pb-circle-chart-block');
          if (blockElement) {
            blockElement.style.width = chart.chartWidth + 'px';
            blockElement.style.height = chart.chartHeight + 'px';
          }
        },
        redraw: function() {
          const chart = this;
          const blockElement = document.querySelector('.pb-circle-chart-block');
          if (blockElement) {
            blockElement.style.width = chart.chartWidth + 'px';
            blockElement.style.height = chart.chartHeight + 'px';
          }
        }
      }
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <PbCircleChart
          options={chartOptions}
          {...props}
      />
      <div 
          className="pb-circle-chart-block"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
            textAlign: 'center',
            pointerEvents: 'none'
          }}
      >
        <Title
            size={1}
            tag="div"
        >
          {'83'}
        </Title>
      </div>
    </div>
  );
};

export default PbCircleChartBlockContent;