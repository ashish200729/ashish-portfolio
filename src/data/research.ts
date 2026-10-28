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

/** Animated bars for a few systems over selectable measures. Values are fractions from 0 to 1, shown as percentages. */
export interface ResearchBarsFigure {
  kind: 'bars';
  title: string;
  description: string;
  metrics: Array<{ id: string; label: string; better: 'higher' | 'lower' }>;
  rows: Array<{ label: string; values: Record<string, number>; highlight?: boolean }>;
  note: string;
}

/** A stepped story on a valid-time axis. `to` is exclusive; omit it while a fact is still true. */
export interface ResearchTimelineFigure {
  kind: 'timeline';
  title: string;
  description: string;
  axis: string[];
  steps: Array<{
    title: string;
    caption: string;
    /** `past` ended in valid time; `replaced` is an earlier belief closed in transaction time but kept. */
    facts: Array<{ value: string; from: number; to?: number; state: 'current' | 'past' | 'replaced' }>;
    marks?: Array<{ at: number; label: string }>;
    answers?: Array<{ query: string; answer: string }>;
  }>;
  note: string;
}

/** Several ranked inputs fused into one ordered chain of stages. */
export interface ResearchPipelineFigure {
  kind: 'pipeline';
  title: string;
  description: string;
  inputs: Array<{ label: string; detail: string }>;
  stages: Array<{ label: string; detail: string }>;
  note: string;
}

export interface ResearchTableFigure {
  kind: 'table';
  title: string;
  description: string;
  columns: string[];
  rows: string[][];
  note?: string;
}

export type ResearchFigure = ResearchBarsFigure | ResearchTimelineFigure | ResearchPipelineFigure | ResearchTableFigure;

export interface ResearchSection {
  id: string;
  title: string;
  paragraphs: ResearchParagraph[];
  comparison?: ResearchComparison;
  figure?: ResearchFigure;
}

export interface ResearchNote {
  slug: string;
  kind: 'working-paper' | 'article';
  /**
   * `signal`: numbered sections, monospace labels, a blue accent, a stat grid, a sticky contents rail on wide
   * screens, and an animated memory field above the abstract. Applies to that page only.
   */
  theme?: 'signal';
  /** Short label above the title in the signal theme, e.g. "Working paper · Agent memory". */
  eyebrow?: string;
  /** Headline numbers shown under the byline in the signal theme. Keep to three. */
  stats?: Array<{ value: string; label: string }>;
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
    slug: 'hitherto-temporal-memory',
    kind: 'working-paper',
    theme: 'signal',
    eyebrow: 'Working paper · Agent memory',
    projectSlug: 'hitherto',
    socialImage: { src: '/assets/research/hitherto/social.png', alt: 'Paper title, summary, and byline for the Hitherto working paper.' },
    title: 'Hitherto: temporal memory for coding agents',
    summary: 'Memory that knows when a fact stopped being true, with code anchors, hybrid retrieval, and reproducible offline evaluations.',
    date: 'October 2026',
    createdAt: '2026-10-28',
    modifiedAt: '2026-10-28',
    keywords: ['agent memory', 'coding agents', 'bi-temporal data', 'hybrid retrieval', 'BM25', 'pgvector', 'LongMemEval', 'LoCoMo'],
    stats: [
      { value: '0%', label: 'Stale top answers, temporal suite' },
      { value: '98.3%', label: 'LongMemEval-S Any@5, held out' },
      { value: '59.6%', label: 'LoCoMo Any@5, never tuned on' },
    ],
    abstract: [
      {
        text: 'Coding agents now keep memory across sessions: which package manager a repository uses, how its tests run, why a module is shaped the way it is. Those facts change. An append-only memory keeps returning the old answer, and nothing tells it when the code a fact describes has been renamed or deleted. Hitherto is a personal research engine that records when each fact was true and when it was known, lets deterministic rules decide supersession, and anchors facts to code so they can be checked against the repository.',
      },
      {
        text: 'On a synthetic temporal suite of 66 scenarios and checks, append-only vector and full-text baselines ranked an obsolete value first for 70.5% of current-value queries; Hitherto did so for none. On the held-out half of LongMemEval-S and on LoCoMo, retrieval changes raised Any@5 from 94.0% to 98.3% and from 53.7% to 59.6%. These are offline, retrieval-only measurements on one machine. They do not measure answer accuracy or agent task success.',
        citations: ['eval', 'lme', 'locomo'],
      },
    ],
    sections: [
      {
        id: 'introduction',
        title: 'Why stale memory is the hard part',
        paragraphs: [
          {
            text: 'A memory that only accumulates cannot tell “we use pnpm” from “we switched to bun”. Both are similar to a question about the package manager, so similarity search tends to return both, often the older one first. For an agent that acts on what it recalls, a stale fact is worse than none: it produces confident, wrong commands.',
          },
          {
            text: 'The project asks three narrow questions. Can a memory engine track when a decision stopped being true without deleting what it believed before? Can it notice when the code no longer agrees with a remembered fact? And can capture stay correct when hooks retry, crash, or deliver evidence out of order?',
          },
          {
            text: 'Temporal knowledge graphs such as Zep’s Graphiti and extraction-based memories such as Mem0 address related problems for conversational agents. Hitherto studies the narrower coding case, where many facts can be checked against a repository. It makes no claim to be first or best, and it does not benchmark those systems.',
            citations: ['zep', 'graphiti', 'mem0'],
          },
        ],
      },
      {
        id: 'two-clocks',
        title: 'Two clocks for every fact',
        paragraphs: [
          {
            text: 'Each fact carries valid time, when it was true, and transaction time, when Hitherto believed it. An end time is written once; facts are never edited in place, and history is removed only by an explicit erase. Recall can ask what is true now, what was true at a given moment, or what Hitherto knew at a given moment.',
            citations: ['bitemporal'],
          },
          {
            text: 'Supersession follows one rule: the model proposes, code decides. An extractor proposes statements with verbatim quotes, which must appear in the captured text. Keyable facts, such as a repository’s package manager, occupy registered slots with an exclusivity policy, and a Postgres exclusion constraint stops two exclusive values from overlapping in valid time. A proposal cannot override the registry.',
          },
          {
            text: 'Evidence can arrive late. When an older message lands inside a closed interval, Hitherto closes the earlier belief in transaction time, inserts a corrected copy, and inserts the late fact, so “known at” queries still return what was believed then. Confirmations keep their own effective time, which lets late evidence rebuild A → B → A instead of losing the second A.',
          },
        ],
        figure: {
          kind: 'timeline',
          title: 'Figure 1. Rebuilding history from late evidence',
          description: 'Step through one week of a repository’s package manager. Bars show valid time; a dashed bar is an earlier belief that is closed but kept.',
          axis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          steps: [
            {
              title: 'Monday: “We use pnpm.”',
              caption: 'A new fact opens in valid time. Nothing has ended yet.',
              facts: [{ value: 'pnpm', from: 0, state: 'current' }],
            },
            {
              title: 'Friday: “Still pnpm.”',
              caption: 'The confirmation adds a source to the same fact and keeps its own effective time, Friday.',
              facts: [{ value: 'pnpm', from: 0, state: 'current' }],
              marks: [{ at: 4, label: 'Confirmed' }],
            },
            {
              title: 'Saturday: a message from Wednesday arrives, “We switched to bun.”',
              caption: 'The late message lands inside pnpm’s interval. Hitherto closes the old belief without deleting it and rebuilds history as pnpm, then bun, then pnpm again from Friday’s confirmation.',
              facts: [
                { value: 'pnpm', from: 0, state: 'replaced' },
                { value: 'pnpm', from: 0, to: 2, state: 'past' },
                { value: 'bun', from: 2, to: 4, state: 'past' },
                { value: 'pnpm', from: 4, state: 'current' },
              ],
              marks: [{ at: 2, label: 'Late message' }, { at: 4, label: 'Confirmed' }],
            },
            {
              title: 'Recall',
              caption: 'The same rows answer three different questions correctly.',
              facts: [
                { value: 'pnpm', from: 0, state: 'replaced' },
                { value: 'pnpm', from: 0, to: 2, state: 'past' },
                { value: 'bun', from: 2, to: 4, state: 'past' },
                { value: 'pnpm', from: 4, state: 'current' },
              ],
              answers: [
                { query: 'Now', answer: 'pnpm' },
                { query: 'As of Thursday', answer: 'bun' },
                { query: 'Known at Friday', answer: 'pnpm since Monday' },
              ],
            },
          ],
          note: 'An illustration of the reconstruction the resolver performs, not a recording. The evaluation suite exercises late arrivals, recurrence, and replays with real PostgreSQL.',
        },
      },
      {
        id: 'code-anchors',
        title: 'Facts that point at code',
        paragraphs: [
          {
            text: 'A fact can be anchored to a symbol. The client lexes TypeScript, JavaScript, Python, Go, Rust, and Java, hashes normalized signatures and bodies, and records Git blob hashes. When code changes, bounded relocation decides whether an anchor is intact, moved, drifted, or broken; ambiguous cases stay unresolved rather than guessed. The server applies the validity policy, and a deleted symbol that reappears creates a new restating fact.',
          },
          {
            text: 'Branches get lanes. Recall combines the default lane with the current branch’s lane, which wins per slot, so a decision made on a feature branch does not reach the main line until the branch is merged. Abandoned lanes are never promoted.',
          },
          {
            text: 'The server never reads a repository. The client sends paths and fingerprints for anchors, and bounded, redacted manifest contents for observations.',
          },
        ],
        figure: {
          kind: 'table',
          title: 'Table 1. Anchor operations',
          description: 'The state each code change should produce, and the state the evaluation observed.',
          columns: ['Change', 'Expected', 'Observed'],
          rows: [
            ['Rename', 'Moved', 'Moved'],
            ['Heavy edit', 'Moved', 'Moved'],
            ['Split', 'Moved', 'Moved'],
            ['Move to another file', 'Moved', 'Moved'],
            ['Reformat', 'Intact', 'Intact'],
            ['CRLF line endings', 'Intact', 'Intact'],
            ['Path case change', 'Moved', 'Moved'],
            ['Delete', 'Broken', 'Broken'],
            ['Signature change', 'Drifted signature', 'Drifted signature'],
          ],
          note: 'Each change is exercised once on a synthetic file. The lexers are conservative rather than complete parsers, so complex syntax can stay unresolved.',
        },
      },
      {
        id: 'capture',
        title: 'Capture that survives retries and crashes',
        paragraphs: [
          {
            text: 'A Claude Code hook strips private blocks, redacts secrets, and fsyncs an immutable spool record before anything leaves the machine. The API redacts again, claims an idempotency key, and inserts episodes with their extraction jobs atomically; reusing a key with a different payload fails.',
          },
          {
            text: 'Workers claim jobs from a Postgres queue with SKIP LOCKED, renew their leases, and fence every authoritative write, so a worker that lost its lease cannot write. Failed jobs back off and finally stay dead until redriven. Model and embedding calls finish before any write transaction begins.',
          },
          {
            text: 'Tenancy is enforced in the database: forced row-level security, a non-superuser runtime role, scoped API keys, and namespace allow-lists. Erasure removes a fact’s dependent records and keeps only counts in its ledger.',
          },
        ],
      },
      {
        id: 'retrieval',
        title: 'One query, four signals',
        paragraphs: [
          {
            text: 'Recall is one SQL statement. A BM25 lexical leg, a vector leg over pgvector, an entity and anchor leg, and a slot leg are fused with reciprocal rank fusion. Namespaces up to 15,000 current facts use exact vector search by default; larger ones use a partial HNSW index.',
            citations: ['bm25', 'pgvector', 'rrf', 'hnsw'],
          },
          {
            text: 'A structural gate rejects commands and acknowledgements, and MMR drops only near-duplicates. The packer fits dated, cited statements into a token budget inside an untrusted-data envelope, so recalled text is presented as data rather than instructions.',
            citations: ['mmr'],
          },
        ],
        figure: {
          kind: 'pipeline',
          title: 'Figure 2. The recall path',
          description: 'Four ranked lists, computed in one statement, are fused and then filtered into a budgeted pack.',
          inputs: [
            { label: 'BM25', detail: 'Term rarity counted within the query’s own scope' },
            { label: 'Vector', detail: '384-dimension embeddings, exact or HNSW' },
            { label: 'Entity & anchor', detail: 'Matched paths and symbols' },
            { label: 'Slot', detail: 'Registered keys, such as package manager' },
          ],
          stages: [
            { label: 'Fuse', detail: 'Reciprocal rank fusion, k = 60' },
            { label: 'Gate', detail: 'Drops commands and acknowledgements' },
            { label: 'Deduplicate', detail: 'MMR penalises overlap of 0.6 or more and drops 0.95 or more' },
            { label: 'Pack', detail: 'Dated, cited lines within the token budget' },
          ],
          note: 'Tenant and branch filters stay inside the same SQL statement and database transaction.',
        },
      },
      {
        id: 'temporal-evaluation',
        title: 'Evaluation: stale answers',
        paragraphs: [
          {
            text: 'The temporal suite runs 66 synthetic scenarios and checks against real PostgreSQL, the production resolver and retriever, a deterministic test embedder, and the heuristic extractor. It asks 84 queries: 44 about the current value, 34 about a past value, and 6 that should return nothing. The baselines query the same append-only corpus.',
            citations: ['eval'],
          },
          {
            text: 'Append-only vector and full-text search ranked an obsolete value first for 70.5% of current-value queries, and removing supersession and conflict handling from Hitherto gave the same rate. Full Hitherto answered every current and past-value query correctly, kept every obsolete value out of its top five, and found all 26 expected supersessions with no false ones.',
            citations: ['eval'],
          },
          {
            text: 'The scenarios were written alongside the engine, so this is a regression suite rather than an independent benchmark. The no-memory baseline has no stale answers only because it returns nothing.',
          },
        ],
        figure: {
          kind: 'bars',
          title: 'Figure 3. Temporal suite results',
          description: 'Choose a measure. Higher is better for accuracy; lower is better for stale answers.',
          metrics: [
            { id: 'current', label: 'Current accuracy', better: 'higher' },
            { id: 'stale', label: 'Stale top answer', better: 'lower' },
            { id: 'leak', label: 'Stale in top five', better: 'lower' },
            { id: 'asOf', label: 'Past-value accuracy', better: 'higher' },
          ],
          rows: [
            { label: 'No memory', values: { current: 0, stale: 0, leak: 0, asOf: 0 } },
            { label: 'Append-only vector', values: { current: 13 / 44, stale: 31 / 44, leak: 41 / 44, asOf: 26 / 34 } },
            { label: 'Append-only full-text', values: { current: 12 / 44, stale: 31 / 44, leak: 40 / 44, asOf: 26 / 34 } },
            { label: 'Without supersession', values: { current: 13 / 44, stale: 31 / 44, leak: 41 / 44, asOf: 26 / 34 } },
            { label: 'Hitherto', values: { current: 1, stale: 0, leak: 0, asOf: 1 }, highlight: true },
          ],
          note: 'Current and stale measures use 44 queries; past-value accuracy uses 34. An ablation without code anchors matches full Hitherto on these queries, so anchors are measured separately in Table 1.',
        },
      },
      {
        id: 'benchmarks',
        title: 'Retrieval benchmarks',
        paragraphs: [
          {
            text: 'To test retrieval beyond the synthetic suite, I ran LongMemEval-S and LoCoMo. LongMemEval used a held-out half fixed in advance by hashing question IDs: 232 of its 470 questions with evidence, each against its own haystack of about 800 turn chunks. LoCoMo was never used for tuning; it has 1,535 answerable questions over 5,882 dialogue turns. Both runs index raw turns with no LLM extraction and score retrieval only.',
            citations: ['lme', 'lme-data', 'locomo'],
          },
          {
            text: 'The previous engine was measured first. Two changes followed from retrieval practice rather than benchmark questions: a BM25 lexical leg with term rarity counted inside the query’s scope, and MMR limited to near-duplicates. A multilingual-e5-small embedder replaced the hashed test embedder. Hybrid fusion had scored below the vector leg alone; after the changes it beat both legs on both benchmarks.',
            citations: ['e5', 'lme-records', 'locomo-records'],
          },
          {
            text: 'With e5, LongMemEval Any@5 rose from 94.0% to 98.3% and All@10 from 88.4% to 96.1%. At 20 results the benchmark is close to saturated, so the change shows near the top of the list. LoCoMo Any@5 rose from 53.7% to 59.6%. Multi-hop questions got worse, Any@20 falling from 69.9% to 65.6%, because BM25 concentrates on the rarest term and favours one turn over the second hop.',
            citations: ['lme-records', 'locomo-records'],
          },
        ],
        figure: {
          kind: 'bars',
          title: 'Figure 4. Before and after the retrieval changes',
          description: 'Choose a measure. Engine and embedder vary independently, so each change can be attributed.',
          metrics: [
            { id: 'lmeAny5', label: 'LongMemEval Any@5', better: 'higher' },
            { id: 'lmeAll10', label: 'LongMemEval All@10', better: 'higher' },
            { id: 'locomoAny5', label: 'LoCoMo Any@5', better: 'higher' },
            { id: 'locomoAll10', label: 'LoCoMo All@10', better: 'higher' },
          ],
          rows: [
            { label: 'Before · test embedder', values: { lmeAny5: 0.6034, lmeAll10: 0.4741, locomoAny5: 0.2697, locomoAll10: 0.2821 } },
            { label: 'After · test embedder', values: { lmeAny5: 0.8836, lmeAll10: 0.819, locomoAny5: 0.3121, locomoAll10: 0.3362 } },
            { label: 'Before · e5-small', values: { lmeAny5: 0.9397, lmeAll10: 0.8836, locomoAny5: 0.5368, locomoAll10: 0.5068 } },
            { label: 'After · e5-small', values: { lmeAny5: 0.9828, lmeAll10: 0.9612, locomoAny5: 0.5961, locomoAll10: 0.5531 }, highlight: true },
          ],
          note: 'LongMemEval: 232 held-out questions, scored at session level. LoCoMo: 1,535 questions, scored at turn level. Limit 100, 16,000-token budget, relevance gate off. Retrieval only, with no answering model or judge.',
        },
      },
      {
        id: 'limitations',
        title: 'Limitations and next steps',
        paragraphs: [
          {
            text: 'The default relevance gate is miscalibrated for e5-small. Its threshold passes only 43.1% of these genuine questions, so a request with default settings delivered evidence for 42.7% of them. It needs calibration on separate positive and negative queries, not on these benchmarks.',
            citations: ['lme-records'],
          },
          {
            text: 'Everything ran on one laptop. The load test reached 40,000 facts rather than its 200,000-fact default because of free disk space, and timings varied up to threefold between runs. Real OpenAI-compatible and Anthropic providers, the Docker images, and hosted CI have not been exercised.',
          },
          {
            text: 'There is no answer-accuracy or agent task-success measurement yet, and the work has not been peer reviewed. Natural next steps are LLM extraction of atomic memories, time-aware query parsing, and question answering with a reader model and judge. The code is not public.',
          },
        ],
      },
    ],
    references: [
      { id: 'lme', label: 'Wu et al. LongMemEval: Benchmarking Chat Assistants on Long-Term Interactive Memory. ICLR 2025.', url: 'https://arxiv.org/abs/2410.10813' },
      { id: 'lme-data', label: 'LongMemEval cleaned dataset (longmemeval_s_cleaned.json).', url: 'https://huggingface.co/datasets/xiaowu0162/longmemeval-cleaned' },
      { id: 'locomo', label: 'Maharana et al. Evaluating Very Long-Term Conversational Memory of LLM Agents. ACL 2024.', url: 'https://arxiv.org/abs/2402.17753' },
      { id: 'zep', label: 'Rasmussen et al. Zep: A Temporal Knowledge Graph Architecture for Agent Memory. 2025.', url: 'https://arxiv.org/abs/2501.13956' },
      { id: 'graphiti', label: 'Zep. Graphiti.', url: 'https://github.com/getzep/graphiti' },
      { id: 'mem0', label: 'Chhikara et al. Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory. 2025.', url: 'https://arxiv.org/abs/2504.19413' },
      { id: 'bitemporal', label: 'Fowler. Bitemporal History.', url: 'https://martinfowler.com/articles/bitemporal-history.html' },
      { id: 'bm25', label: 'Robertson and Zaragoza. The Probabilistic Relevance Framework: BM25 and Beyond. 2009.', url: 'https://doi.org/10.1561/1500000019' },
      { id: 'rrf', label: 'Cormack, Clarke, and Büttcher. Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods. SIGIR 2009.', url: 'https://doi.org/10.1145/1571941.1572114' },
      { id: 'mmr', label: 'Carbonell and Goldstein. The Use of MMR, Diversity-Based Reranking for Reordering Documents and Producing Summaries. SIGIR 1998.', url: 'https://doi.org/10.1145/290941.291025' },
      { id: 'hnsw', label: 'Malkov and Yashunin. Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs. 2016.', url: 'https://arxiv.org/abs/1603.09320' },
      { id: 'pgvector', label: 'pgvector: open-source vector similarity search for Postgres.', url: 'https://github.com/pgvector/pgvector' },
      { id: 'e5', label: 'Wang et al. Multilingual E5 Text Embeddings: A Technical Report. 2024.', url: 'https://arxiv.org/abs/2402.05672' },
      { id: 'eval', label: 'Temporal evaluation results (JSON).', url: '/assets/research/hitherto/temporal-evaluation.json' },
      { id: 'lme-records', label: 'LongMemEval-S run, held-out half (JSON).', url: '/assets/research/hitherto/longmemeval-s.json' },
      { id: 'locomo-records', label: 'LoCoMo run (JSON).', url: '/assets/research/hitherto/locomo.json' },
    ],
    records: [
      { label: 'Temporal evaluation (JSON)', url: '/assets/research/hitherto/temporal-evaluation.json' },
      { label: 'LongMemEval-S run (JSON)', url: '/assets/research/hitherto/longmemeval-s.json' },
      { label: 'LoCoMo run (JSON)', url: '/assets/research/hitherto/locomo.json' },
    ],
  },
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

function validateFigure(figure: ResearchFigure, where: string): void {
  const fail = (problem: string) => { throw new Error(`Invalid ${figure.kind} figure in ${where}: ${problem}`); };
  if (!figure.title.trim() || !figure.description.trim()) fail('missing title or description');
  if (figure.kind === 'bars') {
    const ids = figure.metrics.map(metric => metric.id);
    if (!ids.length || new Set(ids).size !== ids.length || figure.metrics.some(metric => !metric.label.trim())) fail('metrics must be unique and labelled');
    if (!figure.rows.length || new Set(figure.rows.map(row => row.label)).size !== figure.rows.length) fail('rows must be unique');
    for (const row of figure.rows) {
      if (ids.some(id => !Number.isFinite(row.values[id]) || row.values[id] < 0 || row.values[id] > 1) || Object.keys(row.values).some(id => !ids.includes(id))) fail(`${row.label} needs a 0–1 value for every metric`);
    }
  } else if (figure.kind === 'timeline') {
    if (figure.axis.length < 2 || !figure.steps.length) fail('needs an axis and steps');
    for (const step of figure.steps) {
      if (!step.title.trim() || !step.caption.trim() || !step.facts.length) fail('every step needs a title, caption, and facts');
      for (const fact of step.facts) {
        const end = fact.to ?? figure.axis.length;
        if (!fact.value.trim() || !Number.isInteger(fact.from) || !Number.isInteger(end) || fact.from < 0 || end <= fact.from || end > figure.axis.length) fail(`fact ${fact.value} is outside the axis`);
      }
      for (const mark of step.marks ?? []) if (!Number.isInteger(mark.at) || mark.at < 0 || mark.at >= figure.axis.length || !mark.label.trim()) fail('mark is outside the axis');
    }
  } else if (figure.kind === 'pipeline') {
    if (!figure.inputs.length || !figure.stages.length || [...figure.inputs, ...figure.stages].some(item => !item.label.trim() || !item.detail.trim())) fail('inputs and stages need labels and details');
  } else if (!figure.columns.length || !figure.rows.length || figure.rows.some(row => row.length !== figure.columns.length)) {
    fail('every row needs one cell per column');
  }
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
      if (section.figure) validateFigure(section.figure, `${note.slug}: ${section.id}`);
    }
    if (note.stats && (note.stats.length < 1 || note.stats.length > 3 || note.stats.some(stat => !stat.value.trim() || !stat.label.trim()))) throw new Error(`Research stats must be one to three labelled values: ${note.slug}`);
    const cited = [...note.abstract, ...note.sections.flatMap(section => section.paragraphs)].flatMap(paragraph => paragraph.citations ?? []);
    cited.push(...(note.samples?.attributionCitations ?? []));
    for (const id of cited) if (!references.has(id)) throw new Error(`Unknown citation ${id} in ${note.slug}`);
  }
}
