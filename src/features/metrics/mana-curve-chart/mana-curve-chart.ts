import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { __values } from 'tslib';

@Component({
  selector: 'app-mana-curve-chart',
  imports: [NgApexchartsModule],
  templateUrl: './mana-curve-chart.html',
  styleUrl: './mana-curve-chart.css',
})
export class ManaCurveChart implements OnChanges {
  @Input({ required: true }) manaCurveData!: Record<string, number>;

  chartOptions: any;

  ngOnChanges() {
    const cmcs = Object.keys(this.manaCurveData).sort((a, b) => Number(a) - Number(b));

    this.chartOptions = {
      series: [{ 
        name: 'Cards', 
        data: cmcs.map(c => this.manaCurveData[c]) 
      }],
      chart: { 
        type: 'bar', 
        height: 160,
        toolbar: { 
          show: false 
        } 
      },
      xaxis: { 
        categories: cmcs,
          labels: {
            style: {
              colors: '#FFF'
            }
        },
        title: { 
          text: 'Mana Curve',
          style: {
            fontSize: '12px',
            fontWeight: 400,
            color: '#FFF'
          } 
        } 
      },
      yaxis: { 
        show: false
      },
      plotOptions: { 
        bar: { 
          columnWidth: '45%', 
          borderRadius: 4
        }
      },
      fill: {
        opacity: 0.8
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        yaxis: { 
          lines: { 
            show: false 
          }
        }
      }
    };
  }
}
