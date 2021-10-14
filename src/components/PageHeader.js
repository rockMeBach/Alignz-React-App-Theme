import React from "react";
import * as echarts from "echarts";
import {
  visitorsSparcalOption,
  visitsSparcalOption,
} from "../Data/DashbordData";

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
    };
  }
  componentDidMount() {
    this.chartPlace();
    this.chartPlace1();
  }
  chartPlace = () => {
    var chartDom = document.getElementById("visitorsSparcalChart");
    var visitorsSparcalChart = echarts.init(chartDom);
    var option;
    option = visitorsSparcalOption;

    option && visitorsSparcalChart.setOption(option);
  };

  chartPlace1 = () => {
    var chartDom = document.getElementById("visitsSparcalChart");
    var visitsSparcalChart = echarts.init(chartDom);
    var option;
    option = visitsSparcalOption;

    option && visitsSparcalChart.setOption(option);
  };

  render() {
    const { HeaderText, Breadcrumb } = this.props;
    return (
      <div className="block-header">
        <div className="row">
          <div className="col-lg-5 col-md-6 col-sm-12">
            <h2>{HeaderText}</h2>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a
                  href="dashboard"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i className="icon-home"></i>
                </a>
              </li>
              {Breadcrumb.map((item, index) => {
                return (
                  <li
                    key={item.name + index}
                    className="breadcrumb-item active"
                  >
                    <a
                      href={item.navigate ? item.navigate : null}
                      style={{ textDecoration: "none", color: "gray" }}
                    >
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-lg-7 col-md-4 col-sm-12 text-right">
            <div className="inlineblock text-center m-r-15 m-l-15 hidden-sm">
              <div
                id="visitorsSparcalChart"
                className="sparkline text-left"
                style={{ width: "12vh", height: 25 }}
              ></div>
              <span>Visitors</span>
            </div>
            <div className="inlineblock text-center m-r-15 m-l-15 hidden-sm">
              <div
                id="visitsSparcalChart"
                className="sparkline text-left"
                style={{ width: "12vh", height: 25 }}
              ></div>
              <span>Visits</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageHeader;
