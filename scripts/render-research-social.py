#!/usr/bin/env python3
"""Render a research share card; use a real waveform when a WAV sample exists."""

from __future__ import annotations

import argparse
import json
import struct
import sys
import wave
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def wrap(draw: ImageDraw.ImageDraw, value: str, font: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    current = ''
    for word in value.split():
        candidate = f'{current} {word}'.strip()
        if current and draw.textlength(candidate, font=font) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--collection', action='store_true', help='Render the Research & writing index card.')
    args = parser.parse_args()
    note = json.load(sys.stdin)
    candidates = [item for item in (note.get('samples') or {}).get('items', []) if item['src'].startswith('/assets/') and item['src'].lower().endswith('.wav')]
    sample = next((item for item in candidates if item['label'] == 'Happy'), candidates[0] if candidates else None)
    values: list[int] = []
    if sample:
        audio_path = Path('public') / sample['src'].lstrip('/')
        with wave.open(str(audio_path), 'rb') as audio:
            if audio.getnchannels() != 1 or audio.getsampwidth() != 2:
                raise ValueError('Expected 16-bit mono PCM audio.')
            frames = audio.readframes(audio.getnframes())
        values = [abs(value[0]) for value in struct.iter_unpack('<h', frames)]
        if not max(values, default=0):
            raise ValueError('The sample contains no audible waveform.')

    image = Image.new('RGB', (1200, 630), '#ffffff')
    draw = ImageDraw.Draw(image)
    font_path = 'public/fonts/geist-latin.woff2'
    meta = ImageFont.truetype(font_path, 21)
    summary = note['intro'] if args.collection else note['summary']
    byline = 'Ashish Prajapati  ·  AI engineer & full-stack developer' if args.collection else f"Ashish Prajapati  ·  {'Independent working paper' if note['kind'] == 'working-paper' else 'Article'}  ·  {note['date']}"
    body = ImageFont.truetype(font_path, 25)
    summary_lines = wrap(draw, summary, body, 1030)
    if len(summary_lines) > 2 or draw.textlength(byline, font=meta) > 1030:
        raise ValueError('Shorten the summary or byline to fit the social card.')
    for size in range(72 if args.collection else 60, 39, -4):
        heading = ImageFont.truetype(font_path, size)
        heading.set_variation_by_name('SemiBold')
        title_lines = wrap(draw, note['title'], heading, 1030)
        line_height = size + 12
        if len(title_lines) <= 3 and 66 + len(title_lines) * line_height + 18 + len(summary_lines) * 34 + 18 + 26 <= 365:
            break
    else:
        raise ValueError('Shorten the title to fit the social card.')
    y = 66
    for line in title_lines:
        draw.text((80, y), line, font=heading, fill='#292b28')
        y += line_height
    y += 18
    for line in summary_lines:
        draw.text((82, y), line, font=body, fill='#62655e')
        y += 34
    y += 18
    draw.text((82, y), byline, font=meta, fill='#72766c')
    draw.line((82, 385, 1118, 385), fill='#deded6', width=2)
    if values and sample:
        peak = max(values)
        bars = 160
        for index in range(bars):
            start = index * len(values) // bars
            end = (index + 1) * len(values) // bars
            height = max(2, round(max(values[start:end], default=0) / peak * 70))
            x = 82 + round(index * 1036 / (bars - 1))
            draw.line((x, 477 - height, x, 477 + height), fill='#48634b', width=3)
        draw.text((82, 572), f"{sample['label']} sample · normalized waveform", font=meta, fill='#62655e')
    else:
        draw.text((82, 438), 'Working papers  ·  Experiments  ·  Notes', font=body, fill='#48634b')
        draw.text((82, 572), 'ashishprajapati.me', font=meta, fill='#62655e')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    image.save(args.output, format='PNG', optimize=True)
    print(f'Rendered {args.output}', file=sys.stderr)


if __name__ == '__main__':
    main()
