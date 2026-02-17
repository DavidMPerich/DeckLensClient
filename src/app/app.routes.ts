import { Routes } from '@angular/router';
import { DeckSelector } from '../features/deck-selector/deck-selector';
import { DeckMetrics } from '../features/deck-metrics/deck-metrics';

export const routes: Routes = [
    { path: '', component: DeckSelector},
    { path: 'metrics', component: DeckMetrics },
    { path: '**', redirectTo: '' }
];
