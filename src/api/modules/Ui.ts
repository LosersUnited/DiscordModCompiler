/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseUi {
    /**
     * Shows a generic but very customizable modal.
     *
     * @param {string} title Title of the modal
     * @param {(string|ReactElement|Array<string|ReactElement>)} content A string of text to display in the modal
     */
    // get alert() : (title: string, content: string) => void {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Creates a tooltip to automatically show on hover.
     *
     * @param {HTMLElement} node DOM node to monitor and show the tooltip on
     * @param {string|HTMLElement} content String to show in the tooltip
     * @param {object} options Additional options for the tooltip
     * @param {"primary"|"info"|"success"|"warn"|"danger"} [options.style="primary"] Correlates to the Discord styling/colors
     * @param {"top"|"right"|"bottom"|"left"} [options.side="top"] Can be any of top, right, bottom, left
     * @param {boolean} [options.preventFlip=false] Prevents moving the tooltip to the opposite side if it is too big or goes offscreen
     * @param {boolean} [options.disabled=false] Whether the tooltip should be disabled from showing on hover
     * @returns {Tooltip} The tooltip that was generated.
     */
    // get createTooltip() : (node: HTMLElement, content: string|HTMLElement, options: {style: "primary"|"info"|"success"|"warn"|"danger", side: "top"|"right"|"bottom"|"left", preventFlip: boolean, disabled: boolean}) => any { // TODO: return Tooltip
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Shows a generic but very customizable confirmation modal with optional confirm and cancel callbacks.
     *
     * @param {string} title Title of the modal.
     * @param {(string|ReactElement|Array<string|ReactElement>)} children Single or mixed array of React elements and strings. Everything is wrapped in Discord's `TextElement` component so strings will show and render properly.
     * @param {object} [options] Options to modify the modal
     * @param {boolean} [options.danger=false] Whether the main button should be red or not
     * @param {string} [options.confirmText=Okay] Text for the confirmation/submit button
     * @param {string} [options.cancelText=Cancel] Text for the cancel button
     * @param {callable} [options.onConfirm=NOOP] Callback to occur when clicking the submit button
     * @param {callable} [options.onCancel=NOOP] Callback to occur when clicking the cancel button
     * @returns {string} The key used for this modal.
     */
    // get showConfirmationModal() : (title: string, children: string|ReactElement|Array<string|ReactElement>, options: {danger: boolean, confirmText: string, cancelText: string, onConfirm: () => void, onCancel: () => void}) => string {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }
    /**
     * This shows a toast similar to android towards the bottom of the screen.
     *
     * @param {string} content The string to show in the toast
     * @param {object} options Options for the toast
     * @param {string} [options.type=""] Changes the type of the toast stylistically and semantically. Choices: "", "info", "success", "danger"/"error", "warning"/"warn". Default: "".
     * @param {boolean} [options.icon=true] Determines whether the icon should show corresponding to the type. A toast without type will always have no icon. Default: `true`.
     * @param {number} [options.timeout=3000] Adjusts the time (in ms) the toast should be shown for before disappearing automatically. Default: `3000`.
     * @param {boolean} [options.forceShow=false] Whether to force showing the toast and ignore the BD setting
     */
    // get showToast() : (content: string, options: {type: string, icon: boolean, timeout: number, forceShow: boolean}) => void {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Shows a notice above Discord's chat layer.
     *
     * @param {string|Node} content Content of the notice
     * @param {object} options Options for the notice
     * @param {string} [options.type="info" | "error" | "warning" | "success"] Type for the notice. Will affect the color.
     * @param {Array<{label: string, onClick: function}>} [options.buttons] Buttons that should be added next to the notice text
     * @param {number} [options.timeout=10000] Timeout until the notice is closed. Will not fire when set to `0`.
     * @returns {function} A callback for closing the notice. Passing `true` as first parameter closes immediately without transitioning out.
     */
    // get showNotice() : (content: string|Node, options: {type: string, buttons: Array<{label: string, onClick: () => void}>, timeout: number}) => () => void {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Gives access to the [Electron Dialog](https://www.electronjs.org/docs/latest/api/dialog/) api.
     * Returns a `Promise` that resolves to an `object` that has a `boolean` cancelled and a `filePath` string for saving and a `filePaths` string array for opening.
     *
     * @param {object} options Options object to configure the dialog
     * @param {"open"|"save"} [options.mode="open"] Determines whether the dialog should open or save files
     * @param {string} [options.defaultPath=~] Path the dialog should show on launch
     * @param {Array<object<string, string[]>>} [options.filters=[]] An array of [file filters](https://www.electronjs.org/docs/latest/api/structures/file-filter)
     * @param {string} [options.title] Title for the titlebar
     * @param {string} [options.message] Message for the dialog
     * @param {boolean} [options.showOverwriteConfirmation=false] Whether the user should be prompted when overwriting a file
     * @param {boolean} [options.showHiddenFiles=false] Whether hidden files should be shown in the dialog
     * @param {boolean} [options.promptToCreate=false] Whether the user should be prompted to create non-existent folders
     * @param {boolean} [options.openDirectory=false] Whether the user should be able to select a directory as a target
     * @param {boolean} [options.openFile=true] Whether the user should be able to select a file as a target
     * @param {boolean} [options.multiSelections=false] Whether the user should be able to select multiple targets
     * @param {boolean} [options.modal=false] Whether the dialog should act as a modal to the main window
     * @returns {Promise<object>} Result of the dialog
     */
    // get openDialog() : (options: {mode: "open"|"save", defaultPath: string, filters: Array<{[key: string]: string[]}>, title: string, message: string, showOverwriteConfirmation: boolean, showHiddenFiles: boolean, promptToCreate: boolean, openDirectory: boolean, openFile: boolean, multiSelections: boolean, modal: boolean}) => Promise<{cancelled: boolean, filePath: string, filePaths: string[]}> {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }
}

export const Ui = new BaseUi();
