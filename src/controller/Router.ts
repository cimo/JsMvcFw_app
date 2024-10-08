import { Irouter, Icontroller } from "../jsmvcfw/JsMvcFwInterface";

// Source
import ControllerHome from "./Home";

export default class ControllerRouter {
    // Variable
    public dataMain: Irouter[];

    // Method
    constructor() {
        this.dataMain = [
            {
                title: "HOME",
                path: "/",
                controller: () => new ControllerHome() as unknown as Icontroller
            }
        ];
    }
}
