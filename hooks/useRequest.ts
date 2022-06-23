import { useCallback, useMemo, useRef } from "react";
import { Request } from "@hooks/types/Request";
import { OperationResult } from "@utilities/operation-result";

export interface IRequestTrigger<TData> {
	executeAsync: () => Promise<IRequestResult<TData>>;
}

export interface IRequestResult<TData> {
	data: OperationResult<TData>;
	isActive: boolean;
}

export function useRequest<TData>(
	request: Request<TData>
): IRequestTrigger<TData> {
	const latestAbortController = useRef<AbortController>();
	const executeCallback = useCallback(async (): Promise<
		IRequestResult<TData>
	> => {
		if (latestAbortController.current)
			latestAbortController.current.abort();

		const currentAbortController = new AbortController();
		latestAbortController.current = currentAbortController;
		const result = await request(currentAbortController.signal);

		return {
			data: result,
			isActive: !currentAbortController.signal.aborted,
		};
	}, [request]);

	const trigger = useMemo(
		(): IRequestTrigger<TData> => ({ executeAsync: executeCallback }),
		[executeCallback]
	);
	return trigger;
}
