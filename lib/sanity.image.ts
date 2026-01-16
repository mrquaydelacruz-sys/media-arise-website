import imageUrlBuilder from '@sanity/image-url'
import {client} from './sanity.client'

// Check if client is properly initialized
const isClientValid = client && typeof client === 'object' && 'projectId' in client
const builder = isClientValid ? imageUrlBuilder(client as any) : null

export function urlFor(source: any) {
  if (!builder || !source) {
    // Return a mock builder that returns empty string if source is invalid
    return {
      width: () => ({ 
        height: () => ({ 
          url: () => source?.asset?.url || '' 
        }) 
      }),
      height: () => ({ 
        width: () => ({ 
          url: () => source?.asset?.url || '' 
        }) 
      }),
      url: () => source?.asset?.url || ''
    } as any
  }
  return builder.image(source)
}
