import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeckAnalysisService } from '../../core/services/deck-analysis-service';
import { DeckAnalysisDto, DeckImportRequestDto } from '../../types/deck';
import { Observable } from 'rxjs';
import { MetricDashboard } from "../metric-dashboard/metric-dashboard";
import { MetricPanel } from '../metric-panel/metric-panel';
import { ColorDistributionChart } from "../metrics/color-distribution-chart/color-distribution-chart";
import { ManaCurveChart } from "../metrics/mana-curve-chart/mana-curve-chart";
import { MetricType } from '../../types/metricTypes';
import { CardTypeBreakdownChart } from "../metrics/card-type-breakdown-chart/card-type-breakdown-chart";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-deck-metrics',
  imports: [
    MetricPanel,
    ColorDistributionChart,
    ManaCurveChart,
    CardTypeBreakdownChart,
    DecimalPipe
],
  templateUrl: './deck-metrics.html',
  styleUrl: './deck-metrics.css',
})
export class DeckMetrics implements OnInit {
  private deckAnalysisService = inject(DeckAnalysisService);
  private router = inject(Router);

  protected deck: string = (history.state.deck as string) ?? '';
  protected deckAnalysis = signal<DeckAnalysisDto | null>(null);
  protected loading = signal(false);
  protected scanningComplete = signal(false);
  protected error = signal<string | null>(null);
  metricSlots = signal<MetricType[]>([
    MetricType.ManaCurve,
    MetricType.ColorDistribution,
    MetricType.Stub,
    MetricType.AverageCMC,
    MetricType.Stub,
    MetricType.CardTypeBreakdown
  ]);

  @ViewChild('clink') clink!: ElementRef<HTMLAudioElement>;
  private lastClink = 0;
  
  
  ngOnInit(): void {
    if (!this.deck) {
      this.router.navigate(['/']);
      return;
    }

    this.loading.set(true);
    this.scanningComplete.set(false);
    this.error.set(null);
    this.deckAnalysis.set(null);

    const deckImportRequestDto : DeckImportRequestDto = {
      cardNames: this.deck
    };

    this.deckAnalysisService.analyzeDeck(deckImportRequestDto).subscribe({
      next: response => this.deckAnalysis.set(response),
      error: error => {
        this.error.set('Failed to analyze deck.');
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
        console.log("Deck analysis complete");
      }
    });
  }

  get averageCmcBand(): string {
    const cmc = this.deckAnalysis()?.averageCmc ?? 0;

    if (cmc < 2.5) return 'Fast';
    if (cmc < 3.5) return 'Midrange';
    if (cmc < 4.5) return 'Heavy';
    return 'Very Heavy';
  }

  protected onScanComplete(event: AnimationEvent) {
    if (event.animationName?.includes('animate_line')) {
      this.scanningComplete.set(true);
    }
  }

  playHoverSound() {
    const now = performance.now();
    if (now - this.lastClink < 80) return;
    this.lastClink = now;

    const audio = this.clink.nativeElement;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }
}
