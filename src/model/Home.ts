import { IvariableState } from "../jsmvcfw/JsMvcFwInterface";

export type IvariableList = {
    elementButtonCounter: IvariableState<HTMLButtonElement | undefined>;
    counter: IvariableState<number>;
    test: IvariableState<number>;
};
