// =============================================================================
// Terms Content Hashing — SHA-256
//
// Generates a deterministic hash of T&Cs text for verifying that the terms
// shown to the customer at page load match the current version at submission.
//
// Uses the Web Crypto API (crypto.subtle.digest) which is available in:
//   - All modern browsers
//   - Node.js 15+ (globalThis.crypto)
//   - Next.js Edge and Node runtimes
//
// Isomorphic: safe to import in both client and server code.
// =============================================================================

/**
 * Generate a SHA-256 hex digest of the given text.
 * Returns a lowercase hex string (64 chars).
 */
export async function hashTermsContent(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
