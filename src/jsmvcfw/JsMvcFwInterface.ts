export interface IvariableState {
    state: unknown;
    listener: (callback: <T>(parameter: T) => void) => void;
}

export interface Irouter {
    title: string;
    path: string;
    controller(): Icontroller;
}

export interface Icontroller {
    variableList: () => Record<string, IvariableState>;
    view: (variableList: Record<string, IvariableState>) => string;
    event: (variableList: Record<string, IvariableState>) => void;
    destroy: (variableList: Record<string, IvariableState>) => void;
}

export interface Iview {
    content: string;
}
