'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalPlayersAndScores } from '@/hooks/useLocalPlayersAndScores';
import { Round, ScorePlayer } from '@/type';
import { omit } from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const SpecialScore = ({
	roundScores,
	setRoundScores,
	selectedId,
	setSelectedId,
}: {
	roundScores: Round[];
	setRoundScores: Dispatch<SetStateAction<Round[]>>;
	selectedId?: number;
	setSelectedId: Dispatch<SetStateAction<number | undefined>>;
}) => {
	const { players, setRoundLocal } = useLocalPlayersAndScores();
	const [scoreRound, setScoreRound] = useState<ScorePlayer>({});
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		selectedId && setScoreRound(roundScores?.find((round) => round?.id === selectedId)?.scores || {});
	}, [selectedId]);

	return (
		<Dialog
			open={Boolean(selectedId) || open}
			onOpenChange={(e) => {
				setOpen(e);
				setSelectedId(undefined);
				setScoreRound({});
			}}
		>
			<DialogTrigger asChild>
				<Button variant='secondary'>Tính tiền (Đặc biệt)</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tính tiền (Đặc biệt)</DialogTitle>
				</DialogHeader>
				<section className='space-y-4'>
					{players?.map((player) => {
						const key = player?.id?.toString();
						const scorePlayer = scoreRound[`${player?.id}`];

						return (
							<div key={player?.id} className='space-y-2'>
								<Label className='text-lg font-bold'>{player?.name}</Label>
								<div className='grid grid-cols-3 items-center gap-2'>
									<div>
										<Input
											value={scorePlayer}
											onChange={(e) => {
												if (e?.target?.value) {
													setScoreRound({
														...scoreRound,
														[key]: parseInt(e?.target?.value),
													});
												} else {
													const newObject = omit(scoreRound, key);
													setScoreRound(newObject);
												}
											}}
											type='number'
										/>
									</div>
									<span>
										Tổng tiền :<span className=' bg-yellow-200'>{scorePlayer}</span>
									</span>
								</div>
							</div>
						);
					})}
					<DialogClose asChild>
						<Button
							disabled={Object.keys(scoreRound)?.length <= 3}
							onClick={() => {
								let formData: Round[];
								if (selectedId) {
									formData = roundScores.map((value, index) =>
										index === selectedId - 1
											? {
													id: selectedId,
													scores: scoreRound,
											  }
											: value,
									);
								} else {
									formData = [
										...roundScores,
										{
											id: roundScores?.length + 1,
											scores: {
												...scoreRound,
											},
										},
									];
								}
								setRoundLocal(formData);
								setRoundScores(formData);
							}}
							className='w-full'
						>
							Money
						</Button>
					</DialogClose>
				</section>
			</DialogContent>
		</Dialog>
	);
};
