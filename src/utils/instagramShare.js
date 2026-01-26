/**
 * Instagram Share Utility
 *
 * Semi-automatic sharing: Downloads the sticker photo and copies
 * a pre-formatted caption to clipboard for manual posting to Instagram.
 */

/**
 * Generate an Instagram-ready caption for a venue
 * @param {Object} venue - The venue object
 * @returns {string} Formatted caption with hashtags
 */
export function generateInstagramCaption(venue) {
  const lines = []

  // Title line
  lines.push(`Introducing ${venue.name} - a Good Wee Place!`)
  lines.push('')

  // Description if available
  if (venue.description) {
    lines.push(venue.description)
    lines.push('')
  }

  // Address
  lines.push(`Find them at: ${venue.address}`)
  lines.push('')

  // Website if available
  if (venue.website) {
    lines.push(`Visit: ${venue.website}`)
    lines.push('')
  }

  // Hashtags
  lines.push('#GoodWeePlace #TransInclusive #TransAlly #GlasgowVenues #SafeSpaces #TransRights #LGBTQGlasgow #TransFriendly #InclusiveSpaces #Scotland')

  return lines.join('\n')
}

/**
 * Download an image from a URL
 * @param {string} url - The image URL
 * @param {string} filename - The filename for the download
 * @returns {Promise<boolean>} Whether the download was initiated
 */
export async function downloadImage(url, filename) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }

    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up the blob URL
    URL.revokeObjectURL(blobUrl)

    return true
  } catch (error) {
    console.error('Error downloading image:', error)
    return false
  }
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} Whether the copy was successful
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError)
      return false
    }
  }
}

/**
 * Main function to prepare content for Instagram sharing
 * Downloads the sticker photo and copies caption to clipboard
 * @param {Object} venue - The venue object
 * @returns {Promise<{success: boolean, message: string, hasPhoto: boolean}>}
 */
export async function shareToInstagram(venue) {
  const caption = generateInstagramCaption(venue)
  const hasPhoto = !!venue.sticker_photo_url

  // Copy caption to clipboard
  const captionCopied = await copyToClipboard(caption)

  if (!captionCopied) {
    return {
      success: false,
      message: 'Failed to copy caption to clipboard. Please try again.',
      hasPhoto
    }
  }

  // If there's a photo, download it
  if (hasPhoto) {
    // Create a clean filename from the venue name
    const cleanName = venue.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const filename = `goodweeplace-${cleanName}.jpg`

    const photoDownloaded = await downloadImage(venue.sticker_photo_url, filename)

    if (photoDownloaded) {
      return {
        success: true,
        message: `Photo downloaded and caption copied to clipboard!\n\nOpen Instagram, create a new post, select the downloaded photo, and paste the caption.`,
        hasPhoto: true
      }
    } else {
      return {
        success: true,
        message: `Caption copied to clipboard, but photo download failed.\n\nTry right-clicking the sticker photo above and selecting "Save Image As" to download manually.`,
        hasPhoto: true
      }
    }
  }

  // No photo available
  return {
    success: true,
    message: `Caption copied to clipboard!\n\nNote: This venue doesn't have a sticker photo yet.`,
    hasPhoto: false
  }
}
