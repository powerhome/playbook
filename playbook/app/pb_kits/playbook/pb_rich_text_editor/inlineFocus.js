const inlineFocus = () => {
    const trixEditorElement = event.target;
    const trixEditorContainer = trixEditorElement.closest('.pb_rich_text_editor_kit');
    if (!trixEditorContainer.classList.contains('inline'))
        return;
    trixEditorContainer.classList.toggle('focused');
};
export default inlineFocus;
//# sourceMappingURL=inlineFocus.js.map