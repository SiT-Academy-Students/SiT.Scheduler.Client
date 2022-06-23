import { OperationResult } from "utilities/operation-result";

export type Request<TData> = (
	abortSignal: AbortSignal
) => Promise<OperationResult<TData>>;
