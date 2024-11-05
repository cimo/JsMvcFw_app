import { Iview } from "@cimo/jsmvcfw/dist/JsMvcFwInterface";

// Source
import { IvariableList } from "../model/Test";

const viewTest = (variableList: IvariableList): Iview => {
    const template = String.raw`
    <div>
        <div>
            <button class="button_primary" id="buttonCounter">Increase counter</button>
        </div>
        <p>Counter: <span data-bind="counter">${variableList.counter.state}</span></p>
        <button class="button_primary" id="go_to">go to home page</button>
    </div>`;

    return {
        template
    };
};

export default viewTest;
