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
	const getGenresRequest = useRequest(getGenresApiCall);

	// Extract common state in a different hook and pass an argument so the `genres data accessor` is independent of stateand can be used safely as a dependency to `useEffect`.
	const genresDataAccessor = useData(getGenresRequest);

	useEffect((): void => {
		genresDataAccessor.executeAction();
	}, []);

	console.log(genresDataAccessor);
	return (
		<>
			<div>
				Is loading: {genresDataAccessor.isLoading ? "True" : "False"}
			</div>
			<div>Errors: {genresDataAccessor.errors.map((e) => e.message)}</div>
			<div>Result: {JSON.stringify(genresDataAccessor.data)}</div>
		</>
	);
};

export default withAuthenticationGuard(GenresPage);
