import { inputs } from "./inputs";
import { resolvers } from "./resolvers";
import { types } from "./types";

export const typeDefs = `${types} ${inputs} ${resolvers}`;