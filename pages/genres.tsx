import { useRequest } from "@hooks/useRequest";
import { getGenres } from "@services/genre-service";
import { NextPage } from "next";
import { useCallback, useEffect } from "react";
import {
	IAuthenticationProps,
	withAuthenticationGuard,
} from "../components/HoC/auth-guard";

const GenresPage = ({ session }: IAuthenticationProps): JSX.Element => {
	const gg = useCallback(
		(abortController: AbortController) => {
			return getGenres(session.accessToken, abortController);
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
