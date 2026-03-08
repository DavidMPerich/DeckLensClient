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
        height: 137,
        toolbar: { 
          show: false 
        } 
      },
      xaxis: { 
        categories: cmcs,
        labels: {
          style: {
            colors: '#FFFFFF',
            fontWeight: 400
          }
        },
        crosshairs: {
          show: false
        }
      },
      yaxis: { 
        show: false
      },
      plotOptions: { 
        bar: { 
          columnWidth: '50%', 
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
            show: true
          }
        }
      },
      tooltip: {
        enabled: true,
        custom: ({ series, seriesIndex, dataPointIndex }: any) => {
          const value = series[seriesIndex][dataPointIndex];
          return `
            <div style="
              padding: 5px 14px;
              border-radius: 12px;
              background: rgba(16, 18, 30, 0.6);
              color: rgba(255, 255, 255, 0.92);
              font-size: 12px;
              font-weight: 700;
              white-space: nowrap;
              backdrop-filter: blur(6px);
            ">
              Cards: ${value}
            </div>
          `;
        }
      },
    colors: ['#8B5CF6']
    };
  }
}
