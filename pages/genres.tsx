import { useRequest } from "@hooks/useRequest";
import { getGenres } from "@services/genre-service";
import { useCallback, useEffect } from "react";
import {
	IAuthenticationProps,
	withAuthenticationGuard,
} from "@components/HoC/auth-guard";
import { IRequestConfig } from "@services/common-service";
import { useData } from "@hooks/useData";

const GenresPage = ({ session }: IAuthenticationProps): JSX.Element => {
	const getGenresApiCall = useCallback(
		(abortSignal: AbortSignal) => {
			const config: IRequestConfig = {
				abortSignal,
				accessToken: session.accessToken,
			};
			return getGenres(config);
		},
		[session]
	);
	const { executeAction, isLoading, errors, data } =
		useData(getGenresApiCall);

	useEffect((): void => {
		executeAction();
	}, [executeAction]);

	return (
		<>
			<div>Is loading: {isLoading ? "True" : "False"}</div>
			<div>Errors: {errors.map((e) => e.message)}</div>
			<div>Result: {JSON.stringify(data)}</div>
		</>
	);
};

export default withAuthenticationGuard(GenresPage);
