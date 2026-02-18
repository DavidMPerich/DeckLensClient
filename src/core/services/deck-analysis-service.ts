import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DeckAnalysisDto, DeckImportRequestDto } from '../../types/deck';

@Injectable({
  providedIn: 'root',
})
export class DeckAnalysisService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  analyzeDeck(deck: DeckImportRequestDto) {
    console.log(this.baseUrl);
    return this.http.post<DeckAnalysisDto>(this.baseUrl + 'decks/analyze', deck);
  }
}
