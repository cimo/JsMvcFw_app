import { mainInit } from "@cimo/jsmvcfw/dist/JsMvcFw";
import { routerInit } from "@cimo/jsmvcfw/dist/JsMvcFwRouter";

// Source
import ControllerRouter from "../controller/Router";

mainInit(true, "/", "jsmvcfw_app");

const controllerRouter = new ControllerRouter();

routerInit(controllerRouter.dataMain);
