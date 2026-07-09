import React from "react"
import figma from "@figma/code-connect/react"
import Title from "../_title"

figma.connect(
  Title,
  "https://www.figma.com/design/Zj4FIeaa9fyMn2LcuL15hG/Playbook-Design-System-Library?node-id=98-815",
  {
    props: {
      text: figma.textContent("@text"),
      size: figma.enum("Size", {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
      }),
      color: figma.enum("Color", {
        default: "default",
        light: "light",
        lighter: "lighter",
        link: "link",
        success: "success",
        error: "error",
      }),
      bold: figma.enum("Bold", {
        true: true,
        false: false,
      }),
    },
    example: ({ bold, color, size, text }) => (
      <Title
          bold={bold}
          color={color}
          size={size}
          text={text}
      />
    ),
  }
)
