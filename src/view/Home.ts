import { Iview, IvariableState } from "jsmvcfw/dist/";

// Source
import { IcontrollerHome } from "../model/Home";

const home = (variableList: Record<string, IvariableState>): Iview => {
    return {
        content: String.raw`
        <div>
            <a href="/test">Go to TEST - Link</a>
            <div>
                <button id="buttonTest">Go to TEST</button>
                <button id="buttonCounter">Increase counter</button>
            </div>
            <p> Total: ${(() => {
                const a = 1 + 1;

                return a;
            })()}</p>
            <p>Counter: ${variableList.varCounter.state}</p>
        </div>`
    };
};

export default home;
