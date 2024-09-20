export type Data = {
	name: string;
	value: number;
	extra?: any;
};

export type Series = {
	name: string;
	series: Data[];
};
