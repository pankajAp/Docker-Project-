import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexPlotOptions,
  ApexYAxis,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
  ChartComponent,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import {ActivatedRoute, Router} from "@angular/router";
import {globalService} from "../../../sharing/global.service";
import {AuthService} from 'src/app/core/service/auth.service';
import {DatePipe} from "@angular/common";
import {GlobalFile} from "../../../globalfile";
import {MultiDataSet, Label} from 'ng2-charts';

import * as ApexCharts from 'apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
  chartComponent: ChartComponent;
};

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss'],
})

export class Dashboard2Component implements OnInit {
  stdOngoingTimetableSchedules: Array<any>;
  stdCompletedTimetableSchedules: Array<any>;
  stdUpcomingTimetableSchedules: Array<any>;
  userData: any;
  userInstituteId: number;
  instLength: number;
  courseLength: number;
  classLength: number;
  batchLength: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private api: globalService,
    private datePipe: DatePipe,
    public app: GlobalFile) { // private activatedRoute: ActivatedRoute
    console.log("Dashboard2 called");
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('userDetails'));
    this.userInstituteId = this.userData.userInstituteId;
    this.getListOfInstitutes();
  }

  getListOfInstitutes() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    let userInstituteId = userDetails.userInstituteId;
    let request = {
      query: ""
    }
    if (userInstituteId == 1) {
      this.api.getData('institute/all', request).subscribe(resp => {
        console.log("Resp is => " + resp);
        this.instLength = resp.length;
        console.log("Institute LENGTH => ", this.instLength);
      });
    } else {
      this.api.getData('institute/get/' + userInstituteId, request).subscribe(resp => {
        console.log("RESP IS => " + resp.length);
        this.instLength = resp.length;
        console.log("Institute LENGTH => ", this.instLength);
      });
    }
  }
}
