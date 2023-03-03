import { View } from "jsmvcfw";

const home = (variableList: Record<string, any>): View => {
    return {
        content: String.raw`
        <div>
            <a href="/test">Go to TEST - Link</a>
            <div>
                <button id="buttonTest">Go to TEST</button>
                <button id="buttonCounter">Increase counter</button>
            </div>
            ${(() => {
                const a = 1 + 1;

                return a;
            })()}
            <p>Counter: ${ variableList.varTest.state }</p>
        </div>`
    }
}

export default home;
