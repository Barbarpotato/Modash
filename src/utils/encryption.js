export async function hash(text) {
    const encodedText = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
