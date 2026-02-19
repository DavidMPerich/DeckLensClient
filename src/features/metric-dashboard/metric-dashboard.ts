import { Component, input, Input } from '@angular/core';
import { ManaCurveChart } from '../metrics/mana-curve-chart/mana-curve-chart';
import { ColorDistributionChart } from '../metrics/color-distribution-chart/color-distribution-chart';
import { CardTypeBreakdownChart } from '../metrics/card-type-breakdown-chart/card-type-breakdown-chart';
import { DeckAnalysisDto } from '../../types/deck';

@Component({
  selector: 'app-metric-dashboard',
  imports: [
    ManaCurveChart
  ],
  templateUrl: './metric-dashboard.html',
  styleUrl: './metric-dashboard.css',
})
export class MetricDashboard {
  analysis = input.required<DeckAnalysisDto>();
}
