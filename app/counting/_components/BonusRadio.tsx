import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLocalPlayersAndScores } from '@/hooks/useLocalPlayersAndScores';
import { Player } from '@/type';
import { RadioGroupProps } from '@radix-ui/react-radio-group';

export const GroupBonusRadio: React.FC<
	RadioGroupProps & {
		players: Player[];
	}
> = ({ players, ...props }) => {
	return (
		<RadioGroup className='grid grid-cols-2' {...props}>
			{players?.map((player) => {
				const key = player?.id?.toString();
				return (
					<RadioGroupItem key={key} className='w-full h-20' value={key}>
						{player?.name}
					</RadioGroupItem>
				);
			})}
		</RadioGroup>
	);
};
