import { Icontroller } from "../jsmvcfw/JsMvcFwInterface";
import { writeLog, variableState } from "../jsmvcfw/JsMvcFw";
import { navigateTo } from "../jsmvcfw/JsMvcFwRouter";

// Source
import { IvariableList } from "../model/Test";
import viewTest from "../view/Test";

export default class ControllerHome implements Icontroller<IvariableList> {
    // Variable
    private elementButtonGoTo: HTMLButtonElement | null;
    private elementButtonCounter: HTMLButtonElement | null;

    // Method
    constructor() {
        this.elementButtonGoTo = null;
        this.elementButtonCounter = null;
    }

    variable(): IvariableList {
        return {
            counter: variableState<number>("counter", 0)
        };
    }

    view(variableList: IvariableList): string {
        writeLog("/controller/Test.ts - view", variableList);

        return viewTest(variableList).template;
    }

    event(variableList: IvariableList): void {
        writeLog("/controller/Test.ts - event", variableList);

        this.elementButtonGoTo = document.querySelector<HTMLButtonElement>("#go_to");
        this.elementButtonCounter = document.querySelector<HTMLButtonElement>("#buttonCounter");

        let count = variableList.counter.state;

        if (this.elementButtonGoTo) {
            this.elementButtonGoTo.onclick = () => {
                navigateTo("/");
            };
        }

        if (this.elementButtonCounter) {
            this.elementButtonCounter.onclick = () => {
                count++;

                variableList.counter.state = count;
            };
        }
    }

    destroy(variableList: IvariableList): void {
        writeLog("/controller/Test.ts - destroy", variableList);
    }
}
