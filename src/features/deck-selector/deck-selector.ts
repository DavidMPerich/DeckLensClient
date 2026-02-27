import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-selector',
  imports: [],
  templateUrl: './deck-selector.html',
  styleUrl: './deck-selector.css',
})
export class DeckSelector {
  private router = inject(Router);
  private http = inject(HttpClient);
  protected deck = '';

  async importDeck() {
    const text = await navigator.clipboard.readText();
    this.deck = text;
  }

  analyze() {
    this.router.navigate(['/metrics'], {
      state: { deck: this.deck }
    });
  }

  test() {
    this.http.get('/test-deck.txt', { responseType: 'text' })
      .subscribe({
        next: (text) => {
          console.log('Loaded test deck chars:', text.length);
          this.deck = text;
          this.analyze();
        },
        error: (err) => {
          console.error('Failed to load test deck:', err);
        }
      });
  }
}
