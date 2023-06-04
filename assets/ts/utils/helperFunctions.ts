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

export const showSuccessToast = (toast: any) => {
  toast.current!.show({
    severity: 'success',
    summary: 'Success',
    detail: 'You have successfully added this item to your page',
  })
}

export const showProcessingToast = (toast: any) => {
  toast.current!.show({
    severity: 'info',
    summary: 'Processing',
    detail: 'Working...',
  })
}
