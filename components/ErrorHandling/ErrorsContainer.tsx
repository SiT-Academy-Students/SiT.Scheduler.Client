import { Alert, Box } from "@mui/material";
import { normalizeArray } from "@utilities/arrays";
import { IRequestError } from "@utilities/operation-result";
import React, { useMemo } from "react";

interface IErrorsContainerProps {
	errors: IRequestError[];
}

const ErrorsContainerComponent = ({
	errors,
}: IErrorsContainerProps): JSX.Element => {
	const normalizedErrors = useMemo(() => normalizeArray(errors), [errors]);

	return (
		<Box
			sx={(theme) => ({
				display: "flex",
				flexDirection: "column",
				rowGap: theme.spacing(1),
				padding: theme.spacing(2),
			})}
		>
			{normalizedErrors.map((error, index) => (
				<Alert key={index} variant="filled" severity="error">
					{error.message}
				</Alert>
			))}
		</Box>
	);
};

export const ErrorsContainer = React.memo(ErrorsContainerComponent);
