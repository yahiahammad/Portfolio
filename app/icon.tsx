import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

async function loadFont() {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=block',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120' } },
    ).then((r) => r.text())
    const url = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1]
    if (!url) return null
    return fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Icon() {
  const fontData = await loadFont()
  const font = fontData ? 'JetBrains Mono' : '"Courier New", monospace'

  const textStyle = {
    fontFamily: font,
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: '0.04em',
    lineHeight: 1,
  } as const

  return new ImageResponse(
    (
      <div
        style={{
          background: '#080809',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ ...textStyle, color: '#f1f1f3' }}>YH</span>
          <span style={{ ...textStyle, color: '#3b82f6' }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: 'JetBrains Mono', data: fontData, weight: 500, style: 'normal' as const }] }
        : {}),
    },
  )
}
