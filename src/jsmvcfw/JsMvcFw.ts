import { IvariableState } from "./JsMvcFwInterface";

let isDebug = false;

export let urlRoot = "";

export const mainInit = (isDebugValue = false, urlRootValue = "/") => {
    isDebug = isDebugValue;
    urlRoot = urlRootValue;

    writeLog("JsMvcFw.ts - mainInit", { isDebug, urlRoot });
};

export const writeLog = (tag: string, value: string | Record<string, unknown>) => {
    if (isDebug) {
        // eslint-disable-next-line no-console
        console.log(`WriteLog => ${tag}: `, value);
    }
};

export const checkEnv = (key: string, value: string | undefined): string => {
    if (typeof process !== "undefined" && value === undefined) {
        writeLog("JsMvcFw.ts - checkEnv()", `${key} is not defined!`);
    }

    return value ? value : "";
};

export const variableState = <T>(variableValue: T): IvariableState<T> => {
    writeLog("JsMvcFw.ts - variableState", { variableValue });

    const randomTag = Math.floor(Math.random() * 1000000).toString();

    let privateValue: T = variableValue;
    const privateEvent = new Event(randomTag);

    return {
        set state(newValue: T) {
            privateValue = newValue;

            writeLog("JsMvcFw.ts - variableState - set state", { privateValue });

            document.dispatchEvent(privateEvent);
        },
        get state(): T {
            writeLog("JsMvcFw.ts - variableState - get state", { privateValue });

            return privateValue;
        },
        listener: (callback: (callbackValue?: T) => void) => {
            document.addEventListener(randomTag, () => {
                writeLog("JsMvcFw.ts - variableState - listener", { privateValue });

                if (callback) {
                    callback(privateValue);
                }
            });
        }
    };
};
