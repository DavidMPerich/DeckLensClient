import { Component, Input, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-card-type-breakdown-chart',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './card-type-breakdown-chart.html',
  styleUrl: './card-type-breakdown-chart.css',
})
export class CardTypeBreakdownChart {
  @Input({ required: true }) cardTypeBreakdown!: Record<string, number>;
  currentCardTypeIcon = signal<string>('card-types/type.png');
  chartOptions: any;
  private typeColors: Record<string, string> = {
    Artifact: '#7E7D80',
    Battle: '#0D0F0F',
    Creature: '#710ee3',
    Enchantment: '#f8f4e6',
    Instant: '#c53030',
    Land: '#2f855a',
    Multiple: '#FACC15',
    Planeswalker: '#2e1852',
    Sorcery: '#2b6cb0'
  }

  ngOnChanges(): void {
    const labels = Object.keys(this.cardTypeBreakdown ?? {});
    const series = labels.map(label => this.cardTypeBreakdown[label]);

    this.chartOptions = {
      series,
      labels,
      chart: {
        type: 'donut',
        height: 149,
        toolbar: { show: false },
        events: {
          dataPointMouseEnter: (_e: any, ctx: any, config: any) => {
            const label = ctx.w.globals.labels[config.dataPointIndex];
            this.currentCardTypeIcon.set(this.getCardTypeIcon(label));
          },
          dataPointMouseLeave: () => {
            this.currentCardTypeIcon.set('card-types/type.png');
          }
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${val.toFixed(0)}%`,
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
            }
          }
        }
      },
      tooltip: {
        enabled: true,
        custom: ({ seriesIndex, w }: any) => {
          return `<div class="px-2">${w.globals.labels[seriesIndex]}</div>`;
        }
      },
      stroke: {
        show: false
      },
      states: {
        active: {
          filter: { type: 'none' }
        }
      },
      colors: labels.map(l => this.typeColors[l] ?? '#ffffff')
    };
  }

  getCardTypeIcon(label: string): string {
    switch (label) {
      case 'Artifact': return 'card-types/artifact.png';
      case 'Battle': return 'card-types/battle.png';
      case 'Creature': return 'card-types/creature.png';
      case 'Enchantment': return 'card-types/enchantment.png';
      case 'Instant': return 'card-types/instant.png';
      case 'Land': return 'card-types/land.png';
      case 'Multiple': return 'card-types/multiple.png';
      case 'Planeswalker': return 'card-types/planeswalker.png';
      case 'Sorcery': return 'card-types/sorcery.png';

      default: return 'card-types/type.png';
    }
  }
}
