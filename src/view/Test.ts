import { Iview } from "../jsmvcfw/JsMvcFwInterface";

// Source
import { IvariableList } from "../model/Test";

const viewTest = (variableList: IvariableList): Iview => {
    const template = String.raw`
    <div>
        <div>
            <button id="buttonCounter">Increase counter</button>
        </div>
        <p>Counter: <span data-bind="counter">${variableList.counter.state}</span></p>
        <button id="go_to">go to home page</button>
    </div>`;

    return {
        template
    };
};

export default viewTest;
