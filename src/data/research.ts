export interface ResearchReference {
  id: string;
  label: string;
  url: string;
}

export interface ResearchParagraph {
  text: string;
  citations?: string[];
}

export interface ResearchComparison {
  title: string;
  description: string;
  rows: Array<{ tone: string; base: number; matched: number; swapped: number }>;
  note: string;
}

export interface ResearchSection {
  id: string;
  title: string;
  paragraphs: ResearchParagraph[];
  comparison?: ResearchComparison;
}

export interface ResearchNote {
  slug: string;
  kind: 'working-paper' | 'article';
  projectSlug?: string;
  pdfUrl?: string;
  socialImage?: { src: string; alt: string };
  title: string;
  summary: string;
  date: string;
  createdAt: string;
  modifiedAt?: string;
  publishedAt?: string;
  keywords: string[];
  abstract: ResearchParagraph[];
  samples?: {
    text: string;
    description: string;
    note: string;
    attribution: string;
    attributionCitations?: string[];
    items: Array<{ label: string; src: string }>;
  };
  sections: ResearchSection[];
  references: ResearchReference[];
  records?: Array<{ label: string; url: string }>;
}

export const RESEARCH_COLLECTION = {
  title: 'Research & writing',
  intro: 'Working papers, experiments, and notes on building AI systems.',
  description: 'Working papers, experiments, and notes by Ashish Prajapati on AI models and speech.',
  socialImage: {
    src: '/assets/research/social.png',
    alt: 'Research & writing by Ashish Prajapati: working papers, experiments, and notes on building AI systems.',
  },
} as const;

/** Add future papers or articles here. Audio, figures, records, and a project link are optional. */
export const RESEARCH_NOTES: ResearchNote[] = [
  {
    slug: 'expressive-pocket-tts',
    kind: 'working-paper',
    projectSlug: 'expressive-pocket-tts',
    pdfUrl: '/research/expressive-pocket-tts/paper.pdf',
    socialImage: { src: '/assets/research/pocket-tts/social.png', alt: 'Paper title and author above the normalized Happy speech waveform.' },
    title: 'Fine-tuning Pocket TTS for expressive speech',
    summary: 'A small-scale study of happy and sad speech adaptation, with audio examples and held-out reconstruction results.',
    date: 'October 2026',
    createdAt: '2026-10-27',
    modifiedAt: '2026-10-27',
    keywords: ['Pocket TTS', 'expressive speech', 'text-to-speech', 'fine-tuning', 'LoRA'],
    abstract: [
      {
        text: 'This exploratory study adapts Kyutai’s English Pocket TTS model for happy and sad delivery while retaining a separate, unmodified natural baseline. A small joint run trained tone prefixes, low-rank adapters, and parts of the speech sampling path; Sad was then refined separately.',
        citations: ['pocket', 'experiment'],
      },
      {
        text: 'On 80 held-out utterances per emotion, matched-tone reconstruction error was lower than the original baseline. This is a small, preliminary step: the diagnostic does not measure perceived emotion, and the listening feedback was informal and unblinded.',
        citations: ['experiment'],
      },
    ],
    samples: {
      text: 'I am here. I am meeting you tomorrow, and I am looking forward to it.',
      description: 'Compare the same words, Anna voice, and random seed in three settings.',
      note: 'These are listening examples, not a controlled model-only ablation. Natural uses paragraph grouping; Happy and Sad use sentence-level pacing and a local speech-content check.',
      attribution: 'The generated examples use Anna, a VCTK p228 voice state distributed by Kyutai. The CSTR VCTK Corpus is by Junichi Yamagishi, Christophe Veaux, and Kirsten MacDonald at the University of Edinburgh, and is licensed CC BY 4.0.',
      attributionCitations: ['voices', 'vctk'],
      items: [
        { label: 'Natural', src: '/assets/research/pocket-tts/natural.wav' },
        { label: 'Happy', src: '/assets/research/pocket-tts/happy.wav' },
        { label: 'Sad', src: '/assets/research/pocket-tts/sad.wav' },
      ],
    },
    sections: [
      {
        id: 'introduction',
        title: 'Introduction',
        paragraphs: [
          {
            text: 'Expressive text-to-speech needs to convey a delivery style without losing the words or speaker identity. The question here was whether a compact English speech model could learn useful happy and sad controls while leaving its original natural model available.',
            citations: ['pocket', 'experiment'],
          },
        ],
      },
      {
        id: 'method',
        title: 'Method',
        paragraphs: [
          {
            text: 'Starting from the released six-layer Pocket TTS model, I added eight learned tone-prefix tokens and rank-16 low-rank adapters across its six transformer layers. The distilled sampling head and end-of-speech head were also trained, for 12,921,889 trainable parameters in the joint run.',
            citations: ['pocket', 'lora', 'experiment'],
          },
          {
            text: 'The objective combined flow and consistency terms, end-of-speech supervision, and a ranking term comparing the correct tone with the opposite tone. This was a custom direct adaptation of the released small model, rather than a reproduction of the official teacher-then-distillation recipe.',
            citations: ['training-guide', 'experiment'],
          },
        ],
      },
      {
        id: 'data',
        title: 'Data and training',
        paragraphs: [
          {
            text: 'The joint run used expressive read speech from four Expresso actors. Its accepted cache contained 2,493 training, 277 validation, and 255 test utterances, with text-grouped splits and separate neutral voice references. These splits do not establish generalization to unseen speakers.',
            citations: ['expresso', 'experiment'],
          },
          {
            text: 'The corrected joint run completed 5,000 updates on a Tesla T4 using seed 4117. I selected its step-1,500 Happy checkpoint after listening because later updates showed word regressions. A separate 1,000-update Sad refinement used seed 5083 and added 80 strong-sad RAVDESS training clips from 20 actors; 16 targets from other actors were reserved for validation.',
            citations: ['ravdess', 'experiment'],
          },
        ],
      },
      {
        id: 'evaluation',
        title: 'Evaluation',
        paragraphs: [
          {
            text: 'After checkpoint selection was fixed, I evaluated 20 held-out utterances per actor and emotion: 80 Happy and 80 Sad. For each tone I compared the original model, the adapted checkpoint with the matched tone, and that same checkpoint with the opposite tone. Evaluation used fixed seed 2718.',
            citations: ['experiment'],
          },
          {
            text: 'The metric is frame-weighted, teacher-forced diagonal velocity mean squared error. It is a reconstruction diagnostic: a lower value does not by itself establish that listeners hear the intended emotion or that the voice is more natural.',
          },
        ],
      },
      {
        id: 'results',
        title: 'Results',
        paragraphs: [
          {
            text: 'The matched conditions reduced this particular error metric relative to the baseline in both held-out groups. Each reduction is approximately 16.9% relative to its baseline. The sample is small and there is no confidence interval or multi-seed replication, so this is an early signal rather than a broad quality claim.',
            citations: ['experiment'],
          },
        ],
        comparison: {
          title: 'Held-out reconstruction error',
          description: 'Choose an emotion to compare the three conditions. Lower is better for this diagnostic.',
          rows: [
            { tone: 'Happy', base: 0.6420358120435465, matched: 0.5334408599703384, swapped: 0.6315003134057006 },
            { tone: 'Sad', base: 0.5692281353876962, matched: 0.4731223909493737, swapped: 0.5551238407343126 },
          ],
          note: 'Matched and swapped use the same adapted checkpoint with the intended or opposite tone. The base is the original model. These values are not emotion-recognition accuracy or a perceptual score.',
        },
      },
      {
        id: 'discussion',
        title: 'Discussion',
        paragraphs: [
          {
            text: 'A separate generated-speech check covered 48 clips across two voices, three tones, four texts, and two seeds. A local speech recognizer produced 39 exact matches after text normalization. Eight other differences concerned date or time rendering, and one was a word substitution; the recognizer can also make mistakes.',
            citations: ['experiment'],
          },
          {
            text: 'Early emotional outputs sometimes dropped later words. Generating complete sentences separately and checking for large omissions helped catch these failures, with retries when needed. One listener informally accepted examples of both emotional directions, but this was not a blinded listening study.',
            citations: ['experiment'],
          },
        ],
      },
      {
        id: 'limitations',
        title: 'Limitations and next steps',
        paragraphs: [
          {
            text: 'Each training stage was run once, rather than replicated across multiple seeds, with limited source speakers and informal feedback. RAVDESS has only two repeated statements, limiting what the Sad refinement can show about new text. The changes were combined, so this experiment cannot isolate which part caused the perceived difference.',
            citations: ['ravdess', 'experiment'],
          },
          {
            text: 'The shared records contain sample audio and exported metrics, but not the model checkpoints or a complete training environment. They are not a full reproduction package. Expresso and RAVDESS were used under non-commercial research licenses; their terms and the model and voice licenses need review before commercial use.',
            citations: ['expresso', 'ravdess'],
          },
          {
            text: 'A useful next step is a blinded, multi-listener comparison across more speakers and unseen text, measuring perceived emotion, naturalness, speaker identity, and word preservation separately.',
          },
        ],
      },
    ],
    references: [
      { id: 'pocket', label: 'Kyutai Labs. Pocket TTS.', url: 'https://github.com/kyutai-labs/pocket-tts' },
      { id: 'lora', label: 'Hu et al. LoRA: Low-Rank Adaptation of Large Language Models. 2021.', url: 'https://arxiv.org/abs/2106.09685' },
      { id: 'training-guide', label: 'Kyutai Labs. Training Pocket TTS.', url: 'https://github.com/kyutai-labs/pocket-tts/blob/main/training/README.md' },
      { id: 'expresso', label: 'Nguyen et al. Expresso expressive speech dataset.', url: 'https://github.com/facebookresearch/textlesslib/tree/main/examples/expresso/dataset' },
      { id: 'ravdess', label: 'Livingstone and Russo. RAVDESS emotional speech dataset. 2018.', url: 'https://zenodo.org/records/1188976' },
      { id: 'experiment', label: 'Experiment summary and checkpoint hashes (JSON).', url: '/assets/research/pocket-tts/evidence.json' },
      { id: 'voices', label: 'Kyutai TTS voice sources and attribution.', url: 'https://huggingface.co/kyutai/tts-voices' },
      { id: 'vctk', label: 'Yamagishi, Veaux, and MacDonald. CSTR VCTK Corpus.', url: 'https://doi.org/10.7488/ds/2645' },
    ],
    records: [
      { label: 'Training losses (CSV)', url: '/assets/research/pocket-tts/training-losses.csv' },
      { label: 'Validation losses (CSV)', url: '/assets/research/pocket-tts/validation-losses.csv' },
    ],
  },
];

export function getResearchNote(slug: string): ResearchNote | undefined {
  return RESEARCH_NOTES.find(note => note.slug === slug);
}

export function listResearchNotes(notes: readonly ResearchNote[] = RESEARCH_NOTES): ResearchNote[] {
  return [...notes].sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt) || a.title.localeCompare(b.title));
}

/** Fail the build if a new article has broken IDs, citations, or figure data. */
export function validateResearchNotes(notes: ResearchNote[]): void {
  const slugs = new Set<string>();
  for (const note of notes) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(note.slug) || slugs.has(note.slug)) throw new Error(`Invalid or duplicate research slug: ${note.slug}`);
    slugs.add(note.slug);
    if (!note.title.trim() || !note.summary.trim() || !note.date.trim() || !note.createdAt || !note.abstract.length) throw new Error(`Research note is missing required content: ${note.slug}`);
    for (const date of [note.createdAt, note.modifiedAt, note.publishedAt]) {
      if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`)) || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date)) throw new Error(`Invalid research date in ${note.slug}: ${date}`);
    }
    const references = new Set(note.references.map(reference => reference.id));
    if (references.size !== note.references.length) throw new Error(`Duplicate reference in ${note.slug}`);
    for (const reference of note.references) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(reference.id) || !reference.label.trim() || !(/^(https:\/\/|\/(?!\/))/.test(reference.url))) throw new Error(`Invalid reference in ${note.slug}: ${reference.id}`);
    }
    for (const record of note.records ?? []) if (!record.label.trim() || !/^\/assets\//.test(record.url)) throw new Error(`Invalid experiment record in ${note.slug}`);
    if (note.pdfUrl && note.pdfUrl !== `/research/${note.slug}/paper.pdf`) throw new Error(`Invalid paper PDF path in ${note.slug}`);
    if (note.socialImage && (!/^\/assets\//.test(note.socialImage.src) || !note.socialImage.alt.trim())) throw new Error(`Invalid social image in ${note.slug}`);
    if (note.samples && (!note.samples.items.length || note.samples.items.some(sample => !sample.label.trim() || !/^\/assets\//.test(sample.src)) || new Set(note.samples.items.map(sample => sample.label)).size !== note.samples.items.length)) throw new Error(`Invalid audio samples in ${note.slug}`);
    const sectionIds = new Set<string>();
    for (const section of note.sections) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section.id) || sectionIds.has(section.id) || ['abstract', 'samples', 'references', 'records'].includes(section.id)) throw new Error(`Invalid or duplicate section in ${note.slug}: ${section.id}`);
      sectionIds.add(section.id);
      if (section.comparison && (!section.comparison.rows.length || new Set(section.comparison.rows.map(row => row.tone)).size !== section.comparison.rows.length || section.comparison.rows.some(row => !row.tone || ![row.base, row.matched, row.swapped].every(value => Number.isFinite(value) && value >= 0) || row.base === 0))) throw new Error(`Invalid comparison data in ${note.slug}: ${section.id}`);
    }
    const cited = [...note.abstract, ...note.sections.flatMap(section => section.paragraphs)].flatMap(paragraph => paragraph.citations ?? []);
    cited.push(...(note.samples?.attributionCitations ?? []));
    for (const id of cited) if (!references.has(id)) throw new Error(`Unknown citation ${id} in ${note.slug}`);
  }
}
