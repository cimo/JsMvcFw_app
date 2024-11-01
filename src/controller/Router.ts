import { Irouter, Icontroller } from "../jsmvcfw/JsMvcFwInterface";

// Source
import ControllerHome from "./Home";
import ControllerTest from "./Test";

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
            },
            {
                title: "TEST",
                path: "/test",
                controller: () => new ControllerTest() as unknown as Icontroller
            }
        ];
    }
}
