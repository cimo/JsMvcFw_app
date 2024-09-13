import { mainInit } from "../jsmvcfw/JsMvcFw";
import { routerInit } from "../jsmvcfw/JsMvcFwRouter";

// Source
import ControllerRouter from "../controller/Router";

mainInit(true, "/");

const controllerRouter = new ControllerRouter();

routerInit(controllerRouter.dataMain);
