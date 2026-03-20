import { Component, OnInit } from '@angular/core';
import { ManaCurveChart } from '../mana-curve-chart/mana-curve-chart';
import { DeckAnalysisDto, ManaCurveAnalysisDto } from '../../../types/deck';

@Component({
  selector: 'app-mana-curve-detailed',
  imports: [
    ManaCurveChart
  ],
  templateUrl: './mana-curve-detailed.html',
  styleUrl: './mana-curve-detailed.css',
})
export class ManaCurveDetailed implements OnInit {
  manaCurveData: ManaCurveAnalysisDto | null = null;

  ngOnInit(): void {
    this.manaCurveData = history.state.data;
    console.log("Testing curve data");
  }

}
