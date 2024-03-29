import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {HotelService} from 'src/app/_services/hotel.service';
import {first} from 'rxjs';
import {ChartModel} from 'src/app/_models/chart';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

Chart.register(...registerables);

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss']
})
export class MyChartComponent implements OnInit {
  chart: ChartModel
  form: FormGroup
  todayDate: Date = new Date();
  lastWeekDate: Date = new Date(new Date().setDate(this.todayDate.getDate() - 14))
  myChart: Chart
  totalBooking: number = 0
  totalRevenue: number = 0

  constructor(private hotelService: HotelService,
    private fb: FormBuilder, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
     /** spinner starts on init */
    this.spinner.show();
    this.form = this.fb.group({
      from: [this.lastWeekDate, [Validators.required]],
      to: [this.todayDate, [Validators.required]]
    })
    this.hotelService.getChartData(new Date(this.lastWeekDate), new Date(this.todayDate)).pipe(first()).subscribe(
      rs => {
        this.chart = rs['data']
        this.totalBooking = this.chart.dataBooking.reduce((a, b) => a + b) / 1000
        this.totalRevenue = this.chart.dataAmount.reduce((a, b) => a + b) * 1000
        this.drawChart()
        // check if data is loaded, hide it
        if(rs){
          this.spinner.hide();
        }
      }
    )
  }

  drawChart(){
    // draw chart
    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.chart.labels,
        datasets: [
          {
            label: 'Booking Statistic',
            data: this.chart.dataBooking,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            borderWidth: 2,
            spanGaps: 1
          },
          {
            label: 'Revenue Statistic',
            data: this.chart.dataAmount,
            fill: false,
            borderColor: 'rgb(245, 96, 66)',
            tension: 0.1,
            borderWidth: 2,
            spanGaps: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1000
            }
          }
        }
      }
    });
  }

  filterChange() {
    this.myChart.destroy()
    this.hotelService.getChartData(new Date(this.form.value.from), new Date(this.form.value.to)).subscribe(
      rs => {
        this.chart = rs['data']
        this.totalBooking = this.chart.dataBooking.reduce((a, b) => a + b) / 1000
        this.totalRevenue = this.chart.dataAmount.reduce((a, b) => a + b) * 1000
        this.drawChart()
      }
    )
  }
}
