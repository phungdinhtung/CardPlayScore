export interface Player {
	id: number;
	name: string;
}

// export type ScorePlayer = Player & {
// 	money: number;
// };
export type ScorePlayer = { [key: string]: number };

export interface Round {
	id: number;
	scores: ScorePlayer;
}
