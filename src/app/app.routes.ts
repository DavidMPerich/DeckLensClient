import { Routes } from '@angular/router';
import { DeckSelector } from '../features/deck-selector/deck-selector';
import { DeckAnalysisDashboard } from '../features/deck-analysis-dashboard/deck-analysis-dashboard';

export const routes: Routes = [
    { path: '', component: DeckSelector},
    { path: 'metrics', component: DeckAnalysisDashboard },
    { path: '**', redirectTo: '' }
];
