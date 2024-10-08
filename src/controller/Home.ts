import { Icontroller } from "../jsmvcfw/JsMvcFwInterface";
import { writeLog, variableState } from "../jsmvcfw/JsMvcFw";

// Source
import { IvariableList } from "../model/Home";
import viewHome from "../view/Home";

export default class ControllerHome implements Icontroller<IvariableList> {
    // Variable

    // Method
    constructor() {
        //...
    }

    variableList(): IvariableList {
        return {
            elementButtonCounter: variableState<HTMLButtonElement | undefined>(undefined),
            counter: variableState<number>(0),
            test: variableState<number>(0)
        };
    }

    view(variableList: IvariableList): string {
        writeLog("/controller/Home.ts - view", variableList);

        return viewHome(variableList).content;
    }

    event(variableList: IvariableList): void {
        writeLog("/controller/Home.ts - event", variableList);

        const test = document.querySelector("#buttonCounter") as HTMLButtonElement;
        variableList.elementButtonCounter.state = test;

        let count = 0;

        test.onclick = () => {
            count++;

            variableList.counter.state = count;

            variableList.test.state = count + 1;
        };
    }

    destroy(variableList: IvariableList): void {
        writeLog("/controller/Home.ts - destroy", variableList);
    }
}
