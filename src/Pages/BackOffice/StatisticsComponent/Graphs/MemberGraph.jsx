import React, { Fragment, Component } from "react";
import { translate } from "react-multi-lang";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
} from "../../../Helpers/utils";
import ReactApexChart from "react-apexcharts";

class MembersGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emails: [],
      stationNames: null,
      loading: false,
      isShowRolesModal: false,
      mainLoader: true,
      meta: {
        page: 1,
        pageSize: INDEX_PAGE_SIZE_DEFAULT,
        pageSizeOptions: INDEX_PAGE_SIZE_OPTIONS,
        pageTotal: 1,
        total: 0,
      },
      series: [
        {
          name: this.props.t("Statistics.TOTAL_MEMBER"),
          type: "area",
          data: this.props.monthData,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          curve: "smooth",
        },
        fill: {
          type: "solid",
          opacity: [0.35, 1],
        },
        labels: this.props.monthName,
        markers: {
          size: 0,
        },
        yaxis: [
          {
            label: {
              formatter: function(y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0);
                }
              },
            },
            title: {
              text: this.props.t("Statistics.TOTAL_MEMBER"),
            },
          },
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0);
              }
              return y;
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <Fragment>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
      </Fragment>
    );
  }
}
export default translate(MembersGraph);
