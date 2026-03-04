import { Component, Input, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-color-distribution-chart',
  imports: [NgApexchartsModule],
  templateUrl: './color-distribution-chart.html',
  styleUrl: './color-distribution-chart.css',
})
export class ColorDistributionChart {
  @Input({ required: true }) colorDistribution!: Record<string, number>;
  currentManaIcon = signal<string>('mana-symbols/mana.png');
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
        height: 150,
        toolbar: { show: false },
        events: {
          dataPointMouseEnter: (_e: any, ctx: any, config: any) => {
            const label = ctx.w.globals.labels[config.dataPointIndex];
            this.currentManaIcon.set(this.getManaIcon(label));
          },
          dataPointMouseLeave: () => {
            this.currentManaIcon.set('mana-symbols/mana.png');
          }
        }
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
                label: '',
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
                offsetY: 25,
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

  getManaIcon(label: string): string {
    switch (label) {
      case 'Green': return 'mana-symbols/forest.png';
      case 'Red': return 'mana-symbols/mountain.png';
      case 'Blue': return 'mana-symbols/island.png';
      case 'Black': return 'mana-symbols/swamp.png';
      case 'White': return 'mana-symbols/plains.png';
      case 'Colorless': return 'mana-symbols/colorless.png';
      default: return 'mana-symbols/mana.png';
    }
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
    case 'B': return '#0D0F0F';
    case 'R': return '#c53030';
    case 'G': return '#2f855a';
    case 'C':
    case 'Colorless': return '#7E7D80';
    default: return '#805ad5'; 
  }
}


