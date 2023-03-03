import { Controller, ItemList, variableState, storeSet, storeRemove, navigateTo, writeLog } from "jsmvcfw";

// Source
import viewHome from "@/view/Home";

const list:Element[] = [];

const parseView = (html: string): any => {
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

    const variableContainer = {
        variableList: {
            varTest: {
                state: 1
            }
        }
    };

    const content = String.raw`
        <div>
            <a href="/test">Go to TEST - Link</a>
            <div>
                <button id="buttonTest">Go to TEST</button>
                <button id="buttonCounter">Increase counter</button>
            </div>
            ${(() => {
                const a = 1 + 1;

                return a;
            })()}
            <p>Counter: {{ variableList.varTest.state }}</p>
        </div>`

    const result = content.replace(
        /{{(\w*)}}/g,
        (m, key ) => {
            return variableContainer.hasOwnProperty( key ) ? variableContainer[ key ] : "";
        }
    );

    //const result = parseStringTemplate(content, variableContainer);

    writeLog("Home.ts", "parseView", { result });

    return result;
}

function parseStringTemplate(str, obj) {
    let parts = str.split(/\$\{(?!\d)[\wæøåÆØÅ]*\}/);
    let args = str.match(/[^{\}]+(?=})/g) || [];
    let parameters = args.map(argument => obj[argument] || (obj[argument] === undefined ? "" : obj[argument]));
    return String.raw({ raw: parts }, ...parameters);
}

function toJSON(node) {
    let propFix = { for: 'htmlFor', class: 'className' };
    let specialGetters = {
      style: (node) => node.style.cssText,
    };
    let attrDefaultValues = { style: '' };
    let obj = {
      nodeType: node.nodeType,
    } as any;
    if (node.tagName) {
      obj.tagName = node.tagName.toLowerCase();
    } else if (node.nodeName) {
      obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
      obj.nodeValue = node.nodeValue;
    }
    let attrs = node.attributes;
    if (attrs) {
      let defaultValues = new Map();
      for (let i = 0; i < attrs.length; i++) {
        let name = attrs[i].nodeName;
        defaultValues.set(name, attrDefaultValues[name]);
      }
      // Add some special cases that might not be included by enumerating
      // attributes above. Note: this list is probably not exhaustive.
      switch (obj.tagName) {
        case 'input': {
          if (node.type === 'checkbox' || node.type === 'radio') {
            defaultValues.set('checked', false);
          } else if (node.type !== 'file') {
            // Don't store the value for a file input.
            defaultValues.set('value', '');
          }
          break;
        }
        case 'option': {
          defaultValues.set('selected', false);
          break;
        }
        case 'textarea': {
          defaultValues.set('value', '');
          break;
        }
      }
      let arr = [] as any;
      for (let [name, defaultValue] of defaultValues) {
        let propName = propFix[name] || name;
        let specialGetter = specialGetters[propName];
        let value = specialGetter ? specialGetter(node) : node[propName];
        if (value !== defaultValue) {
          arr.push([name, value]);
        }
      }
      if (arr.length) {
        obj.attributes = arr;
      }
    }
    let childNodes = node.childNodes;
    // Don't process children for a textarea since we used `value` above.
    if (obj.tagName !== 'textarea' && childNodes && childNodes.length) {
      let arr = (obj.childNodes = []) as any;
      for (let i = 0; i < childNodes.length; i++) {
        arr[i] = toJSON(childNodes[i]);
      }
    }
    return obj;
  }

/*  function toDOM(input) {
    let obj = typeof input === 'string' ? JSON.parse(input) : input;
    let propFix = { for: 'htmlFor', class: 'className' };
    let node;
    let nodeType = obj.nodeType;
    switch (nodeType) {
      // ELEMENT_NODE
      case 1: {
        node = document.createElement(obj.tagName);
        if (obj.attributes) {
          for (let [attrName, value] of obj.attributes) {
            let propName = propFix[attrName] || attrName;
            // Note: this will throw if setting the value of an input[type=file]
            node[propName] = value;
          }
        }
        break;
      }
      // TEXT_NODE
      case 3: {
        return document.createTextNode(obj.nodeValue);
      }
      // COMMENT_NODE
      case 8: {
        return document.createComment(obj.nodeValue);
      }
      // DOCUMENT_FRAGMENT_NODE
      case 11: {
        node = document.createDocumentFragment();
        break;
      }
      default: {
        // Default to an empty fragment node.
        return document.createDocumentFragment();
      }
    }
    if (obj.childNodes && obj.childNodes.length) {
      for (let childNode of obj.childNodes) {
        node.appendChild(toDOM(childNode));
      }
    }
    return node;
  }

const recursion = (element: Element | null) => {
    if (element) {
        for (const [key, value] of Object.entries(element.children)) {
            if (value.children.length) {
                list.push(value);
                recursion(value);
            }
        }

        return list;
    }
}*/

const home = (): Controller => {
    return {
        variableList() {
            return {
                propList: variableState<ItemList>({ data: { pageContent: "HOME content" } }),
                storeHome: variableState<ItemList>({ data: { a: 1, b: 2 } }),
                buttonTest: variableState<HTMLElement | undefined>(undefined),
                buttonCounter: variableState<HTMLElement | undefined>(undefined),
                varTest: variableState<number>(1)
            }
        },
        create(variableList) {
            writeLog("/Controller/Home.ts", "create", {});

            //storeSet("storeHome", variableList.storeHome.state);

            variableList.varTest.listener((value: number) => {
                writeLog("/Controller/Home.ts", "listener", { value });
            });
        },
        view(variableList) {
            writeLog("/Controller/Home.ts", "view", {});

            return parseView(viewHome(variableList).content);
        },
        event(variableList) {
            writeLog("/Controller/Home.ts", "event", {});

            if (variableList.buttonTest) {
                variableList.buttonTest.state = document.querySelector("#buttonTest");
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
