/* global globalThis */

export async function copyText(value: string, format = 'text/plain'): Promise<boolean> {
  try {
    if (format === 'text/plain') {
      await navigator.clipboard.writeText(value)
    } else {
      // These native APIs are newer than the project's TypeScript DOM types.
      const { ClipboardItem } = globalThis as typeof globalThis & {
        ClipboardItem: new (data: Record<string, Blob>) => object,
      }
      const clipboard = navigator.clipboard as typeof navigator.clipboard & {
        write: (items: object[]) => Promise<void>,
      }
      await clipboard.write([
        new ClipboardItem({ [format]: new Blob([value], { type: format }) }),
      ])
    }
    return true
  } catch {
    return false
  }
}
