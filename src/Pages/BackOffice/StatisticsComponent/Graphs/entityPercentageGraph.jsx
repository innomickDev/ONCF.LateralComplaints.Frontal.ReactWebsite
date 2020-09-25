import React, { Fragment, Component } from "react";
import { translate } from "react-multi-lang";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
} from "../../../Helpers/utils";
import Chart from "react-apexcharts";

class EntityPercentageGraph extends Component {
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
          name: this.props.t("Statistics.PERCENTAGE_RATE"),
          type: "bar",
          data: this.props.percentageRate,
        },
      ],
      options: {
        colors: ["#42f595"],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            vertical: true,
          },
          dataLabels: {
            position: "top",
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },

        xaxis: {
          categories: this.props.entityName,
        },

        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function(y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " %";
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
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </div>
      </Fragment>
    );
  }
}
export default translate(EntityPercentageGraph);
