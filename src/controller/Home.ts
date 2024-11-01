import { Icontroller } from "../jsmvcfw/JsMvcFwInterface";
import { writeLog, variableState } from "../jsmvcfw/JsMvcFw";
import { navigateTo } from "../jsmvcfw/JsMvcFwRouter";

// Source
import { IvariableList } from "../model/Home";
import viewHome from "../view/Home";

export default class ControllerHome implements Icontroller<IvariableList> {
    // Variable
    private elementButton: HTMLButtonElement | null;

    // Method
    constructor() {
        this.elementButton = null;
    }

    variable(): IvariableList {
        return {
            label: variableState<string>("label", "")
        };
    }

    view(variableList: IvariableList): string {
        writeLog("/controller/Home.ts - view", variableList);

        return viewHome(variableList).template;
    }

    event(variableList: IvariableList): void {
        writeLog("/controller/Home.ts - event", variableList);

        this.elementButton = document.querySelector<HTMLButtonElement>("#go_to");

        if (this.elementButton) {
            this.elementButton.onclick = () => {
                navigateTo("/test");
            };
        }

        variableList.label.state = "1 + 1";
    }

    destroy(variableList: IvariableList): void {
        writeLog("/controller/Home.ts - destroy", variableList);
    }
}
