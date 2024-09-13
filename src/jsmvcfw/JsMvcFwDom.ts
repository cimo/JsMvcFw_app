import { IvariableState } from "../jsmvcfw/JsMvcFwInterface";

interface BoundNode {
    node: Text;
    expression: string;
    variableKeys: string[];
}

const boundNodes: BoundNode[] = [];

function evaluateExpression(expression: string, variableList: Record<string, IvariableState>): string {
    const variables = Object.fromEntries(Object.entries(variableList).map(([key, value]) => [key, value.state]));
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const func = new Function(...Object.keys(variables), `return ${expression}`);
    return String(func(...Object.values(variables)));
}

function parseNode(node: Node, variableList: Record<string, IvariableState>): void {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const regex = /\$\{([^}]+)\}/g;
        let match: RegExpExecArray | null;
        let lastIndex = 0;
        const fragment = document.createDocumentFragment();

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
            }

            const expression = match[1].trim();
            const variableKeys = Object.keys(variableList).filter((key) => expression.includes(key));

            if (variableKeys.length > 0) {
                const boundTextNode = document.createTextNode("");
                fragment.appendChild(boundTextNode);
                boundNodes.push({ node: boundTextNode, expression, variableKeys });
            } else {
                fragment.appendChild(document.createTextNode(match[0]));
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        if (node.parentNode) {
            node.parentNode.replaceChild(fragment, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach((child) => parseNode(child, variableList));
    }
}

function updateBoundNode(boundNode: BoundNode, variableList: Record<string, IvariableState>): void {
    const { node, expression } = boundNode;
    node.textContent = evaluateExpression(expression, variableList);
}

function setupListeners(variableList: Record<string, IvariableState>): void {
    boundNodes.forEach((boundNode) => {
        boundNode.variableKeys.forEach((key) => {
            variableList[key].listener(() => {
                updateBoundNode(boundNode, variableList);
            });
        });
    });
}

export function initializeDom(variableList: Record<string, IvariableState>): void {
    // Clear existing bound nodes before re-initializing
    boundNodes.length = 0;
    parseNode(document.body, variableList);
    boundNodes.forEach((boundNode) => updateBoundNode(boundNode, variableList));
    setupListeners(variableList);
}

export function observeDomChanges(variableList: Record<string, IvariableState>): void {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    parseNode(node, variableList);
                });
            }
        });
        setupListeners(variableList);
    });

    observer.observe(document.body, { childList: true, subtree: true });
}
