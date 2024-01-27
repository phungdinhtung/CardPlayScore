import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RadioGroupProps } from '@radix-ui/react-radio-group';

export const GroupScore: React.FC<RadioGroupProps> = (props) => {
	return (
		<RadioGroup className='grid grid-cols-11' {...props}>
			<RadioGroupItem value='0'>0</RadioGroupItem>
			<RadioGroupItem value='-1'>-1</RadioGroupItem>
			<RadioGroupItem value='-2'>-2</RadioGroupItem>
			<RadioGroupItem value='-3'>-3</RadioGroupItem>
			<RadioGroupItem value='-4'>-4</RadioGroupItem>
			<RadioGroupItem value='-5'>-5</RadioGroupItem>
			<RadioGroupItem value='-6'>-6</RadioGroupItem>
			<RadioGroupItem value='-7'>-7</RadioGroupItem>
			<RadioGroupItem value='-8'>-8</RadioGroupItem>
			<RadioGroupItem value='-9'>-9</RadioGroupItem>
			<RadioGroupItem value='-15'>-15</RadioGroupItem>
		</RadioGroup>
	);
};
