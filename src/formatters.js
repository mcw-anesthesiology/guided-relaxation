/* @flow */

export function audioTimestamp(timestampInSeconds: number): string {
	const minutes = Math.floor(timestampInSeconds / 60);
	const seconds = Math.round(timestampInSeconds % 60);

	return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
