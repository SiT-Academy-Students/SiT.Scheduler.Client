export interface IRequestError {
	message: string;
}

export type OperationResult<TData = never> = {
	isSuccessful: boolean;
	errors: IRequestError[];
} & ([TData] extends [never] ? {} : { data: TData | undefined });
