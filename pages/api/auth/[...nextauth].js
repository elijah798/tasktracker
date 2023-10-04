import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { XataAdapter } from "@next-auth/xata-adapter"
import { getXataClient } from "../../../src/xata";


const client = getXataClient();

export const authOptions = {
    adapter: XataAdapter(client),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
    ],

}

export default NextAuth(authOptions)