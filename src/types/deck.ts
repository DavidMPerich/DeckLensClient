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
    commander: CardDto;
    totalCards: number;
    summary: DeckSummaryDto;
    manaCurveAnalysis: ManaCurveAnalysisDto;
}

export type DeckSummaryDto = {
    manaCurvePreview: Record<number, number>;
}

export type ManaCurveAnalysisDto = {
    averageCmc: number;
    byCmc: Record<number, number>;
}