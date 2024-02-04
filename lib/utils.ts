import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import _ from 'lodash';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function checkMissingKeys(obj: Object, keyList: Array<string>) {
	const objectKeys = Object.keys(obj);
	const missingKeys = _.difference(keyList, objectKeys);
	return missingKeys;
}

export async function getRandomCatImageUrl() {
	try {
		const response = await axios.get('https://api.thecatapi.com/v1/images/search');
		const imageUrl = response.data[0].url;

		return imageUrl;
	} catch (error) {
		return null;
	}
}
