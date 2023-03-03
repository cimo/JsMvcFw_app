import { mainInit, routerInit } from "jsmvcfw";

// Source
import router from "@/router";

mainInit(true);
routerInit(router());
