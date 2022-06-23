import { IIdentifiable } from "@models/common/IIdentifiable";

export interface IGenre extends IIdentifiable {
	name: string;
	description: string;
}
