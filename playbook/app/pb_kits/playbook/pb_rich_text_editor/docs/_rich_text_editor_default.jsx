import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import Caption from '../../pb_caption/_caption'
// The TrixEditor and Trix imports are required for the Legacy RichTextEditor to work 
// They are passed as props to the RichTextEditor kit
import { TrixEditor } from 'react-trix' 
import Trix from 'trix'

const RichTextEditorDefault = (props) => {
  const [value, setValue] = useState('Add your text here. You can format your text, add links, quotes, and bullets.'),
  handleOnChange = (html) => setValue(html)

  return (
    <div>
      <Caption marginBottom="xs" 
          text="Default"
      />
      <RichTextEditor
          TrixEditor={TrixEditor}
          onChange={handleOnChange}
          trixInstance={Trix}
          value={value}
          {...props}
      />
      <br/>
      <Caption marginBottom="xs" 
          text="Simple"
      />
      <RichTextEditor
          TrixEditor={TrixEditor}
          simple
          trixInstance={Trix}
          {...props}
      />
      <br/>
      <Caption marginBottom="xs" 
          text="Focus"
      />
      <RichTextEditor
          TrixEditor={TrixEditor}
          focus
          trixInstance={Trix}
          {...props}
      />
      <br/>
      <Caption marginBottom="xs" 
          text="Inline"
      />
      <RichTextEditor
          TrixEditor={TrixEditor}
          id="inline"
          inline
          toolbarBottom
          trixInstance={Trix}
          value="Try hovering over this text. Then try modifying it or adding more of your own text."
          {...props}
      />
      <br/>
      <Caption marginBottom="xs" 
          text="Sticky"
      />
      <RichTextEditor
          TrixEditor={TrixEditor}
          id="sticky"
          sticky
          trixInstance={Trix}
          value="In this example, when you scroll down, the rich text editor's toolbar will scroll along with the page and it will no longer be visible at the top of the page. Dummy text to enable scroll.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare lorem ut pellentesque tempor. Vivamus ut ex vestibulum velit rich text editor eleifend fringilla. Sed non metus dictum, elementum mauris wysiwyg html editor non, sagittis odio. Nullam pellentesque leo sit amet ante suscipit wysiwyg html editor sagittis. Donec tempus vulputate suscipit. Ut non felis rich text editor ac dolor pulvinar lacinia eu eget urna. Sed tincidunt sapien vulputate tellus fringilla sodales. Morbi accumsan dui wysiwyg html editor sed massa pellentesque, quis vestibulum lectus scelerisque. Nulla ultrices mi id felis luctus aliquet. Donec nec ligula wysiwyg html editor pretium sapien semper dictum eu id quam. Etiam ut sollicitudin nibh. Quisque eu ultrices dui. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus rich text editor mi eu consequat. Nullam tincidunt erat et placerat mattis. Nunc rich text editor congue, enim vitae dictum dignissim, libero nisl sagittis augue, non aliquet nibh tortor sit amet ex. Aliquam cursus maximus mi eu consequat. Nullam tincidunt erat et placerat mattis."
          {...props}
    />

    </div>
  )
}

export default RichTextEditorDefault
