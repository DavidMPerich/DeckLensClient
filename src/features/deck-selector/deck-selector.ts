import { Component, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-deck-selector',
  imports: [],
  templateUrl: './deck-selector.html',
  styleUrl: './deck-selector.css',
})
export class DeckSelector {
  private clipboard = inject(Clipboard);
  protected deck = '';

  async importDeck() {
    const text = await navigator.clipboard.readText();

    this.deck = text;
  }

  analyze() {
    // Analyze the deck and display results
  }
}
