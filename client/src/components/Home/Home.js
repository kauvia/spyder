import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Line } from "react-chartjs-2";

import Navbar from "../navbar";
import AllowanceContainer from "../Allowance-Container/AllowanceContainer";
import { api } from "../functions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highestWeight: 100,
      allowance: null,
      targetWeight: 50,
      dateRange: 30,

      data: {
        datasets: [
          {
            label: "Weight",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10
          },
          {
            label: "Target Weight",
            borderDash: [10, 5],
            borderColor: "rgba(255,0,0,1)",
            backgroundColor: "rgba(0,0,0,0)",
            pointRadius: 0
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.updateFromDb();
  }
  updateFromDb() {
    api("GET", "stats").then(val => {
      this.sortStats(val.data.stat, this.state.dateRange);
    });
    api("GET", "allowance").then(val => {
      this.setState({ allowance: val.data });
    });
  }
  sortStats(dataArr, val) {
    if (dataArr.length > 0) {
      let tempArr = [];
      let lineArr = [];
      let highestWeight = 0;
      let currentDate = moment(new Date()).startOf("day");
      for (let i in dataArr) {
        let tempDate = moment(dataArr[i].created_at).startOf("day");
        let diff = currentDate.diff(tempDate, "days");
        //	console.log(diff)
        if (diff <= val) {
          if (highestWeight < dataArr[i].weight) {
            highestWeight = dataArr[i].weight;
          }
          lineArr.push({ y: dataArr[0].weight, x: tempDate.format("LL") });
          tempArr.push({ y: dataArr[i].weight, x: tempDate.format("LL") });
        }
      }
      this.setState({ highestWeight: highestWeight });
      this.setState({ targetWeight: dataArr[0].target_weight });
      this.setState({
        data: {
          datasets: [
            { data: tempArr, label: "Weight" },
            { data: lineArr, label: "Target Weight" }
          ]
        }
      });
    }
  }
  render() {
    return (
      <div className="row">
        <div
          className="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            background:
              "linear-gradient(to bottom, #bce0ee 0%, #b3dced 50%, #29b8e5 100%)"
          }}
        />
        <Navbar />
        <AllowanceContainer data={this.state.allowance} />
        <div className="container" style={{ border: "1px solid black" }}>
          <div className="row text-center">
            <div className="col">30 days</div>
            <div className="col">60 days</div>
            <div className="col">180 days</div>
            <div className="col">Max</div>
          </div>
          <div
            className="row"
            style={{ backgroundColor: "rgba(255,255,255,.75)" }}
          >
            <Line
              options={{
                scales: {
                  xAxes: [
                    {
                      type: "time",
                      display: true
                    }
                  ],
                  yAxes: [
                    {
                      scaleLabel: {
                        display: true,
                        labelString: "Weight / kg"
                      },
                      type: "linear",
                      ticks: {
                        min: 20,
                        max: Math.round(this.state.highestWeight * 0.12) * 10
                      }
                    }
                  ]
                }
              }}
              data={this.state.data}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    store: state
  };
};

const options = {
  scales: {
    xAxes: [
      {
        type: "time",
        display: true
      }
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "Weight / kg"
        },
        type: "linear",
        ticks: { min: 20 }
      }
    ]
  }

  // annotation: {
  // 	drawTime: "afterDatasetsDraw",
  // 	annotations: [
  // 		{
  // 			id:"targetline",
  // 			type: "line",
  // 			mode: "horizontal",
  // 			scaleID: "y-axis-0",
  // 			value: 77,
  // 			borderColor: "black",
  // 			borderWidth: 4,
  // 			// label: {
  // 			// 	// enabled: true,
  // 			// 	// content: "Target Weight"
  // 			// }
  // 		}
  // 	]
  // }
};

export default connect(mapStateToProps)(Home);
