function copyWithSelection(text: string) {
  const textarea = document.createElement('textarea')

  textarea.value = text
  textarea.readOnly = true
  textarea.className = 'fixed top-0 left-0 text-base opacity-0'

  document.body.appendChild(textarea)

  try {
    textarea.focus()
    textarea.select()
    textarea.setSelectionRange(0, text.length)

    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    textarea.remove()
  }
}

export async function copyText(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)

      return true
    } catch {
      return copyWithSelection(text)
    }
  }

  return copyWithSelection(text)
}
