import React from "react"
import { Button } from "../../"

const ButtonHover = (props) => (
  <div>
    <div>
      <Button
          hover={{ background: 'product_5_background' }}
          marginRight='lg'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Color'
          {...props}
      />{" "}
      <Button
          hover={{ background: 'text_lt_light' }}
          marginRight='lg'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Color'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ background: 'product_1_background' }}
          marginRight='lg'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Color'
          variant='link'
          {...props}
      />
    </div>
    <div>
      <Button
          hover={{ shadow: "deep" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow'
          {...props}
      />{" "}
      <Button
          hover={{ shadow: "deeper" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ shadow: "deepest" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow'
          variant='link'
          {...props}
      />
    </div>
    <div>
      <Button
          hover={{ background: "data_4", shadow: "deep" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          {...props}
      />{" "}
      <Button
          hover={{ background: "data_4", shadow: "deeper" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ background: "data_4", shadow: "deepest" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          variant='link'
          {...props}
      />
    </div>
    <div>
      <Button
          hover={{ scale: "sm" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          {...props}
      />{" "}
      <Button
          hover={{ scale: "md" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ scale: "lg" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          variant='link'
          {...props}
      />
    </div>
  </div>
)

export default ButtonHover
