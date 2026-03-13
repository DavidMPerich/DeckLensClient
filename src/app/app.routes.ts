import { Routes } from '@angular/router';
import { DeckSelector } from '../features/deck-selector/deck-selector';
import { DeckAnalysisDashboard } from '../features/deck-analysis-dashboard/deck-analysis-dashboard';
import { Component } from '@angular/core';
import { ManaCurveDetailed } from '../features/metric-detailed/mana-curve-detailed/mana-curve-detailed';

export const routes: Routes = [
    { path: '', component: DeckSelector},
    { path: 'deck-analysis',
        children: [
            { path: '', component: DeckAnalysisDashboard },
            { path: 'mana-curve', component: ManaCurveDetailed },
        ]
     },
    { path: '**', redirectTo: '' }
];
