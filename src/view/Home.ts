import { Iview } from "@cimo/jsmvcfw/dist/JsMvcFwInterface";

// Source
import { IvariableList } from "../model/Home";

const viewHome = (variableList: IvariableList): Iview => {
    const template = String.raw`
    <div>
        <p> <span data-bind="label">${variableList.label.state}</span> =
            ${(() => {
                const total = 1 + 1;

                return total;
            })()}
        </p>
        <button class="button_primary" id="go_to">go to test page</button>
    </div>`;

    return {
        template
    };
};

export default viewHome;
