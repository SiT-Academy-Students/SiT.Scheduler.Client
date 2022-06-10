import Axios from "axios";

export async function getGenres(
	accessToken: string,
	abortController: AbortController
): Promise<object> {
	const url = "http://localhost:5120/genres";
	const result = await Axios.get(url, {
		headers: { Authorization: `Bearer ${accessToken}` },
		signal: abortController.signal,
	});
	return result;
}
