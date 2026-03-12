import React, { useEffect, useState } from 'react'

import inlineFocus from './inlineFocus'
import applyFocusState from './useFocus'
import './_dedupe_trix_toolbar'

type Editor = {
	element?: HTMLElement,
	insertHTML?: (html: string) => void,
	loadHTML?: (html: string) => void,
	setSelectedRange?: (range: Array<number>) => void,
}

type TrixConfig = {
	textAttributes?: {
		inlineCode?: {
			tagName: string,
			inheritable: boolean,
		}
	}
}

type TrixInstance = {
	config: TrixConfig,
}

type TrixEditorComponentProps = {
	className: string,
	fileParamName?: string,
	mergeTags: unknown[],
	onChange: (html: string, text: string) => void,
	onEditorReady: (editorInstance: Editor) => void,
	placeholder?: string,
	value?: string,
}

type TrixTextEditorProps = {
	TrixEditor?: React.ComponentType<TrixEditorComponentProps>,
	focus?: boolean,
	id?: string,
	inputOptions?: { [key: string]: string | number | boolean | (() => void) },
	label?: string,
	name?: string,
	onChange: (html: string, text: string) => void,
	placeholder?: string,
	template: string,
	toolbarBottom?: boolean,
	trixInstance?: TrixInstance,
	value?: string,
}

const TrixTextEditor = ({
	TrixEditor,
	focus = false,
	id,
	inputOptions = {},
	label,
	name,
	onChange,
	placeholder,
	template,
	toolbarBottom = false,
	trixInstance = undefined,
	value = '',
}: TrixTextEditorProps): React.ReactElement => {
	const [editor, setEditor] = useState<Editor>()

	useEffect(() => {
		const textAttributes = trixInstance?.config?.textAttributes
		if (!textAttributes) return

		textAttributes.inlineCode = {
			tagName: 'code',
			inheritable: true,
		}
	}, [trixInstance])

	const handleOnEditorReady = (editorInstance: Editor) => {
		setEditor(editorInstance)

		setTimeout(() => {
			const oldId = editorInstance.element?.getAttribute('input')
			if (!oldId) return

			const hiddenInput = document.getElementById(oldId) as HTMLElement | null
			if (!hiddenInput) return

			const hiddenInputId = (inputOptions.id as string) || oldId

			if (hiddenInputId !== oldId) {
				hiddenInput.id = hiddenInputId
				editorInstance.element?.setAttribute('input', hiddenInputId)
			}

			if (inputOptions.name) {
				hiddenInput.setAttribute('name', inputOptions.name as string)
			}

			const editorDomId = (id as string) || `${hiddenInputId}_trix`
			const trixLabelId = ((id as string) || hiddenInputId) + '-label'

			if (label) {
				editorInstance.element?.setAttribute('aria-labelledby', trixLabelId)
			}
			if (editorInstance.element) {
				editorInstance.element.id = editorDomId
			}
		})
	}

	useEffect(() => {
		if (!editor || !editor.element) return

		const toolbarElement = editor.element.parentElement?.querySelector('trix-toolbar') as HTMLElement | null
		if (!toolbarElement) return

		const blockCodeButton = toolbarElement.querySelector('[data-trix-attribute=code]') as HTMLElement | null
		if (!blockCodeButton) return

		let inlineCodeButton = toolbarElement.querySelector('[data-trix-attribute=inlineCode]') as HTMLElement | null
		if (!inlineCodeButton) {
			inlineCodeButton = blockCodeButton.cloneNode(true) as HTMLElement
			blockCodeButton.hidden = true
			inlineCodeButton.dataset.trixAttribute = 'inlineCode'
			blockCodeButton.insertAdjacentElement('afterend', inlineCodeButton)
		}

		if (toolbarBottom) {
			editor.element.after(toolbarElement)
		}
	}, [editor, toolbarBottom])

	useEffect(() => {
		if (!focus) return

		document.addEventListener('trix-focus', applyFocusState)
		document.addEventListener('trix-blur', applyFocusState)
		applyFocusState()

		return () => {
			document.removeEventListener('trix-focus', applyFocusState)
			document.removeEventListener('trix-blur', applyFocusState)
		}
	}, [focus])

	useEffect(() => {
		document.addEventListener('trix-focus', inlineFocus)
		document.addEventListener('trix-blur', inlineFocus)

		return () => {
			document.removeEventListener('trix-focus', inlineFocus)
			document.removeEventListener('trix-blur', inlineFocus)
		}
	}, [])

	useEffect(() => {
		if (!editor || !template) return
		editor.loadHTML && editor.loadHTML('')
		editor.setSelectedRange && editor.setSelectedRange([0, 0])
		editor.insertHTML && editor.insertHTML(template)
	}, [editor, template])

	useEffect(() => {
		if (!editor?.element) return

		const clickHandler = ({ target }: Event) => {
			const trixEditorContainer = (target as Element).closest('.pb_rich_text_editor_kit')
			if (!trixEditorContainer) return

			const anchorElement = (target as Element).closest('a') as HTMLAnchorElement | null
			if (!anchorElement) return

			if (anchorElement.hasAttribute('href')) window.open(anchorElement.href)
		}

		editor.element.addEventListener('click', clickHandler)

		return () => {
			editor.element?.removeEventListener('click', clickHandler)
		}
	}, [editor])

	if (!TrixEditor) {
		return (
			<div style={{ color: 'red', padding: '1em', border: '1px solid #f00', background: '#fff0f0' }}>
				<strong>Trix Editor is not available.</strong>
				<br />
				Please import <code>TrixEditor</code> from <code>react-trix</code> and pass it as a prop to <code>RichTextEditor</code>.
				<br />
				<pre>{`import { TrixEditor } from 'react-trix';\n<RichTextEditor TrixEditor={TrixEditor} ... />`}</pre>
			</div>
		)
	}

	return React.createElement(TrixEditor, {
		className: '',
		fileParamName: name,
		mergeTags: [],
		onChange,
		onEditorReady: handleOnEditorReady,
		placeholder,
		value,
	})
}

export default TrixTextEditor
