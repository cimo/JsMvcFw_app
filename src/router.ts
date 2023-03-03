import { Router } from "jsmvcfw";

// Source
import controllerHome from "@/controller/Home";
import controllerTest from "@/controller/Test";

const router = (): Router[] => {
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
