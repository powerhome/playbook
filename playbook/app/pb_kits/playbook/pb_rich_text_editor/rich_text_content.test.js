import React from "react";
import { render } from "../utilities/test-utils";

import RichTextContent from "./_rich_text_content";

test("keeps headings, lists, and code that Markdown would flatten", () => {
  const { container } = render(
    <RichTextContent
        html={"<h3>Title</h3><pre><code>const x = 1</code></pre><h2>Next</h2><ul><li><p>Alpha</p></li><li><p>Beta</p></li></ul>"}
    />
  );

  expect(container.querySelector("h3").textContent).toBe("Title");
  expect(container.querySelector("pre code").textContent).toBe("const x = 1");
  expect(container.querySelector("h2").textContent).toBe("Next");
  expect([...container.querySelectorAll("ul li")].map((item) => item.textContent)).toEqual([
    "Alpha",
    "Beta",
  ]);
  expect(container.querySelector(".tiptap-content")).not.toBeNull();
});

test("keeps an ordered list when the body also has a mention", () => {
  const { container } = render(
    <RichTextContent
        html={'<p><span data-id="u#4" data-label="Aaron George" data-type="mention">@Aaron George</span> including</p><ol><li><p>engineering</p></li><li><p>bottlenecks</p></li></ol>'}
        renderMention={({ label }) => <strong>{`@${label}`}</strong>}
    />
  );

  expect(container.querySelector("strong").textContent).toBe("@Aaron George");
  expect([...container.querySelectorAll("ol li")].map((item) => item.textContent)).toEqual([
    "engineering",
    "bottlenecks",
  ]);
});

test("rejects scheme bypasses that hide javascript or vbscript in whitespace", () => {
  const { container } = render(
    <RichTextContent
        html={"<a href=\"java\tscript:alert(1)\">Tab</a><a href=\"javascript\n:alert(1)\">Newline</a><a href=\"vb\tscript:msgbox\">Script</a><img alt=\"x\" src=\"java\tscript:alert(1)\">"}
    />
  );

  container.querySelectorAll("a").forEach((link) => {
    expect(link.getAttribute("href")).toBeNull();
  });
  expect(container.querySelector("img")).toBeNull();
});

test("keeps allowlisted classes on React 17", () => {
  const { container } = render(
    <RichTextContent html={'<div class="note"><span class="mention-user">@A</span></div>'} />
  );

  expect(container.querySelector("div.note")).not.toBeNull();
  expect(container.querySelector("span.mention-user")).not.toBeNull();
});

test("drops scripts and javascript urls", () => {
  const { container } = render(
    <RichTextContent
        html={'<p>Safe</p><script>alert(1)</script><a href="javascript:alert(1)">Click</a><img src="javascript:alert(1)" alt="hidden">'}
    />
  );

  expect(container.querySelector("p").textContent).toBe("Safe");
  expect(container.querySelector("script")).toBeNull();
  expect(container.innerHTML).not.toContain("javascript:");
  expect(container.querySelector("img")).toBeNull();
  expect(container.querySelector("a").textContent).toBe("Click");
  expect(container.querySelector("a").getAttribute("href")).toBeNull();
});
