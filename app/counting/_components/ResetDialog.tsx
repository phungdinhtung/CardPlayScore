'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const ResetDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive'>Chơi lại từ đầu</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chơi lại từ đầu</DialogTitle>
				</DialogHeader>
				<div>Bạn có chắc muốn chơi lại không ?</div>
				<section className=' space-x-10'>
					<Button
						onClick={() => {
							localStorage.removeItem('players');
							localStorage.removeItem('rounds');
							window.location.href = '/';
						}}
						variant='destructive'
					>
						Chơi lại
					</Button>
					<DialogClose asChild>
						<Button>Chơi tiếp</Button>
					</DialogClose>
				</section>
			</DialogContent>
		</Dialog>
	);
};
