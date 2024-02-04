'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Player } from '@/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';

export default function Home() {
	const [value, setValue, remove] = useLocalStorage<Player[]>('players');
	const [bro1, setBro1] = useState<string>('');
	const [bro2, setBro2] = useState<string>('');
	const [bro3, setBro3] = useState<string>('');
	const [bro4, setBro4] = useState<string>('');
	const router = useRouter();

	return (
		<main className='flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-300'>
			<span> Cờ bạc Định Công</span>
			<span> Bấm vào lá bài để bắt đầu chiến</span>
			<Dialog>
				<DialogTrigger>
					<Image className='animate-bounce' src='/poker.png' alt='Next.js Logo' width={100} height={37} priority />
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ghi tên những người anh em của bạn</DialogTitle>
					</DialogHeader>
					<section className='space-y-4'>
						<div>
							<Label>Tên Bro 1</Label>
							<Input value={bro1} onChange={(e) => setBro1(e?.target?.value)} />
						</div>
						<div>
							<Label>Tên Bro 2</Label>
							<Input value={bro2} onChange={(e) => setBro2(e?.target?.value)} />
						</div>
						<div>
							<Label>Tên Bro 3</Label>
							<Input value={bro3} onChange={(e) => setBro3(e?.target?.value)} />
						</div>
						<div>
							<Label>Tên Bro 4</Label>
							<Input value={bro4} onChange={(e) => setBro4(e?.target?.value)} />
						</div>
						<Button
							onClick={() => {
								setValue([
									{
										id: 1,
										name: bro1,
									},
									{
										id: 2,
										name: bro2,
									},
									{
										id: 3,
										name: bro3,
									},
									{
										id: 4,
										name: bro4,
									},
								]);
								router?.push('/counting');
							}}
							className='w-full'
						>
							Chiến thôi
						</Button>
					</section>
				</DialogContent>
			</Dialog>
			<span>By Phùng Tùng</span>
		</main>
	);
}
