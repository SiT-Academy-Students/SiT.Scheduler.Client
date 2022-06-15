import { useCallback, useRef, useState } from "react";
import { IRequestError, OperationResult } from "utilities/operation-result";
import { IRequestTrigger } from "./useRequest";

export function useData<TData>(
	requestTrigger: IRequestTrigger<OperationResult<TData>>
) {
	// const isInitialEffect = useRef<boolean>(true);
	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState<IRequestError[]>([]);
	const [data, setData] = useState<TData | undefined>(undefined);

	const executeActionInternally = useCallback(async (): Promise<void> => {
		// if (isInitialEffect) {
		// isInitialEffect.current = false;
		// } else {
		setIsLoading(true);
		setErrors([]);
		setData(undefined);
		// }

		const requestResult = await requestTrigger.executeAsync();
		if (!requestResult.isActive) return;

		setIsLoading(false);
		if (!requestResult.data.isSuccessful)
			setErrors(requestResult.data.errors);
		else setData(requestResult.data.data);
	}, [requestTrigger]);

	return { isLoading, errors, data, executeAction: executeActionInternally };
}
