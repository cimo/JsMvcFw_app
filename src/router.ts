import { Irouter } from "jsmvcfw";

// Source
import controllerHome from "@/controller/Home";
import controllerTest from "@/controller/Test";

const router = (): Irouter[] => {
    return [
        {
            title: "HOME",
            path: "/",
            controller: controllerHome
        },
        {
            title: "TEST",
            path: "/test",
            controller: controllerTest
        }
    ];
}

export default router;
