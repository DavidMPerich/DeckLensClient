import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DeckAnalysisService } from '../../core/services/deck-analysis-service';
import { DeckAnalysisDto, DeckImportRequestDto } from '../../types/deck';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck-metrics',
  imports: [],
  templateUrl: './deck-metrics.html',
  styleUrl: './deck-metrics.css',
})
export class DeckMetrics implements OnInit {
  private deckAnalysisService = inject(DeckAnalysisService);
  private router = inject(Router);
  protected deck: string = (history.state.deck as string) ?? '';
  protected deckAnalysis = signal<DeckAnalysisDto | null>(null);
  
  ngOnInit(): void {
    if (!this.deck) {
      this.router.navigate(['/']);
    }

    const deckImportRequestDto : DeckImportRequestDto = {
      cardNames: this.deck
    };

    this.deckAnalysisService.analyzeDeck(deckImportRequestDto).subscribe({
      next: response => this.deckAnalysis.set(response),
      error: error => console.log(error),
      complete: () => console.log("Deck analysis complete")
    });
  }
}
