import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-color-distribution-chart',
  imports: [NgApexchartsModule],
  templateUrl: './color-distribution-chart.html',
  styleUrl: './color-distribution-chart.css',
})
export class ColorDistributionChart {
    @Input({ required: true }) colorDistribution!: Record<string, number>;

  chartOptions: any;

  ngOnChanges(): void {
    if (!this.colorDistribution) return;

    // Normalize + order (WUBRG then Colorless, then anything else)
    const order = ['W', 'U', 'B', 'R', 'G', 'C', 'Colorless'];
    const keys = Object.keys(this.colorDistribution);

    const sortedKeys = [
      ...order.filter(k => keys.includes(k)),
      ...keys.filter(k => !order.includes(k)).sort(),
    ];

    const series = sortedKeys.map(k => Number(this.colorDistribution[k] ?? 0));

    // Optionally hide empty slices:
    const nonZero = sortedKeys
      .map((k, i) => ({ k, v: series[i] }))
      .filter(x => x.v > 0);

    const labels = nonZero.map(x => prettyColorLabel(x.k));
    const finalSeries = nonZero.map(x => x.v);

    this.chartOptions = {
      series: finalSeries,
      labels,
      chart: {
        type: 'donut',
        height: 171,
        toolbar: { show: false }
      },
      legend: {
        show: false
      },
      stroke: {
        show: false
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(0)}%`,
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '62%',
            labels: {
              show: true,
              total: {
                show: true,
                fontWeight: 800,
                color: ['rgba(255,255,255, 0.8)'],
                formatter: (w: any) => {
                  const sum = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                  return `${sum}`;
                }
              },
              value: {
                show: true,
                fontWeight: 600,
                offsetY: -1,
                color: ['rgba(255,255,255, 0.8)'],
                formatter: (val: number) => `${Math.round(val)}`
              },
            },
          },
        },
      },
      colors: nonZero.map(x => colorKeyToHex(x.k))
    };
  }
}

function prettyColorLabel(k: string): string {
  switch (k) {
    case 'W': return 'White';
    case 'U': return 'Blue';
    case 'B': return 'Black';
    case 'R': return 'Red';
    case 'G': return 'Green';
    case 'C':
    case 'Colorless': return 'Colorless';
    default: return k; // e.g. "WU", "RB", "Gold", etc.
  }
}

function colorKeyToHex(k: string): string {
  // Feel free to tweak these.
  switch (k) {
    case 'W': return '#f8f4e6';
    case 'U': return '#2b6cb0';
    case 'B': return '#2d3748';
    case 'R': return '#c53030';
    case 'G': return '#2f855a';
    case 'C':
    case 'Colorless': return '#a0aec0';
    default: return '#805ad5'; 
  }
}
