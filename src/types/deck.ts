export type CardDto = {
    cardName: string;
    manaCost?: string;
    convertedManaCost?: number;
    typeLine: string;
    oracleText?: string;
    power?: string;
    toughness?: string;
    colors: string[];
    colorIdentity: string[];
    keywords: string[];
    rarity: string;
    edhRecRank?: number;
    imageUri?: string;
}

export type DeckImportRequestDto = {
    cardNames: string;
}

export type DeckAnalysisDto = {
    summary: DeckSummaryDto;
    manaCurveAnalysis: ManaCurveAnalysisDto;
}

export type DeckSummaryDto = {
    commander: CardDto;
    totalCards: number;
    manaCurvePreview: Record<number, number>;
}

export type ManaCurveAnalysisDto = {
    metrics: ManaCurveMetricsDto;
    charts: ManaCurveChartBreakdownsDto;
}

export type ManaCurveMetricsDto = {
    averageCmc: number;
    medianCmc: number;
    curvePeak: number;
    earlyGameDensity: number;
}

export type ManaCurveChartBreakdownsDto = {
    byCmc: ManaCurveChartDto;
    byColor: ManaCurveChartDto;
    byType: ManaCurveChartDto;
    byCreatureSplit: ManaCurveChartDto;
}

export type ManaCurveChartDto = {
    categories: number[];
    series: StackedSeriesDto[];
}

export type StackedSeriesDto = {
    name: string;
    data: number[];
}