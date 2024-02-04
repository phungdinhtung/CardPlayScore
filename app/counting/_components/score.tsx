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
import { GroupBonusRadio } from './BonusRadio';

export const Score = ({
	roundScores,
	setRoundScores,
}: {
	roundScores: Round[];
	setRoundScores: Dispatch<SetStateAction<Round[]>>;
}) => {
	const { players, setRoundLocal } = useLocalPlayersAndScores();
	const [scoreRound, setScoreRound] = useState<ScorePlayer>({});

	const winMoney = Math.abs(sum(Object.values(scoreRound)));

	return (
		<Dialog
			onOpenChange={() => {
				setScoreRound({});
			}}
		>
			<DialogTrigger asChild>
				<Button variant='secondary'>Tính tiền (Auto)</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Tính tiền (Auto)</DialogTitle>
				</DialogHeader>
				<section className='space-y-4'>
					{players?.map((player) => {
						const key = player?.id?.toString();
						const scorePlayer = scoreRound[`${player?.id}`];

						return (
							<div key={player?.id} className='space-y-2'>
								<Label className='text-lg font-bold'>{player?.name}</Label>
								<GroupScore
									// @ts-ignore: Unreachable code error
									value={scorePlayer?.toString() || null}
									onValueChange={(value) => {
										(Object.hasOwn(scoreRound, key) || Object.keys(scoreRound)?.length < 3) &&
											setScoreRound({
												...scoreRound,
												[key]: parseInt(value),
											});
									}}
								/>
								<div className='grid grid-cols-3 items-center gap-2'>
									<div>
										<Input
											disabled={!Object.hasOwn(scoreRound, key) && Object.keys(scoreRound)?.length >= 3}
											value={scorePlayer || ''}
											onChange={(e) => {
												if (e?.target?.value) {
													(Object.hasOwn(scoreRound, key) || Object.keys(scoreRound)?.length < 3) &&
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
										{scorePlayer > 0 && <span className='text-red-600'> Điền số âm !</span>}
									</div>
									<Button
										disabled={!Object.hasOwn(scoreRound, key) && Object.keys(scoreRound)?.length >= 3}
										onClick={() => {
											const newObject = omit(scoreRound, key);
											setScoreRound(newObject);
										}}
									>
										Xóa
									</Button>
									<span>
										Tổng tiền :
										<span className=' bg-yellow-200'>
											{Object.keys(scoreRound)?.length === 3 && !Object.hasOwn(scoreRound, key)
												? winMoney
												: scorePlayer}
										</span>
									</span>
								</div>
							</div>
						);
					})}
					<DialogClose asChild>
						<Button
							disabled={Object.keys(scoreRound)?.length < 3 || Object.values(scoreRound).some((v) => v > 0)}
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
							Money
						</Button>
					</DialogClose>
				</section>
			</DialogContent>
		</Dialog>
	);
};

export const ScoreBonus = ({
	roundScores,
	setRoundScores,
}: {
	roundScores: Round[];
	setRoundScores: Dispatch<SetStateAction<Round[]>>;
}) => {
	const { players, setRoundLocal } = useLocalPlayersAndScores();
	const [winner, setWinner] = useState<string>('');

	return (
		<Dialog
			onOpenChange={() => {
				setWinner('');
			}}
		>
			<DialogTrigger asChild>
				<Button variant='secondary'>Sâm</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sâm</DialogTitle>
				</DialogHeader>
				<section className='space-y-4'>
					<GroupBonusRadio
						players={players}
						value={winner}
						onValueChange={(value) => {
							setWinner(value);
						}}
					/>
					<DialogClose asChild>
						<Button
							onClick={() => {
								const missKey = checkMissingKeys({ [winner]: winner }, PLAYER_ID_STRING);
								const scores: ScorePlayer = missKey.reduce((acc: ScorePlayer, number) => {
									acc[number] = -20;
									return acc;
								}, {});
								const formData = [
									...roundScores,
									{
										id: roundScores?.length + 1,
										scores: {
											...scores,
											[winner]: 60,
										},
									},
								];
								setRoundLocal(formData);
								setRoundScores(formData);
							}}
							className='w-full'
							disabled={!Boolean(winner)}
						>
							Money
						</Button>
					</DialogClose>
				</section>
			</DialogContent>
		</Dialog>
	);
};
