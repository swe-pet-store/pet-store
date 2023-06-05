export function categoryTranslator(category: string) {
  switch (category) {
    case 'Dog':
      return 1
    case 'Cat':
      return 2
    case 'Other':
      return 3
    case 'All':
      return 0
    default:
      return null
  }
}

export function blobsToBase64(blobs: Blob[]) {
  return Promise.all(blobs.map(blobToBase64))
}

export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}

export function base64ToBlob(base64String: string, contentType: any) {
  const byteCharacters = atob(base64String)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

export function base64ArrayToBlobArray(
  base64Array: string | any[],
  contentType: any,
) {
  const blobArray: never[] = []
  for (let i = 0; i < base64Array.length; i++) {
    try {
      // const blob = base64ToBlob(base64Array[i], contentType)
      // blobArray.push(blob)
    } catch (error) {
      console.error(
        `Error converting Base64 string to Blob at index ${i}:`,
        error,
      )
    }
  }
  return blobArray
}

export const showWarningToast = (toast: any) => {
  toast.current!.show({
    severity: 'warn',
    summary: 'Warning',
    detail: 'You can only add up to 5 additional images per item',
  })
}

export const showErrorToast = (toast: any, err: any) => {
  toast.current!.show({
    severity: 'error',
    summary: 'Error',
    detail: `There was a problem with adding the item to your profile. ${err}`,
    life: 5000,
  })
}

export const showSuccessToast = (toast: any, toastDetail: string) => {
  toast.current!.show({
    severity: 'success',
    summary: 'Success',
    detail: toastDetail,
  })
}

export const showProcessingToast = (toast: any) => {
  toast.current!.show({
    severity: 'info',
    summary: 'Processing',
    detail: 'Working...',
  })
}
