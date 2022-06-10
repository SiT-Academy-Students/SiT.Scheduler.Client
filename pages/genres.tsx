import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { withAuthenticationGuard } from "../components/HoC/auth-guard";

const GenresPage: NextPage = (): JSX.Element => {
	const session = useSession();
	console.log("Session", session);
	return <h1>Genres!</h1>;
};

export default withAuthenticationGuard(GenresPage);
