import React from "react"
import { Button } from "../../"

const ButtonHover = (props) => (
  <div>
    <div>
      <Button
          hover={{ background: "info" }}
          marginRight='lg'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Color 1'
          {...props}
      />{" "}
      <Button
          hover={{ background: "success_subtle" }}
          marginRight='lg'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Color 2'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ background: "warning_subtle" }}
          marginRight='lg'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Color 3'
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
          text='Shadow Deep'
          {...props}
      />{" "}
      <Button
          hover={{ shadow: "deeper" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow Deeper'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ shadow: "deepest" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Shadow Deepest'
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
          text='Scale Small'
          {...props}
      />{" "}
      <Button
          hover={{ scale: "md" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Scale Medium'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ scale: "lg" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Scale Large'
          variant='link'
          {...props}
      />
    </div>
    <div>
      <Button
          hover={{ background: "error_subtle", shadow: "deep" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          {...props}
      />{" "}
      <Button
          hover={{ background: "info_subtle", shadow: "deeper" }}
          marginRight='lg'
          marginTop='xl'
          onClick={() => alert("button clicked!")}
          tabIndex={0}
          text='Multiple Attributes'
          variant='secondary'
          {...props}
      />{" "}
      <Button
          hover={{ background: "success_subtle", shadow: "deepest" }}
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
