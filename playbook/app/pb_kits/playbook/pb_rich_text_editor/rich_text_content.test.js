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

test("allows web, mail, phone, and relative links, and image data urls", () => {
  const { container } = render(
    <RichTextContent
        html={'<a href="https://example.com">Https</a><a href="mailto:ada@example.com">Mail</a><a href="tel:+15551212">Phone</a><a href="/tickets/1">Ticket</a><a href="#notes">Notes</a><img alt="photo" src="data:image/png;base64,abc">'}
    />
  );

  expect([...container.querySelectorAll("a")].map((link) => link.getAttribute("href"))).toEqual([
    "https://example.com",
    "mailto:ada@example.com",
    "tel:+15551212",
    "/tickets/1",
    "#notes",
  ]);
  expect(container.querySelector("img").getAttribute("src")).toBe("data:image/png;base64,abc");
});

test("drops links and images that use a non-web scheme", () => {
  const { container } = render(
    <RichTextContent
        html={'<a href="file:///etc/passwd">File</a><a href="intent://scan/#Intent;scheme=https;end">Intent</a><a href="ms-officecmd:ofe|u|https://example.com">Office</a><img alt="local" src="file:///tmp/pixel.png"><img alt="html" src="data:text/html,hi">'}
    />
  );

  container.querySelectorAll("a").forEach((link) => {
    expect(link.getAttribute("href")).toBeNull();
  });
  expect([...container.querySelectorAll("a")].map((link) => link.textContent)).toEqual([
    "File",
    "Intent",
    "Office",
  ]);
  expect(container.querySelector("img")).toBeNull();
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

test("forces noopener noreferrer when a link opens a new window", () => {
  const { container } = render(
    <RichTextContent
        html={'<a href="https://example.com" rel="opener" target="_blank">Open</a><a href="https://example.com" rel="Opener" target="_BLANK">Also</a>'}
    />
  );

  container.querySelectorAll("a").forEach((link) => {
    const rel = link.getAttribute("rel").split(/\s+/);
    expect(link.getAttribute("target")).toBe("_blank");
    expect(rel).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
    expect(rel).not.toContain("opener");
  });
});

test("drops event handler attributes such as onerror", () => {
  const { container } = render(
    <RichTextContent html={'<img src="x" onerror="alert(document.cookie)"><p onclick="alert(1)">Text</p>'} />
  );

  expect(container.querySelector("img").getAttribute("onerror")).toBeNull();
  expect(container.querySelector("p").getAttribute("onclick")).toBeNull();
  expect(container.innerHTML).not.toContain("alert");
});

test("keeps highlight, subscript, and superscript", () => {
  const { container } = render(
    <RichTextContent
        html={'<p><mark data-color="#ffee00" style="background-color: #ffee00; color: red; background-image: url(javascript:alert(1))">Hi</mark> <sub>2</sub><sup>3</sup></p><mark style="background-color: expression(alert(1))">No</mark>'}
    />
  );

  const highlight = container.querySelector("p mark");
  expect(highlight.textContent).toBe("Hi");
  expect(highlight.style.backgroundColor.replace(/\s/g, "")).toMatch(/#ffee00|rgb\(255,238,0\)/i);
  expect(highlight.style.color).toBe("");
  expect(highlight.getAttribute("style")).not.toContain("javascript");
  expect(container.querySelector("sub").textContent).toBe("2");
  expect(container.querySelector("sup").textContent).toBe("3");

  const rejected = container.querySelectorAll("mark")[1];
  expect(rejected.textContent).toBe("No");
  expect(rejected.style.backgroundColor).toBe("");
  expect(rejected.getAttribute("style") || "").not.toContain("expression");
});

test("keeps text alignment and drops every other inline style", () => {
  const { container } = render(
    <RichTextContent
        html={'<p style="color: red; text-align: right; background: url(javascript:alert(1))">Aligned</p><h2 style="text-align: expression(alert(1))">Nope</h2>'}
    />
  );

  const paragraph = container.querySelector("p");
  expect(paragraph.style.textAlign).toBe("right");
  expect(paragraph.getAttribute("style")).not.toContain("color");
  expect(paragraph.getAttribute("style")).not.toContain("javascript");
  expect(container.querySelector("h2").style.textAlign).toBe("");
});

test("keeps strikethrough from older Trix content", () => {
  const { container } = render(
    <RichTextContent html={"<div><del>Deleted</del> and <strike>struck</strike></div>"} />
  );

  expect(container.querySelector("del").textContent).toBe("Deleted");
  expect(container.querySelector("strike").textContent).toBe("struck");
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
