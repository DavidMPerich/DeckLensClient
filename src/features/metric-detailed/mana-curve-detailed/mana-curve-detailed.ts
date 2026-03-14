import { Component, OnInit } from '@angular/core';
import { ManaCurveChart } from '../mana-curve-chart/mana-curve-chart';
import { DeckAnalysisDto } from '../../../types/deck';

@Component({
  selector: 'app-mana-curve-detailed',
  imports: [
    ManaCurveChart
  ],
  templateUrl: './mana-curve-detailed.html',
  styleUrl: './mana-curve-detailed.css',
})
export class ManaCurveDetailed implements OnInit {
  analysis!: DeckAnalysisDto;

  ngOnInit(): void {
    this.analysis = history.state.analysis;
  }

}
