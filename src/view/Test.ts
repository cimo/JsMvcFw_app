import { Iview, IitemList } from "jsmvcfw/dist/";

const test = (propList: IitemList): Iview => {
    return {
        content: String.raw`
        <div>
            <p>${propList.data.pageContent}</p>
            <a href="/">Go to HOME - Link</a>
            <div>
                <button id="buttonHome">Go to HOME</button>
                <button id="buttonSendRequestPost">Send request - POST</button>
                <button id="buttonSendRequestGet">Send request - GET</button>
            </div>
            <p id="containerResponse"></p>
        </div>`
    }
}

export default test;
