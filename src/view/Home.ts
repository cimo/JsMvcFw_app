import { Iview } from "../jsmvcfw/JsMvcFwInterface";

// Source
import { IvariableList } from "../model/Home";

const viewHome = (variableList: IvariableList): Iview => {
    const template = String.raw`
    <div>
        <div>
            <button id="buttonCounter">Increase counter</button>
        </div>
        <p> Total:
            ${(() => {
                const total = 1 + 1;

                return total;
            })()}
        </p>
        <p>Counter: ${variableList.counter.state} - Test: ${variableList.test.state}</p>
    </div>`;

    return {
        content: template
    };
};

const renderTemplate = (template: string, context: IvariableList): string => {
    return template.replace(/\{([^}]+)\}/g, (match: string, p1: string) => {
        const expression = p1.trim();
        const keys = expression.split(".");
        let value: unknown = context; // Use `unknown` for better type safety

        // Traverse the context to resolve the value safely
        for (const key of keys) {
            if (value && typeof value === "object" && key in value) {
                value = (value as Record<string, unknown>)[key]; // Cast to a more specific type
            } else {
                return ""; // If the property doesn't exist, return an empty string
            }
        }

        return String(value); // Convert to string to handle any type
    });
};

export default viewHome;
