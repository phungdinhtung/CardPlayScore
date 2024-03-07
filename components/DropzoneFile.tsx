import { cn } from '@/lib/utils';
import React from 'react';
import { useDropzone } from 'react-dropzone';

const DropzoneFile = () => {
	const [urlFile, setUrlFile] = React.useState<string>('');
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop: async (acceptedFiles) => {
			if (!acceptedFiles[0]) return;

			try {
				const data = new FormData();
				data.set('file', acceptedFiles[0]);

				const res: {
					urlFile: string;
					success: boolean;
				} = await fetch('/api/upload', {
					method: 'POST',
					body: data,
				}).then((response) => response.json());

				if (!res.success) throw new Error('Something went wrong');
				setUrlFile(res?.urlFile);
			} catch (e: any) {
				// console.error(e);
			}
		},
		accept: {
			'application/msword': ['.doc'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
		},
		multiple: false,
	});

	return (
		<>
			<div
				{...getRootProps()}
				className={cn(['border border-primary-color p-3 rounded-md shadow-sm border-dashed text-sm w-60'])}
			>
				<input {...getInputProps()} />
				{isDragActive ? <p>Drop the word file here ...</p> : <p>Drag drop word file here, or click to select file</p>}
			</div>
			{/* {urlFile && (
				<iframe
					className='w-full h-[calc(100vh-200px)]'
					src={`https://view.officeapps.live.com/op/embed.aspx?src=${window.location.origin + urlFile}`}
				></iframe>
			)} */}
		</>
	);
};
export default DropzoneFile;
