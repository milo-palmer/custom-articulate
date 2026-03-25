export type CardType = {
    _type: string;
    _id: string;
    person: string;
    world: string;
    object: string;
    action: string;
    nature: string;
    random: string;
    allplay: string;
};

export type CardTypeWithoutId = Omit<CardType, "_id">;

export type ValidationType = {
    person: string;
    world: string;
    object: string;
    action: string;
    nature: string;
    random: string;
};

export type ContextType = {
    skip: number | null;
    setSkip: (number: number | null) => void;
    hasSkipped: boolean;
    setHasSkipped: (boolean: boolean) => void;
    currentIndex: number | null;
    setCurrentIndex: (number: number) => void;
    cardHistory: string[];
    setCardHistory: (value: string[] | ((prev: string[]) => string[])) => void;
};
