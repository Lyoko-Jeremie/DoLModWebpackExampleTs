import lodash from 'lodash';
import moment from 'moment';

import {isFunction} from 'lodash';
import type jquery from 'jquery';
// import type {SC2DataManager} from "../../../dist-BeforeSC2/SC2DataManager";
// import type {ModUtils} from "../../../dist-BeforeSC2/Utils";

console.log('earlyload.js', lodash, moment);
console.log('earlyload.js', lodash.VERSION, moment.version);

/**
 *
 * @param key {string}
 */
window.aaaaabbbbbccccc = (key: string): string => {
    console.log("aaaaabbbbbccccc", key);
    return key + '_aaaaabbbbbccccc';
}

export interface JqEventListenerObject {
    data: any | undefined;
    guid: number;
    handler: Function;
    namespace: string;
    needsContext: any | undefined;
    origType: string;
    selector: any | undefined;
    type: string,
}

export type JqEventListenersDataType = Record<string, JqEventListenerObject[]>;

export function getEventListenersFromJqNode(node: ReturnType<typeof $>): JqEventListenersDataType {
    // @ts-ignore
    return $._data(node[0], "events");
}

const logger = window.modUtils.getLogger();

export function ModWebpackExampleTs_patchLinkButton(MacroRef: typeof Macro) {

    const link = MacroRef.get('link');

    if (!link) {
        console.error('patchLinkButton() cannot find macro [icon]');
        logger.error(`patchLinkButton() cannot find macro [icon]`);
        return;
    }
    const h: Function = link.OriginHandlerPassageQBalance;
    if (!h && !isFunction(h)) {
        console.error('patchLinkButton() cannot find macro [icon] handle', [link, h]);
        logger.error(`patchLinkButton() cannot find macro [icon] handle`);
        return;
    }

    MacroRef.delete('button');
    MacroRef.delete('link');
    MacroRef.add(['button', 'link'], {
        isAsync: true,
        tags: null,

        handler() {
            const thisPtr = this;

            const r = h.apply(this as any, arguments);

            const outputRef = $(this.output);

            const children = outputRef.children();
            const node = children.last();

            const events = getEventListenersFromJqNode(node);

            const hookKeyList = ['keypress', 'click'];

            for (const key of hookKeyList) {
                const eventList = events[key];
                if (eventList) {
                    for (const event of eventList) {
                        const handler = event.handler;
                        event.handler = function () {
                            console.log('patchLinkButton output jq events', [key, thisPtr, thisPtr.name, thisPtr.args, thisPtr.args[0], thisPtr.output]);
                            handler.apply(this, arguments);
                        }
                    }
                }
            }

            // const clickH = events['click']?.[0]?.handler;
            // if (clickH) {
            //     console.log('patchLinkButton handler events', [events, events['click'], clickH.toString()]);
            //     events['click'][0].handler = function () {
            //         console.log('patchLinkButton output jq events click', [thisPtr, thisPtr.name, thisPtr.args, thisPtr.args[0], thisPtr.output]);
            //         // clickH.apply(this, arguments);
            //     }
            // }
            return r;
        },
    });

    console.log('patchLinkButton() success');
    logger.log('patchLinkButton() success');
}

window.ModWebpackExampleTs_patchLinkButton = ModWebpackExampleTs_patchLinkButton;
