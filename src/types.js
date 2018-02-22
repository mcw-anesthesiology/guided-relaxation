/* @flow */

type SrcImage = {
	src: string
};

type SrcsetImage = {
	srcset: string
};

type BaseImage = {
	alt?: string
};

type Image = BaseImage & (SrcImage | SrcsetImage);

type ID = number | string;

export type Track = {
	id: ID,
	name: string,
	path: string,
	image?: Image,
	images?: Array<Image>
};

export type Tracklist = {
	id: ID,
	name: string,
	tracks: Array<Track>
};
