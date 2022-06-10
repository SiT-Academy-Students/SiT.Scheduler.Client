import { useCallback, useRef } from "react";

interface IRequestTrigger<TData> {
	executeAsync: () => Promise<IRequestResult<TData>>;
}

interface IRequestResult<TData> {
	data: TData;
	isActive: boolean;
}

export function useRequest<TData>(
	request: (abortControler: AbortController) => Promise<TData>
): IRequestTrigger<TData> {
	const latestAbortController = useRef<AbortController>();
	const executeCallback = useCallback(async (): Promise<
		IRequestResult<TData>
	> => {
		if (latestAbortController.current)
			latestAbortController.current.abort();

		const currentAbortController = new AbortController();
		latestAbortController.current = currentAbortController;
		const result = await request(currentAbortController);

		return {
			data: result,
			isActive: !currentAbortController.signal.aborted,
		};
	}, [request]);

	return {
		executeAsync: executeCallback,
	};
}
