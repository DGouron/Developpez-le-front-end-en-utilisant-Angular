import type { Participation } from "./Participation";

export type Olympic = {
	id: number;
	country: string;
	participations: Participation[];
};
