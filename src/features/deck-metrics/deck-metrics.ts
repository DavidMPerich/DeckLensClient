import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DeckAnalysisService } from '../../core/services/deck-analysis-service';
import { DeckAnalysisDto, DeckImportRequestDto } from '../../types/deck';
import { Observable } from 'rxjs';
import { MetricDashboard } from "../metric-dashboard/metric-dashboard";
import { MetricPanel } from '../metric-panel/metric-panel';

@Component({
  selector: 'app-deck-metrics',
  imports: [
    MetricPanel
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

  protected onScanComplete(event: AnimationEvent) {
    if (event.animationName?.includes('animate_line')) {
      this.scanningComplete.set(true);
    }
  }
}
