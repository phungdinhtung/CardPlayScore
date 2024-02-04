import { Player, Round } from '@/type';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export const useLocalPlayersAndScores = () => {
	const [playerLocal] = useLocalStorage<Player[]>('players', []);
	const [roundLocal, setRoundLocal] = useLocalStorage<Round[]>('rounds', []);

	const [players, setPlayer] = useState<Player[]>([]);
	const [roundScores, setRoundScores] = useState<Round[]>([]);

	useEffect(() => {
		playerLocal && setPlayer(playerLocal);
		roundLocal && setRoundScores(roundLocal);
	}, []);

	return {
		players,
		roundLocal,
		setRoundLocal,
		roundScores,
		setRoundScores,
	};
};
