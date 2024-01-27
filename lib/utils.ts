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
