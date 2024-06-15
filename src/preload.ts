import {isFunction} from 'lodash';
import type jquery from 'jquery';
// import type {SC2DataManager} from "../../../dist-BeforeSC2/SC2DataManager";
// import type {ModUtils} from "../../../dist-BeforeSC2/Utils";

/**
 *
 * @param key {string}
 */
window.aaaaabbbbbccccc = (key: string): string => {
    console.log("aaaaabbbbbccccc", key);
    return key + '_aaaaabbbbbccccc';
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
            // console.log('patchLinkButton handler', [this, this.name, this.args, this.args[0], this.output]);
            const thisPtr = this;
            const r = h.apply(this as any, arguments);
            const outputRef = $(this.output);
            const children = outputRef.children();
            // console.log('patchLinkButton handler outputRef', [outputRef, outputRef.length, outputRef.children(), outputRef.children()[outputRef.length - 1]]);
            children.last()[0].addEventListener('click', () => {
                console.log('patchLinkButton output click', [thisPtr, thisPtr.name, thisPtr.args, thisPtr.args[0], this.output]);
            });
            // console.log('patchLinkButton handler output', [this, this.name, this.args, this.args[0], this.output]);
            return r;
        },
    });

    console.log('patchLinkButton() success');
    logger.log('patchLinkButton() success');
}

window.ModWebpackExampleTs_patchLinkButton = ModWebpackExampleTs_patchLinkButton;
