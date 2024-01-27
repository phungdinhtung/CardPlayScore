'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PLAYER_ID_STRING } from '@/constant';
import { useLocalPlayersAndScores } from '@/hooks/useLocalPlayersAndScores';
import { checkMissingKeys } from '@/lib/utils';
import { Round, ScorePlayer } from '@/type';
import { omit, sum } from 'lodash';
import { Dispatch, SetStateAction, useState } from 'react';
import { GroupScore } from './GroupScore';

export const Score = ({ roundScores, setRoundScores }: { roundScores: Round[]; setRoundScores: Dispatch<SetStateAction<Round[]>> }) => {
	const { player, setRoundLocal } = useLocalPlayersAndScores();
	const [scoreRound, setScoreRound] = useState<ScorePlayer>({});

	const winMoney = Math.abs(sum(Object.values(scoreRound)));

	return (
		<Dialog
			onOpenChange={() => {
				setScoreRound({});
			}}
		>
			<DialogTrigger asChild>
				<Button variant='destructive'>Tính tiền</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Xin tiền</DialogTitle>
				</DialogHeader>
				<section className='space-y-4'>
					{player?.map((player) => {
						const key = player?.id?.toString();
						return (
							<div key={player?.id} className='space-y-2'>
								<Label className='text-lg font-bold'>{player?.name}</Label>
								<GroupScore
									// @ts-ignore: Unreachable code error
									value={scoreRound[`${player?.id}`]?.toString() || null}
									onValueChange={(value) => {
										Object.keys(scoreRound)?.length < 3 &&
											setScoreRound({
												...scoreRound,
												[key]: parseInt(value),
											});
									}}
								/>
								<div className='grid grid-cols-3 items-center gap-2'>
									<Input type='number' />
									<Button
										onClick={() => {
											const newObject = omit(scoreRound, key);
											setScoreRound(newObject);
										}}
									>
										Nhầm
									</Button>
									<span>
										Tổng tiền :
										<span className=' bg-yellow-200'>
											{Object.keys(scoreRound)?.length === 3 &&
											!Object.hasOwn(scoreRound, key)
												? winMoney
												: scoreRound[`${player?.id}`]}
										</span>
									</span>
								</div>
							</div>
						);
					})}
					<DialogClose asChild>
						<Button
							onClick={() => {
								const missKey = checkMissingKeys(scoreRound, PLAYER_ID_STRING)[0];
								const formData = [
									...roundScores,
									{
										id: roundScores?.length + 1,
										scores: {
											...scoreRound,
											[missKey]: winMoney,
										},
									},
								];
								setRoundLocal(formData);
								setRoundScores(formData);
							}}
							className='w-full'
						>
							Hự
						</Button>
					</DialogClose>
				</section>
			</DialogContent>
		</Dialog>
	);
};
