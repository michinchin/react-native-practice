
export interface Player{
    id: number,
    turn: boolean,
    hand: [Card],
    winner: boolean
};

export interface Card {
    rank: number,
    suit: string,
}