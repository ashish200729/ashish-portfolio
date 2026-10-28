#!/usr/bin/env python3
"""Render one ResearchNote JSON object from stdin as a printable working paper."""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def text(value: str) -> str:
    return escape(value, {'"': '&quot;'})


def register_fonts() -> tuple[str, str]:
    candidates = [
        ('/System/Library/Fonts/Supplemental/Arial.ttf', '/System/Library/Fonts/Supplemental/Arial Bold.ttf'),
        ('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'),
    ]
    for regular, bold in candidates:
        if Path(regular).is_file() and Path(bold).is_file():
            pdfmetrics.registerFont(TTFont('PaperSans', regular))
            pdfmetrics.registerFont(TTFont('PaperSansBold', bold))
            pdfmetrics.registerFontFamily('PaperSans', normal='PaperSans', bold='PaperSansBold')
            return 'PaperSans', 'PaperSansBold'
    raise RuntimeError('Install Arial or DejaVu Sans before rendering the paper.')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True, type=Path)
    parser.add_argument('--site', default='https://www.ashishprajapati.me')
    args = parser.parse_args()
    note = json.load(sys.stdin)
    regular, bold = register_fonts()
    ink = colors.HexColor('#292b28')
    muted = colors.HexColor('#62655e')
    accent = '#48634b'
    edge = colors.HexColor('#deded6')
    styles = {
        'title': ParagraphStyle('title', fontName=bold, fontSize=19, leading=24, textColor=ink, spaceAfter=9),
        'author': ParagraphStyle('author', fontName=regular, fontSize=11, leading=15, textColor=ink, spaceAfter=3),
        'meta': ParagraphStyle('meta', fontName=regular, fontSize=9, leading=13, textColor=muted, spaceAfter=17),
        'heading': ParagraphStyle('heading', fontName=bold, fontSize=11, leading=15, textColor=ink, spaceBefore=13, spaceAfter=5, keepWithNext=True),
        'body': ParagraphStyle('body', fontName=regular, fontSize=9.4, leading=14.2, textColor=ink, spaceAfter=7, allowWidows=0, allowOrphans=0),
        'small': ParagraphStyle('small', fontName=regular, fontSize=8.5, leading=12.5, textColor=muted, spaceAfter=7, allowWidows=0, allowOrphans=0),
        'reference': ParagraphStyle('reference', fontName=regular, fontSize=8.5, leading=12, textColor=ink, leftIndent=17, firstLineIndent=-17, spaceAfter=5, splitLongWords=True),
        'table': ParagraphStyle('table', fontName=regular, fontSize=9, leading=12, textColor=ink),
        'table-head': ParagraphStyle('table-head', fontName=bold, fontSize=9, leading=12, textColor=ink),
    }
    numbers = {reference['id']: index + 1 for index, reference in enumerate(note['references'])}

    def paragraph(item: dict, style: str = 'body') -> Paragraph:
        citations = item.get('citations', [])
        suffix = ' ' + ' '.join(f'[{numbers[citation]}]' for citation in citations) if citations else ''
        return Paragraph(text(item['text']) + suffix, styles[style])

    def link(label: str, url: str) -> Paragraph:
        absolute = args.site.rstrip('/') + url if url.startswith('/') else url
        return Paragraph(f'<link href="{text(absolute)}" color="{accent}">{text(label)}</link><br/>{text(absolute)}', styles['reference'])

    version_date = date.fromisoformat(note['modifiedAt']).strftime('%d %B %Y').lstrip('0') if note.get('modifiedAt') else note['date']
    story = [
        Paragraph(text(note['title']), styles['title']),
        Paragraph('Ashish Prajapati', styles['author']),
        Paragraph(f"Independent working paper | Version {text(version_date)}", styles['meta']),
        Paragraph('Abstract', styles['heading']),
    ]
    story.extend(paragraph(item) for item in note['abstract'])
    samples = note.get('samples')
    if samples:
        article_url = args.site.rstrip('/') + '/research/' + note['slug'] + '#samples'
        story.extend([
            Paragraph('Audio examples', styles['heading']),
            Paragraph(text(samples['description']) + ' The three audio examples are available on the <link href="' + text(article_url) + '" color="' + accent + '">interactive research page</link>.', styles['body']),
            Paragraph('“' + text(samples['text']) + '”', styles['body']),
            Paragraph(text(samples['note']), styles['small']),
        ])

    for section in note['sections']:
        story.append(Paragraph(text(section['title']), styles['heading']))
        story.extend(paragraph(item) for item in section['paragraphs'])
        comparison = section.get('comparison')
        if comparison:
            rows = [[Paragraph(label, styles['table-head']) for label in ('Tone', 'Base', 'Matched', 'Swapped')]]
            rows.extend([[Paragraph(text(row['tone']), styles['table'])] + [Paragraph(f"{row[key]:.6f}", styles['table']) for key in ('base', 'matched', 'swapped')] for row in comparison['rows']])
            table = Table(rows, colWidths=[82, 110, 110, 110], repeatRows=1, hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f3f3f3')),
                ('LINEBELOW', (0, 0), (-1, 0), 0.5, edge),
                ('LINEBELOW', (0, 1), (-1, -1), 0.4, edge),
                ('TOPPADDING', (0, 0), (-1, -1), 6),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ]))
            story.append(KeepTogether([
                Paragraph(text(comparison['title']), styles['heading']),
                table,
                Spacer(1, 6),
                Paragraph(text(comparison['note']), styles['small']),
            ]))

    story.append(PageBreak())
    story.append(Paragraph('References', styles['heading']))
    if samples:
        suffix = ' '.join(f"[{numbers[citation]}]" for citation in samples.get('attributionCitations', []))
        story.append(Paragraph(text(samples['attribution']) + ' ' + suffix, styles['small']))
    for index, reference in enumerate(note['references'], 1):
        story.append(link(f"[{index}] {reference['label']}", reference['url']))
    if note.get('records'):
        story.append(Paragraph('Experiment records', styles['heading']))
        story.extend(link(record['label'], record['url']) for record in note['records'])

    args.output.parent.mkdir(parents=True, exist_ok=True)
    document = SimpleDocTemplate(str(args.output), pagesize=A4, leftMargin=54, rightMargin=54, topMargin=53, bottomMargin=54,
                                 title=note['title'], author='Ashish Prajapati', subject='Independent working paper on expressive Pocket TTS')

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(edge)
        canvas.line(doc.leftMargin, 38, A4[0] - doc.rightMargin, 38)
        canvas.setFont(regular, 8)
        canvas.setFillColor(muted)
        canvas.drawString(doc.leftMargin, 25, 'Ashish Prajapati | Independent working paper')
        canvas.drawRightString(A4[0] - doc.rightMargin, 25, str(doc.page))
        canvas.restoreState()

    document.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f'Rendered {args.output}', file=sys.stderr)


if __name__ == '__main__':
    main()
