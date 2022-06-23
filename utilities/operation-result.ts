export interface IRequestError {
	message: string;
}

export type OperationResult<TData = never> = {
	isSuccessful: boolean;
	errors: IRequestError[];
	data?: TData | undefined;
};
