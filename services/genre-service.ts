import { IGenre } from "@models/IGenre";
import { OperationResult } from "utilities/operation-result";
import { getAsync, IRequestConfig } from "./common-service";

export function getGenres(
	config: IRequestConfig
): Promise<OperationResult<IGenre>> {
	return getAsync<IGenre>("http://localhost:5120/genres", config);
}
