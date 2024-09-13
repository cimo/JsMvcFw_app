import { IvariableState, Iview } from "../jsmvcfw/JsMvcFwInterface";

// Source
//import { IdataMain } from "../model/Home";

const viewHome = (variableList: Record<string, IvariableState>): Iview => {
    return {
        content: String.raw`
        <div>
            <div>
                <button id="buttonCounter">Increase counter</button>
            </div>
            <p> Total: ${(() => {
                const total = 1 + 1;

                return total;
            })()}</p>
            <p>Counter: ${variableList.varCounter.state}</p>
        </div>`
    };
};

export default viewHome;
