export type Data = {
	name: string;
	value: number;
	extra?: { id: number };
};

export type Series = {
	name: string;
	series: Data[];
};
