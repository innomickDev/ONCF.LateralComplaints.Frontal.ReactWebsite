import React, { Fragment, Component } from "react";
import { translate } from "react-multi-lang";
import {
  INDEX_PAGE_SIZE_DEFAULT,
  INDEX_PAGE_SIZE_OPTIONS,
} from "../../../Helpers/utils";
import ReactApexChart from "react-apexcharts";

class CategoryGraph extends Component {
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
          name: this.props.t("Statistics.TOTAL_COUNT"),
          type: "bar",
          data: this.props.countData,
        },
      ],
      options: {
        chart: {
          // toolbar: { show: false },
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            vertical: true,
          },
        },
        dataLabels: {
          enabled: false,
        },

        xaxis: {
          categories: this.props.categoryName,
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
            type="bar"
            height={350}
          />
        </div>
      </Fragment>
    );
  }
}
export default translate(CategoryGraph);
