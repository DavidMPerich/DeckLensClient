import { Component, ElementRef, input, Input, ViewChild } from '@angular/core';
import { ManaCurveChart } from '../metrics/mana-curve-chart/mana-curve-chart';
import { ColorDistributionChart } from '../metrics/color-distribution-chart/color-distribution-chart';
import { CardTypeBreakdownChart } from '../metrics/card-type-breakdown-chart/card-type-breakdown-chart';
import { DeckAnalysisDto } from '../../types/deck';
import { MetricPanel } from "../metric-panel/metric-panel";

@Component({
  selector: 'app-metric-dashboard',
  imports: [
    ManaCurveChart,
    ColorDistributionChart,
    MetricPanel
],
  templateUrl: './metric-dashboard.html',
  styleUrl: './metric-dashboard.css',
})
export class MetricDashboard {
  analysis = input.required<DeckAnalysisDto>();
  showManaCurve = input(false);

  @ViewChild('clink') clink!: ElementRef<HTMLAudioElement>;

  playHoverSound() {
    const audio = this.clink.nativeElement;
    audio.currentTime = 0;
    audio.volume = .01;
    audio.play().catch(() => {});
  }
}
