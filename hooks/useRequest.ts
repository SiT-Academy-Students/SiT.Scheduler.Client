import { useCallback, useRef } from "react";

export interface IRequestTrigger<TData> {
	executeAsync: () => Promise<IRequestResult<TData>>;
}

export interface IRequestResult<TData> {
	data: TData;
	isActive: boolean;
}

export function useRequest<TData>(
	request: (abortSignal: AbortSignal) => Promise<TData>
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

	return {
		executeAsync: executeCallback,
	};
}
