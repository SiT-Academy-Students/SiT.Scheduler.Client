interface IArrayNormalizationConfig {
	includeFaulty?: boolean;
}

export function normalizeArray<T>(
	array: T[],
	config?: IArrayNormalizationConfig
): T[] {
	if (!array || !Array.isArray(array)) return [];
	if (!config?.includeFaulty) return array.filter((el) => !!el);
	return array;
}
