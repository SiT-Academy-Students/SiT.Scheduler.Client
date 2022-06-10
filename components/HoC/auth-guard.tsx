import { useSession } from "next-auth/react";
import React from "react";

export function withAuthenticationGuard<TProps>(
	Component: React.ComponentType<TProps>
): React.ComponentType<TProps> {
	const ComponentWithAuthenticationGuard = (props: TProps): JSX.Element => {
		const session = useSession();

		if (session.status === "loading") {
			return <h1>Still loading</h1>;
		} else if (session.status === "unauthenticated") {
			return <UnauthorizedScreen />;
		} else return <Component {...props} />;
	};

	return ComponentWithAuthenticationGuard;
}

const UnauthorizedScreenComponent = (): JSX.Element => {
	return (
		<h1>You should be authenticated in order to access this resource.</h1>
	);
};
const UnauthorizedScreen = React.memo(UnauthorizedScreenComponent);
