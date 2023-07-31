import * as dotenv from "dotenv";
import { AzureActiveDirectoryStack } from "./resources/azuread-stack";
import { App } from "cdktf";

dotenv.config({ path: "./envs/vsstg.env" });

const app = new App();
new AzureActiveDirectoryStack(app, "vs-kao-staging-230726");
app.synth();
