export async function bufferToBase64(buffer) {
  // use a FileReader to generate a base64 data URI:
  const base64url = await new Promise<string>((r) => {
    const reader = new FileReader();
    reader.onload = () => r(reader.result as string);
    reader.readAsDataURL(new Blob([buffer]));
  });
  // remove the `data:...;base64,` part from the start
  return base64url.slice(base64url.indexOf(',') + 1);
}

function base64StringToArrayBuffer(b64str) {
  var byteStr = atob(b64str);
  var bytes = new Uint8Array(byteStr.length);
  for (var i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i);
  }
  return bytes.buffer;
}

export function importKey(key: string): Promise<CryptoKey> {
  const pemContent = key
    .match(/BEGIN PRIVATE KEY-+(.*)-+END PRIVATE KEY/s)?.[1]
    ?.replace(/\s+/g, '')
    ?.replace(/(^-+|-+$)/g, '');

  const encodedKey = base64StringToArrayBuffer(pemContent);

  return crypto.subtle.importKey(
    'pkcs8',
    encodedKey,
    {
      name: 'RSASSA-PKCS1-v1_5',
      length: 2048,
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
}
