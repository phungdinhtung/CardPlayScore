import { unlink, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (request: NextRequest) => {
	try {
		const data = await request.formData();
		const file: File | null = data.get('file') as unknown as File;

		if (!file) {
			return NextResponse.json({ success: false });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const fileName = `${Date.now()}-${file.name}`;
		const path = `/tmp/${fileName}`;
		await writeFile(path, buffer);

		setTimeout(() => {
			unlink(path);
		}, 1000 *60);
		return NextResponse.json({ success: true, urlFile: `/doc/${fileName}` });
	} catch (error) {
		console.log('🚀 ~ error:', error); // eslint-disable-line
		return NextResponse.json({ success: false });
	}
};
