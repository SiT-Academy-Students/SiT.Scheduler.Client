import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
	const session = useSession();

	if (session.status === "authenticated") {
		console.log("You are authenticated", session.data);
		return <button onClick={() => signOut()}>Sign out</button>;
	} else if (session.status === "unauthenticated") {
		console.log("You should log in", session.data);
		return <button onClick={() => signIn()}>Sign in</button>;
	}
	return <h1>Hello, everybody!</h1>;
};

export default Home;
