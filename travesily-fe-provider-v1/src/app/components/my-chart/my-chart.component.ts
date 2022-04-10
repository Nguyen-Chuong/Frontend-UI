import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
import { HotelService } from 'src/app/_services/hotel.service';
import { first } from 'rxjs';
import { ChartModel } from 'src/app/_models/chart';
// import {FormControl, FormGroup, Validators} from "@angular/forms";

Chart.register(...registerables);

@Component({
  selector: 'app-my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss']
})
export class MyChartComponent implements OnInit {
  chart: ChartModel

  constructor(private hotelService: HotelService) { }

  ngOnInit() {

    this.hotelService.getChartData(new Date('2022-03-09'), new Date('2022-03-18')).pipe(first()).subscribe(
      rs => {
        this.chart = rs['data']
      
        // draw chart
        var myChart = new Chart("myChart", {
          type: 'line',
          data: {
            labels: this.chart.labels,
            datasets: [{
                label: 'Booking Statistic',
                data: this.chart.data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                borderWidth: 2,
                spanGaps: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1  
                }
              }
            }
          }
        });
      }
    )
  }

}
