const copyUrlToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).catch((error) => {
    console.error('URL kopyalanırken bir hata oluştu:', error)
  })
}

export { copyUrlToClipboard }
