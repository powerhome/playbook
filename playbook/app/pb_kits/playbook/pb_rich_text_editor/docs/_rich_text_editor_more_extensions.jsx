import React, { useRef, useState, useEffect } from 'react'
import { RichTextEditor, Pagination } from 'playbook-ui'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Highlight from '@tiptap/extension-highlight'
import html2pdf from 'html2pdf.js'
import * as pdfjsLib from 'pdfjs-dist/build/pdf'

// Set the PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'

// Custom extension to support page breaks & dummy signature placeholders
const CustomHorizontalRule = HorizontalRule.extend({
  addAttributes() {
    return {
      type: {
        default: null,
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => {
          if (attributes.type) {
            return { 'data-type': attributes.type }
          }
        },
      },
    }
  },
})

const defaultContent = `
<h2>Divorce Proceedings: Mickey Mouse v. Mini Mouse</h2>
<p>
This Agreement is entered into between the parties, herein referred to as "Mickey Mouse" and "Mini Mouse," 
for the purpose of dissolving their marital union. The parties, having mutually agreed upon all terms of separation, 
hereby declare their intention to resolve all disputes amicably and in accordance with applicable laws.
</p>
<p>
WHEREAS, the parties have been united in matrimony for several years, accruing significant assets and liabilities; 
and WHEREAS, both parties desire an equitable distribution of their property and responsibilities without resorting to litigation;
</p>
<p>
NOW, THEREFORE, in consideration of the mutual promises contained herein, the parties agree as follows:
</p>
<ul>
  <li>All marital assets and debts shall be divided equitably.</li>
  <li>Custody of shared responsibilities and interests shall be determined in the best interest of both parties.</li>
  <li>Spousal support, if applicable, shall be paid as per the terms set forth in this document.</li>
</ul>

<hr data-type="pagebreak" /><p></p>

<h2>Section Two: Detailed Legal Provisions and Disclosures</h2>
<p>
The parties acknowledge that this Agreement is executed voluntarily and with full understanding of its provisions.
Each party has had the opportunity to seek independent legal counsel. This document supersedes all prior agreements,
discussions, and understandings, and any future dispute shall be governed by the terms stated herein.
</p>
<p>
Notwithstanding any provisions to the contrary, the entirety of this Agreement represents the complete and exclusive statement 
of the parties’ agreement. All warranties and representations are hereby disavowed, and the parties agree to hold each other 
harmless from any claims arising from previous discussions.
</p>

<hr data-type="pagebreak" /><p></p>

<h2>Section Three: Final Terms and Signatures</h2>
<p>
The undersigned have read and understood all terms of this Agreement. Their signatures below indicate acceptance and 
commitment to abide by its provisions.
</p>
<p>
Signature of Husband: {{ signature: Mickey Mouse }}<br />
Signature of Wife: {{ signature: Mini Mouse }}
</p>
<p>
IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.
</p>
`

const RichTextEditorMoreExtensions = (props) => {
  const canvasRef = useRef(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      CustomHorizontalRule,
      Highlight.configure({ multicolor: true })
    ],
    // Default content with multiple pages of legal divorce proceedings.
    content: defaultContent,
  })

  const ExtensionsList = [
    {
      icon: "horizontal-rule",
      isActive: editor?.isActive("horizontalRule"),
      text: "Horizontal Rule",
      onclick: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: "page-break",
      text: "Page Break",
      onclick: () =>
        editor.chain().focus().insertContent('<hr data-type="pagebreak" /><p></p>').run(),
    },
    {
      icon: "signature",
      text: "Insert Signature Placeholder",
      onclick: () =>
        editor.chain().focus().insertContent('{{ signature: Your Name }}').run(),
    },
    {
      icon: "highlighter",
      isActive: editor?.isActive("highlight"),
      text: "Highlighter",
      onclick: () => editor.chain().focus().toggleHighlight().run(),
    }
  ]

  // Generate HTML template for PDF preview.
  // Replace any occurrence of {{ signature: Name }} with a styled signature box.
  const generateHtmlTemplate = () => {
    let tiptapHtmlOutput = editor.getHTML()
    tiptapHtmlOutput = tiptapHtmlOutput.replace(
      /{{\s*signature:\s*(.*?)\s*}}/g,
      `<span class="signature" style="display:inline-block; border:1px solid #000; font-family:cursive; font-size:18px; padding:5px; margin:0 4px; width:20%;">$1</span>`
    )
    return `
      <!DOCTYPE HTML>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            /* Enforce page breaks */
            hr[data-type="pagebreak"] {
              border: none;
              margin: 0;
              padding: 0;
              page-break-before: always;
              break-before: always;
            }
          </style>
          <link rel="stylesheet" href="/assets/pdf.css">
      </head>
      <body>
          ${tiptapHtmlOutput}
      </body>
      </html>
    `
  }

  const updatePdfPreview = async () => {
    if (!editor) return

    const htmlTemplate = generateHtmlTemplate()
    const tempElement = document.createElement('div')
    tempElement.innerHTML = htmlTemplate

    const options = {
      margin: 10,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    try {
      const pdfArrayBuffer = await html2pdf()
        .set(options)
        .from(tempElement)
        .outputPdf('arraybuffer')
      const pdf = await pdfjsLib.getDocument({ data: pdfArrayBuffer }).promise
      setPdfDoc(pdf)
      setCurrentPage(1)
    } catch (error) {
      console.error('Error generating PDF preview:', error)
    }
  }

  const renderPage = async (pageNum, pdfDocument) => {
    try {
      const page = await pdfDocument.getPage(pageNum)
      const scale = 1.5
      const viewport = page.getViewport({ scale })
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = viewport.width
      canvas.height = viewport.height
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      }
      await page.render(renderContext).promise
    } catch (error) {
      console.error('Error rendering page:', error)
    }
  }

  // On editor load, automatically update the PDF preview.
  useEffect(() => {
    if (editor) {
      updatePdfPreview()
    }
  }, [editor])

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage, pdfDoc)
    }
  }, [pdfDoc, currentPage])

  const downloadPdf = async () => {
    if (!editor) return

    const htmlTemplate = generateHtmlTemplate()
    const tempElement = document.createElement('div')
    tempElement.innerHTML = htmlTemplate

    const options = {
      margin: 10,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    html2pdf().set(options).from(tempElement).save()
  }

  if (!editor) return null

  return (
    <div>
      {/* Editor */}
      <RichTextEditor advancedEditor={editor}
          extensions={ExtensionsList}
          {...props}
      >
        <EditorContent editor={editor} />
      </RichTextEditor>

      {/* PDF Pagination at the Top */}
      {pdfDoc && (
        <Pagination
            current={currentPage}
            marginTop="md"
            onChange={(page) => setCurrentPage(page)}
            range={5}
            total={pdfDoc.numPages}
        />
      )}

      {/* Controls */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={updatePdfPreview}>Update PDF Preview</button>
        <button onClick={downloadPdf}
            style={{ marginLeft: '10px' }}
        >
          Download PDF
        </button>
        <button
            onClick={() =>
            editor.chain().focus().insertContent('<hr data-type="pagebreak" /><p></p>').run()
          }
            style={{ marginLeft: '10px' }}
        >
          Insert Page Break
        </button>
      </div>

      {/* PDF Preview Canvas */}
      <div style={{ marginTop: '20px' }}>
        <canvas ref={canvasRef}
            style={{ border: '1px solid #ccc' }}
        />
      </div>

      {/* PDF Pagination at the Bottom */}
      {pdfDoc && (
        <Pagination
            current={currentPage}
            marginTop="md"
            onChange={(page) => setCurrentPage(page)}
            range={5}
            total={pdfDoc.numPages}
        />
      )}
    </div>
  )
}

export default RichTextEditorMoreExtensions
