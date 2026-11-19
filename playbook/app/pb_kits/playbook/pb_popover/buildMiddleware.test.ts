import { buildMiddleware, PopperLikeModifier } from "./_popover"

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- middleware options are inspected loosely in assertions
type MiddlewareLike = { name: string; options?: any }

const names = (middleware: MiddlewareLike[]) => middleware.map((m) => m.name)
// @floating-ui/react wraps each middleware and stores its options as `[options, deps]`.
const optionsOf = (middleware: MiddlewareLike[], name: string) =>
  middleware.find((m) => m.name === name)?.options?.[0]

describe("buildMiddleware (Popper.js modifier translation)", () => {
  test("defaults to offset + flip + shift, with the 20px offset only when `offset` is on", () => {
    expect(names(buildMiddleware(false))).toEqual(["offset", "flip", "shift"])
    expect(optionsOf(buildMiddleware(false), "offset")).toBe(0)
    expect(optionsOf(buildMiddleware(true), "offset")).toBe(20)
    expect(optionsOf(buildMiddleware(true), "flip")).toEqual({ fallbackStrategy: "initialPlacement" })
  })

  test("translates a [skidding, distance] offset tuple", () => {
    const middleware = buildMiddleware(true, [{ name: "offset", options: { offset: [-10, 4] } }])
    expect(optionsOf(middleware, "offset")).toEqual({ mainAxis: 4, crossAxis: -10 })
  })

  test("translates a function offset without throwing", () => {
    const popperFn = jest.fn(({ placement }) => (placement === "top" ? [2, 6] : [0, 0]))
    const middleware = buildMiddleware(false, [{ name: "offset", options: { offset: popperFn } }])
    const derive = optionsOf(middleware, "offset")
    const rects = { floating: { x: 0, y: 0, width: 10, height: 10 }, reference: { x: 0, y: 0, width: 20, height: 20 } }

    expect(derive({ placement: "top", rects })).toEqual({ mainAxis: 6, crossAxis: 2 })
    expect(popperFn).toHaveBeenCalledWith({ placement: "top", popper: rects.floating, reference: rects.reference })
  })

  test("accepts a numeric offset as the distance", () => {
    const middleware = buildMiddleware(false, [{ name: "offset", options: { offset: 8 } }])
    expect(optionsOf(middleware, "offset")).toBe(8)
  })

  test("honours enabled: false (boolean or string) on offset, flip and preventOverflow", () => {
    const disabled: PopperLikeModifier[] = [
      { name: "offset", enabled: false, options: { offset: [0, 4] } },
      { name: "flip", enabled: "false" },
      { name: "preventOverflow", enabled: false },
    ]
    expect(names(buildMiddleware(true, disabled))).toEqual([])
  })

  test("passes flip fallbackPlacements, flipVariations and padding through (Nitro MoveUpButton)", () => {
    const fallbackPlacements = ["left", "right-start", "left-start", "top"]
    const middleware = buildMiddleware(false, [
      { name: "flip", enabled: "true", options: { fallbackPlacements, flipVariations: false, padding: 8, boundary: "clippingParents" } },
    ])
    expect(optionsOf(middleware, "flip")).toEqual({
      fallbackStrategy: "initialPlacement",
      fallbackPlacements,
      flipAlignment: false,
      padding: 8,
    })
  })

  test("maps preventOverflow altAxis and padding onto shift", () => {
    const middleware = buildMiddleware(false, [{ name: "preventOverflow", options: { altAxis: true, padding: 4 } }])
    expect(optionsOf(middleware, "shift")).toEqual({ crossAxis: true, padding: 4 })
  })

  test.each([
    ["auto", null],
    ["auto-start", "start"],
    ["auto-end", "end"],
  ] as const)("maps %s placement to autoPlacement() instead of flip()", (placement, alignment) => {
    const middleware = buildMiddleware(false, [], placement)
    expect(names(middleware)).toEqual(["offset", "autoPlacement", "shift"])
    expect(optionsOf(middleware, "autoPlacement")).toMatchObject({ alignment, autoAlignment: true })
  })

  test("accepts Popper modifier shapes consumers pass today (Tempo, Nitro)", () => {
    // Tempo: a shared const with `phase` and a number[] offset. Nitro: `enabled` as a string.
    const tempo = [{ enabled: true, name: "offset", options: { offset: [0, 4] }, phase: "main" }]
    const nitro: PopperLikeModifier[] = [{ name: "flip", enabled: "true", options: { fallbackPlacements: ["left"] } }]

    expect(optionsOf(buildMiddleware(false, tempo), "offset")).toEqual({ mainAxis: 4, crossAxis: 0 })
    expect(optionsOf(buildMiddleware(false, nitro), "flip").fallbackPlacements).toEqual(["left"])
  })
})
