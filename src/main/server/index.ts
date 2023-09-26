import { setupRest } from "@/main/rest";
import { setupGraphQL } from "@/main/graphql";
import express from "express";

export const setupServer = () => {
	const initExpress = express();

	setupRest(initExpress);
	setupGraphQL(initExpress);

	return initExpress;
};