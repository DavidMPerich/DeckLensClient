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
    averageCmc: number;
    manaCurve: Record<number, number>;
    colorDistribution: Record<string, number>;
    cardTypeBreakdown: Record<string, number>;
}