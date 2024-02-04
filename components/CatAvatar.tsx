import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRandomCatImageUrl } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const CatAvatar = () => {
	const [url, setUrl] = useState('https://github.com/shadcn.png');

	useEffect(() => {
		getRandomCatImageUrl().then((url) => {
			if (url) {
				setUrl(url);
			} else {
				console.log('Failed to fetch a random meme.');
			}
		});
	}, []);
	
	return (
		<Avatar className='m-auto w-20 h-20'>
			<AvatarImage src={url} />
			<AvatarFallback>CN</AvatarFallback>
		</Avatar>
	);
};
