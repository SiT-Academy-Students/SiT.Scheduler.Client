import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoadingIndicatorComponent = (): JSX.Element => {
	return (
		<Box
			sx={(theme) => ({ textAlign: "center", padding: theme.spacing(2) })}
		>
			<CircularProgress />
		</Box>
	);
};

export const LoadingIndicator = React.memo(LoadingIndicatorComponent);
