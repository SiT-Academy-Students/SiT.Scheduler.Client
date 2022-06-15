import { OperationResult } from "utilities/operation-result";
import { getAsync, IRequestConfig } from "./common-service";

export function getGenres(
	config: IRequestConfig
): Promise<OperationResult<object>> {
	return getAsync("http://localhost:5120/genres", config);
}
