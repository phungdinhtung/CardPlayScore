'use client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLocalPlayersAndScores } from '@/hooks/useLocalPlayersAndScores';
import { cn } from '@/lib/utils';
import { sumBy } from 'lodash';
import { useState } from 'react';
import { SpecialScore } from './_components/SpecialScore';
import { Score, ScoreBonus } from './_components/score';
import { CatAvatar } from '@/components/CatAvatar';
import { ResetDialog } from './_components/ResetDialog';

export default function Counting() {
	const { players, roundScores, setRoundScores } = useLocalPlayersAndScores();
	const [selectedId, setSelectedId] = useState<number>();

	return (
		<div className='bg-[#D8D9DA] min-h-screen'>
			<div className='flex justify-center p-2 gap-4'>
				<Button variant='secondary'>Tổng số ván : {roundScores?.length || 0}</Button>
				<ResetDialog />
			</div>
			<div className='p-4 border-2 border-b-black border-t-black space-x-4'>
				<Score roundScores={roundScores} setRoundScores={setRoundScores} />
				<ScoreBonus roundScores={roundScores} setRoundScores={setRoundScores} />
				<SpecialScore
					selectedId={selectedId}
					setSelectedId={setSelectedId}
					roundScores={roundScores}
					setRoundScores={setRoundScores}
				/>
			</div>
			<Table>
				<TableCaption>
					Kẻ không đánh là kẻ thắng. <br /> Kẻ thắng là kẻ không thua {':))'}
				</TableCaption>
				<TableHeader>
					<TableRow>
						{players?.map((item) => {
							const totalMoney = sumBy(roundScores, `scores[${item?.id}]`);
							return (
								<TableHead key={item?.id} className='text-center text-xl p-2'>
									<CatAvatar />
									<span>{item?.name}</span>
									<Button className={cn('block w-full', totalMoney > 0 ? 'text-green-500' : ' text-red-500')}>
										{totalMoney}
									</Button>
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{roundScores?.map((item) => (
						<TableRow key={item?.id} onClick={() => setSelectedId(item?.id)}>
							<TableCell className='text-center font-bold'>{item?.scores['1']}</TableCell>
							<TableCell className='text-center font-bold'>{item?.scores['2']}</TableCell>
							<TableCell className='text-center font-bold'>{item?.scores['3']}</TableCell>
							<TableCell className='text-center font-bold'>{item?.scores['4']}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
