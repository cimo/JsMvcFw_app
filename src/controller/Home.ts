import { Icontroller, IitemList, IvariableState, variableState, storeSet, storeRemove, navigateTo, writeLog } from "jsmvcfw";

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
                varTest: variableState<number>(1)
                /*propList: variableState<IitemList>({ data: { pageContent: "HOME content" } }),
                storeHome: variableState<IitemList>({ data: { a: 1, b: 2 } }),
                buttonTest: variableState<HTMLElement | undefined>(undefined),
                buttonCounter: variableState<HTMLElement | undefined>(undefined),
                varTest: variableState<number>(1)*/
            }
        },
        create(variableList: Record<string, IvariableState>) {
            writeLog("/Controller/Home.ts", "create", {});

            //storeSet("storeHome", variableList.storeHome.state);

            const varTest = variableList.varTest;

            varTest.listener((value: number) => {
                writeLog("/Controller/Home.ts", "listener", { value });
            });
        },
        view(variableList: Record<string, IvariableState>) {
            writeLog("/Controller/Home.ts", "view", {});

            return viewHome(variableList).content;
        },
        event(variableList: Record<string, IvariableState>) {
            writeLog("/Controller/Home.ts", "event", {});

            if (variableList.buttonTest) {
                variableList.buttonTest.state = document.querySelector("#buttonTest") as HTMLButtonElement;
                variableList.buttonTest.state.addEventListener("click", () => {
                    navigateTo(undefined, "/test");
                });
            }

            /*if (variableList.buttonCounter) {
                variableList.buttonCounter.state = document.querySelector("#buttonCounter");
                variableList.buttonCounter.state.addEventListener("click", () => {
                    variableList.varTest.state ++;
                });
            }*/

            const element = document.querySelector("#buttonCounter");

            if (element) {
                element.addEventListener("click", () => {
                    variableList.varTest.state ++;
                });
            }
        },
        destroy() {
            writeLog("/Controller/Home.ts", "destroy", {});

            storeRemove("storeHome");
        }
    }
}

export default home;
