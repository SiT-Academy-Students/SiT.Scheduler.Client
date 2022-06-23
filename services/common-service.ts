import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IRequestError, OperationResult } from "utilities/operation-result";

export interface IRequestConfig {
	accessToken?: string;
	abortSignal: AbortSignal;
}

export interface IExtendedRequestConfig extends IRequestConfig {
	params?: unknown;
}

export function getAsync<TResult>(
	url: string,
	config: IExtendedRequestConfig
): Promise<OperationResult<TResult>> {
	return executeAsync(() =>
		Axios.get<TResult>(url, mapConfiguration(config))
	);
}

export function postAsync<TBody, TResult>(
	url: string,
	body: TBody,
	config: IExtendedRequestConfig
): Promise<OperationResult<TResult>> {
	return executeAsync(() =>
		Axios.post<TResult>(url, body, mapConfiguration(config))
	);
}

export function putAsync<TBody, TResult>(
	url: string,
	body: TBody,
	config: IExtendedRequestConfig
): Promise<OperationResult<TResult>> {
	return executeAsync(() =>
		Axios.put<TResult>(url, body, mapConfiguration(config))
	);
}

export function deleteAsync<TResult>(
	url: string,
	config: IExtendedRequestConfig
): Promise<OperationResult<TResult>> {
	return executeAsync(() =>
		Axios.delete<TResult>(url, mapConfiguration(config))
	);
}

async function executeAsync<TResult>(
	request: () => Promise<AxiosResponse<TResult>>
): Promise<OperationResult<TResult>> {
	let operationResult: OperationResult<TResult>;

	try {
		const result = await request();
		operationResult = { isSuccessful: true, errors: [], data: result.data };
	} catch (e) {
		let errors: IRequestError[];
		if (e instanceof AxiosError) errors = extractErrors(e);
		else errors = [{ message: "Something wrong happened!" }];

		operationResult = { isSuccessful: false, errors };
	}

	return operationResult;
}

function mapConfiguration(config: IExtendedRequestConfig): AxiosRequestConfig {
	const axiosConfig: AxiosRequestConfig = {};

	if (!config) return axiosConfig;
	if (config.accessToken)
		axiosConfig.headers = { Authorization: `Bearer ${config.accessToken}` };
	if (config.abortSignal) axiosConfig.signal = config.abortSignal;

	return axiosConfig;
}

function extractErrors(error: AxiosError): IRequestError[] {
	if (!error) return [];

	if (error.response && error.response.data) {
		// @ts-ignore
		return [{ message: error.response.data["detail"] }];
	}
	if (error.request) return [{ message: "No response was received." }];
	return [{ message: "Unexpected error occurred." }];
}
