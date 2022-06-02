import NextAuth, { Awaitable, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

export default NextAuth({
	providers: [
		AzureADB2CProvider({
			tenantId: process.env.AZURE_AD_B2C_TENANT_NAME ?? "",
			clientId: process.env.AZURE_AD_B2C_CLIENT_ID ?? "",
			clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET ?? "",
			primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW ?? "",
			authorization: {
				params: {
					scope: `${process.env.AZURE_AD_B2C_SCOPE} offline_access openid`,
				},
			},
		}),
	],
	callbacks: {
		session: (params): Awaitable<Session> => {
			return { ...params.session, accessToken: params.token.accessToken };
		},
		jwt: (params): Awaitable<JWT> => {
			if (params.account?.access_token)
				params.token.accessToken = params.account.access_token;

			return params.token;
		},
	},
});
