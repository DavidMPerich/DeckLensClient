import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { DeckSelector } from "../features/deck-selector/deck-selector";

@Component({
  selector: 'app-root',
  imports: [Nav, DeckSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  implements OnInit {
  private http = inject(HttpClient);
  protected title = 'Deck Lens';
  protected card = signal<any>([]);

  ngOnInit(): void {
    this.http.get("https://localhost:7138/api/cards/Annul").subscribe({
      next: response => this.card.set(response),
      error: error => console.log(error),
      complete: () => console.log("Request complete")
    });
  }
}