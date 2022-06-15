import { useRequest } from "@hooks/useRequest";
import { getGenres } from "@services/genre-service";
import { useCallback, useEffect } from "react";
import {
	IAuthenticationProps,
	withAuthenticationGuard,
} from "@components/HoC/auth-guard";
import { IRequestConfig } from "@services/common-service";

const GenresPage = ({ session }: IAuthenticationProps): JSX.Element => {
	const gg = useCallback(
		(abortSignal: AbortSignal) => {
			const config: IRequestConfig = {
				abortSignal,
				accessToken: session.accessToken,
			};
			return getGenres(config);
		},
		[session]
	);
	const x = useRequest(gg);

	useEffect((): void => {
		x.executeAsync().then(console.log);
	});
	return <h1>Genres!</h1>;
};

export default withAuthenticationGuard(GenresPage);
