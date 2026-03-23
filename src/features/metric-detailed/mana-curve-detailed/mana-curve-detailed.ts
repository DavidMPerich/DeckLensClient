import { Component, OnInit, computed, signal } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexPlotOptions, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';
import { ManaCurveAnalysisDto, ManaCurveChartBreakdownsDto } from '../../../types/deck';

export type ManaCurveChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
};

type ManaCurveBreakdown = 'byCmc' | 'byColor' | 'byType' | 'byCreatureSplit';

@Component({
  selector: 'app-mana-curve-detailed',
  templateUrl: './mana-curve-detailed.html',
  styleUrl: './mana-curve-detailed.css',
  imports: [NgApexchartsModule]
})
export class ManaCurveDetailed implements OnInit {
  manaCurveData = signal<ManaCurveAnalysisDto | null>(null);
  selectedBreakdown = signal<ManaCurveBreakdown>('byCmc');

  activeManaCurve = computed(() => {
    const data = this.manaCurveData();
    const selected = this.selectedBreakdown();

    if (!data) return null;

    switch (selected) {
      case 'byColor':
        return data.charts.byColor;
      case 'byType':
        return data.charts.byType;
      case 'byCreatureSplit':
        return data.charts.byCreatureSplit;
      default:
        return data.charts.byCmc;
    }
  });

  chartOptions = computed<ManaCurveChartOptions | null>(() => {
    const chartData = this.activeManaCurve();
    const selected = this.selectedBreakdown();

    if (!chartData) return null;

    const isStacked = selected !== 'byCmc';

    return {
      series: chartData.series,
      chart: {
        type: 'bar',
        height: 400,
        stacked: isStacked,
        toolbar: {
          show: false
        }
      },
      xaxis: {
        categories: chartData.categories.map(String),
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
          horizontal: false,
          columnWidth: '35%',
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
        custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
          const value = series[seriesIndex][dataPointIndex];
          const seriesName = w.config.series[seriesIndex].name;

          return `
            <div style="
              padding: 5px 14px;
              border-radius: 12px;
              background: rgba(0, 0, 0, 0.85);
              color: rgba(255, 255, 255, 0.92);
              font-size: 12px;
              font-weight: 700;
              white-space: nowrap;
            ">
              ${seriesName}: ${value}
            </div>
          `;
        }
      },
      colors: this.getChartColors(selected, chartData.series.map(s => s.name))
    };
  });

  ngOnInit(): void {
    this.manaCurveData.set(history.state.data);
  }

  private getChartColors(
    breakdown: ManaCurveBreakdown,
    seriesNames: string[]
  ): string[] {
    if (breakdown === 'byCmc') {
      return ['#8B5CF6'];
    }

    if (breakdown === 'byColor') {
      const colorMap: Record<string, string> = {
        White: '#F8FAFC',
        Blue: '#60A5FA',
        Black: '#4B5563',
        Red: '#F87171',
        Green: '#4ADE80',
        Colorless: '#A1A1AA',
        Multicolor: '#FBBF24'
      };

      return seriesNames.map(name => colorMap[name] ?? '#8B5CF6');
    }

    if (breakdown === 'byCreatureSplit') {
      const splitMap: Record<string, string> = {
        Creature: '#8B5CF6',
        'Non-Creature': '#38BDF8'
      };

      return seriesNames.map(name => splitMap[name] ?? '#8B5CF6');
    }

    if (breakdown === 'byType') {
      const typeMap: Record<string, string> = {
        Creature: '#8B5CF6',
        Instant: '#38BDF8',
        Sorcery: '#F97316',
        Enchantment: '#22C55E',
        Artifact: '#A1A1AA',
        Planeswalker: '#EC4899',
        Battle: '#FACC15',
        Other: '#64748B'
      };

      return seriesNames.map(name => typeMap[name] ?? '#8B5CF6');
    }

    return ['#8B5CF6'];
  }
}
