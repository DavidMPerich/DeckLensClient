import { Component, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deck-selector',
  imports: [],
  templateUrl: './deck-selector.html',
  styleUrl: './deck-selector.css',
})
export class DeckSelector {
  private router = inject(Router);
  private clipboard = inject(Clipboard);
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
}
