'use client';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLocalPlayersAndScores } from '@/hooks/useLocalPlayersAndScores';
import { Score } from './_components/score';
import { sumBy } from 'lodash';
import { cn } from '@/lib/utils';

export default function Counting() {
	const { player, roundScores, setRoundScores } = useLocalPlayersAndScores();

	return (
		<div className='bg-[#D8D9DA] min-h-screen'>
			<div className='p-4 border-2 border-b-black'>
				<Score roundScores={roundScores} setRoundScores={setRoundScores} />
			</div>
			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						{player?.map((item) => {
							const totalMoney = sumBy(roundScores, `scores[${item?.id}]`);
							return (
								<TableHead key={item?.id} className='text-center'>
									<span>{item?.name}</span>
									<span
										className={cn(
											'block',
											totalMoney > 0
												? 'text-green-500'
												: ' text-red-500',
										)}
									>
										{totalMoney}
									</span>
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>
					{roundScores?.map((item) => (
						<TableRow key={item?.id}>
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
