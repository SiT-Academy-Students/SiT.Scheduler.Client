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
import { DataGrid, GridColDef, GridColumns } from "@mui/x-data-grid";
import { IGenre } from "@models/IGenre";
import { Box } from "@mui/material";

const columns: GridColDef<IGenre>[] = [
	{ field: "name", headerName: "Name", width: 200 },
	{
		field: "description",
		headerName: "Description",
		width: 400,
	},
];

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
			{data && (
				<Box
					sx={(theme) => ({
						height: "60vh",
						my: theme.spacing(5),
					})}
				>
					<DataGrid
						sx={{
							width: "80vw",
							mx: "auto",
						}}
						columns={columns}
						rows={data}
					/>
				</Box>
			)}
			<ErrorsContainer errors={errors} />
		</>
	);
};

export default withAuthenticationGuard(GenresPage);
