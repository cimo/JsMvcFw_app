import { Icontroller, IitemList, variableState, storeGet, storeSet, navigateTo, sendRequest, writeLog } from "jsmvcfw/dist/";

// Source
import { IrequestResponse } from "@/model/Test";
import viewTest from "@/view/Test";

const test = (): Icontroller => {
    return {
        variableList() {
            return {
                propList: variableState<IitemList>({ data: { pageContent: "TEST content" } }),
                buttonHome: variableState<HTMLElement | undefined>(undefined),
                buttonSendRequestPost: variableState<HTMLElement | undefined>(undefined),
                buttonSendRequestGet: variableState<HTMLElement | undefined>(undefined),
                containerResponse: variableState<HTMLElement | undefined>(undefined)
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

            const propListState = variableList.propList.state as IitemList;

            return viewTest(propListState).content;
        },
        event(variableList) {
            writeLog("/Controller/Test.ts", "event", {});

            const buttonHomeElement = document.querySelector("#buttonHome") as HTMLButtonElement;
            const buttonSendRequestPostElement = document.querySelector("#buttonSendRequestPost") as HTMLButtonElement;
            const buttonSendRequestGetElement = document.querySelector("#buttonSendRequestGet") as HTMLButtonElement;
            const containerResponseElement = document.querySelector("#containerResponse") as HTMLElement;

            //if (variableList.buttonHome.state) {
                buttonHomeElement.addEventListener("click", () => {
                    navigateTo(undefined, "/");
                });

                variableList.buttonHome.state = buttonHomeElement;
            //}

            if (containerResponseElement) {
                //if (variableList.buttonSendRequestPost.state) {
                    buttonSendRequestPostElement.addEventListener("click", () => {
                        containerResponseElement.innerHTML = "";

                        sendRequest<IrequestResponse>("https://c5cf11f2-1a2a-4e41-9679-14b99d59bf39.mock.pstmn.io/requestPost", "POST", { a: 1 })
                        .then((response) => {
                            writeLog("/Controller/Test.ts", "sendRequest - post - then", { response });

                            containerResponseElement.innerHTML = response.data;
                        }).catch((reason: string) => {
                            writeLog("/Controller/Test.ts", "sendRequest - post - catch", { reason });
                        });
                    });

                    variableList.buttonSendRequestPost.state = buttonSendRequestPostElement;
                //}

                //if (variableList.buttonSendRequestGet.state) {
                    buttonSendRequestGetElement.addEventListener("click", () => {
                        containerResponseElement.innerHTML = "";

                        sendRequest<IrequestResponse>("https://c5cf11f2-1a2a-4e41-9679-14b99d59bf39.mock.pstmn.io/requestGet", "GET")
                        .then((response) => {
                            writeLog("/Controller/Test.ts", "sendRequest - get - then", { response });

                            containerResponseElement.innerHTML = response.data;
                        }).catch((reason: string) => {
                            writeLog("/Controller/Test.ts", "sendRequest - get - catch", { reason });
                        });
                    });

                    variableList.buttonSendRequestGet.state = buttonSendRequestGetElement;
                //}

                variableList.containerResponse.state = containerResponseElement;
            }
        },
        destroy() {
            writeLog("/Controller/Test.ts", "destroy", {});
        }
    }
}

export default test;
