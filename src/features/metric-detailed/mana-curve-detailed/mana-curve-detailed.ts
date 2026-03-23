import { Component, computed, OnInit, signal } from '@angular/core';
import { ManaCurveChart } from '../mana-curve-chart/mana-curve-chart';
import { DeckAnalysisDto, ManaCurveAnalysisDto } from '../../../types/deck';
import { NgApexchartsModule } from 'ng-apexcharts';

type ManaCurveBreakdown = 'byCmc' | 'byColor' | 'byType' | 'byCreatureSplit';

@Component({
  selector: 'app-mana-curve-detailed',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './mana-curve-detailed.html',
  styleUrl: './mana-curve-detailed.css',
})
export class ManaCurveDetailed implements OnInit {
  manaCurveData = signal<ManaCurveAnalysisDto | null>(null);
  selectedBreakdown = signal<ManaCurveBreakdown>('byCmc');

  ngOnInit(): void {
    this.manaCurveData = history.state.data;
  }

  activeManaCurve = computed(() => {
    const data = this.manaCurveData();
    const selected = this.selectedBreakdown();

    if(!data)
    {
      return null;
    }

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
}
