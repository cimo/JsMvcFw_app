import { Icontroller, IitemList, variableState, storeGet, storeSet, navigateTo, sendRequest, writeLog } from "jsmvcfw";

// Source
import { IrequestResponse } from "@/model/Test";
import viewTest from "@/view/Test";

const test = (): Icontroller => {
    return {
        variableList() {
            return {
                /*propList: variableState<IitemList>({ data: { pageContent: "TEST content" } }),
                buttonHome: variableState<HTMLElement | undefined>(undefined),
                buttonSendRequestPost: variableState<HTMLElement | undefined>(undefined),
                buttonSendRequestGet: variableState<HTMLElement | undefined>(undefined),
                containerResponse: variableState<HTMLElement | undefined>(undefined)*/
            }
        },
        create(variableList) {
            writeLog("/Controller/Test.ts", "create", {});

            /*const storeHome = storeGet("storeHome");

            if (storeHome) {
                storeHome.data.a = "a1";

                storeSet("storeHome", storeHome);
            }*/
        },
        view(variableList) {
            writeLog("/Controller/Test.ts", "view", {});

            return viewTest(variableList.propList.state).content;
        },
        event(variableList) {
            writeLog("/Controller/Test.ts", "event", {});

            variableList.buttonHome.state = document.querySelector("#buttonHome");
            variableList.buttonSendRequestPost.state = document.querySelector("#buttonSendRequestPost");
            variableList.buttonSendRequestGet.state = document.querySelector("#buttonSendRequestGet");
            variableList.containerResponse.state = document.querySelector("#containerResponse");

            if (variableList.buttonHome.state) {
                variableList.buttonHome.state.addEventListener("click", () => {
                    navigateTo(undefined, "/");
                });
            }

            if (variableList.containerResponse.state) {
                if (variableList.buttonSendRequestPost.state) {
                    variableList.buttonSendRequestPost.state.addEventListener("click", () => {
                        variableList.containerResponse.state.innerHTML = "";

                        sendRequest<IrequestResponse>("https://c5cf11f2-1a2a-4e41-9679-14b99d59bf39.mock.pstmn.io/requestPost", "POST", { a: 1 }).then((response) => {
                            writeLog("/Controller/Test.ts", "event - post", { response });

                            variableList.containerResponse.state.innerHTML = response.data;
                        });
                    });
                }

                if (variableList.buttonSendRequestGet.state) {
                    variableList.buttonSendRequestGet.state.addEventListener("click", () => {
                        variableList.containerResponse.state.innerHTML = "";

                        sendRequest<IrequestResponse>("https://c5cf11f2-1a2a-4e41-9679-14b99d59bf39.mock.pstmn.io/requestGet", "GET").then((response) => {
                            writeLog("/Controller/Test.ts", "event - get", { response });

                            variableList.containerResponse.state.innerHTML = response.data;
                        });
                    });
                }
            }
        },
        destroy() {
            writeLog("/Controller/Test.ts", "destroy", {});
        }
    }
}

export default test;
