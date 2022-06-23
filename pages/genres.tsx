import { getGenres } from "@services/genre-service";
import { useCallback, useEffect } from "react";
import {
	IAuthenticationProps,
	withAuthenticationGuard,
} from "@components/HoC/auth-guard";
import { IRequestConfig } from "@services/common-service";
import { useData } from "@hooks/useData";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { ErrorsContainer } from "@components/ErrorHandling";

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
			{isLoading && <LoadingIndicator />}
			<div>Result: {JSON.stringify(data)}</div>
			<ErrorsContainer errors={errors} />
		</>
	);
};

export default withAuthenticationGuard(GenresPage);
