import { IvariableState, Icontroller } from "../jsmvcfw/JsMvcFwInterface";
import { writeLog, variableState } from "../jsmvcfw/JsMvcFw";
import { initializeDom, observeDomChanges } from "../jsmvcfw/JsMvcFwDom";

// Source
//import { IdataMain } from "../model/Home";
import viewHome from "../view/Home";

export default class ControllerHome implements Icontroller {
    // Variable

    // Method
    constructor() {
        //...
    }

    variableList(): Record<string, IvariableState> {
        return {
            elementButtonCounter: variableState<HTMLButtonElement | undefined>(undefined),
            varCounter: variableState<number>(0)
        };
    }

    view(variableList: Record<string, IvariableState>): string {
        writeLog("/controller/Home.ts - view", variableList);

        return viewHome(variableList).content;
    }

    event(variableList: Record<string, IvariableState>): void {
        writeLog("/controller/Home.ts - event", variableList);

        initializeDom(variableList);
        observeDomChanges(variableList);

        const test = document.querySelector("#buttonCounter") as HTMLButtonElement;
        variableList.elementButtonCounter.state = test;

        let count = 0;

        test.onclick = () => {
            variableList.varCounter.state = count++;
        };
    }

    destroy(variableList: Record<string, IvariableState>): void {
        writeLog("/controller/Home.ts - destroy", variableList);
    }
}
