import { IvariableState } from "jsmvcfw/dist/";

export interface IcontrollerHome extends IvariableState {
    propList: object;
    storeHome: object;
    buttonTest: HTMLElement | undefined;
    buttonCounter: HTMLElement | undefined;
    varCounter: number;
}
