import { Icontroller, IitemList, variableState, storeSet, storeRemove, navigateTo, writeLog } from "jsmvcfw/dist/";

// Source
import viewHome from "@/view/Home";

const parseView = (html: string): void => {
    /*let target = document.querySelector('#jsmvcfw_app');

    let p = document.createElement('p');
    p.innerHTML = 'Your content, markup, etc.';

    if (target) {
        p.insertAdjacentText("beforeend", "a");
        p.insertAdjacentText("beforeend", "b");
        p.insertAdjacentText("beforeend", "c");
        target.insertAdjacentElement("beforeend", p);
    }*/

    //const parser = new DOMParser();
    //const htmlParsed = parser.parseFromString(html, "text/html");
    //const test = toJSON(htmlParsed.body);
}

const home = (): Icontroller => {
    return {
        variableList() {
            return {
                propList: variableState<IitemList>({ data: { pageContent: "HOME content" } }),
                storeHome: variableState<IitemList>({ data: { a: 1, b: 2 } }),
                buttonTest: variableState<HTMLElement | undefined>(undefined),
                buttonCounter: variableState<HTMLElement | undefined>(undefined),
                varTest: variableState<number>(1)
            }
        },
        create(variableList) {
            writeLog("/Controller/Home.ts", "create", {});

            //storeSet("storeHome", variableList.storeHome.state);

            variableList.varTest.listener((value) => {
                writeLog("/Controller/Home.ts", "listener", { value });
            });
        },
        view(variableList) {
            writeLog("/Controller/Home.ts", "view", {});

            return viewHome(variableList).content;
        },
        event(variableList) {
            writeLog("/Controller/Home.ts", "event", {});

            //if (variableList.buttonTest) {
                const buttonTestElement = document.querySelector("#buttonTest") as HTMLButtonElement;

                buttonTestElement.addEventListener("click", () => {
                    navigateTo(undefined, "/test");
                });

                variableList.buttonTest.state = buttonTestElement;
            //}

            //if (variableList.buttonCounter) {
                const buttonCounterTest = document.querySelector("#buttonCounter") as HTMLButtonElement;

                let count = 0;

                buttonCounterTest.addEventListener("click", () => {
                    count ++;

                    variableList.varTest.state = count;
                });

                variableList.buttonCounter.state = buttonCounterTest;
            //}
        },
        destroy() {
            writeLog("/Controller/Home.ts", "destroy", {});

            storeRemove("storeHome");
        }
    }
}

export default home;
