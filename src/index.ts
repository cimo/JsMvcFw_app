import { mainInit, routerInit } from "jsmvcfw/dist/";

// Source
import router from "./router";

mainInit(true, "/");

const routerApp = router();
routerInit(routerApp);
