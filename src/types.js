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

export type Track = {
	name: string,
	path: string,
	image?: Image,
	images?: Array<Image>
};
