// Publication interface
export interface Publication {
  id: number
  title: string
  authors: string
  journal: string
  year: number
  type: string
  tags: string[]
  abstract: string
  doi: string
  pdf: string
}

// Sample publication data
export const publications: Publication[] = [
  {
    id: 1,
    title: "MultiNet v1.0: A Comprehensive Benchmark for Evaluating Multimodal Reasoning and Action Models Across Diverse Domains",
    authors: "Guruprasad P, Chowdhury S, Sikka H, Sharma M, Lu H, Rivera S, Khurana A, Wang Y",
    journal: "Manifold Research Publications",
    year: 2025,
    type: "Technical Report",
    tags: ["Vision Language Action Models", "Benchmarks", "Multimodal", "evaluations"],
    abstract: 
      " Our findings reveal significant insights into the current state of multimodal AI, highlighting both promising capabilities and critical limitations that inform future research directions. We release our complete benchmark suite, evaluation framework, and detailed analysis to accelerate progress in this field.",
    doi: "10.5281/zenodo.17404313",
    pdf: "https://multinet.ai/static/pages/Multinetv1.html",
  },
    {
    id: 2,
    title: "Confirmation bias: A challenge for scalable oversight",
    authors: "Recchia G, Mangat CS, Nyachhyon J, Sharma M, Canavan C, Epstein-Gross D, Abdulbari M",
    journal: "AAAI-AIA",
    year: 2026,
    type: "conference",
    tags: ["Scalable Oversight", "NLP", "Language Models", "evaluations"],
    abstract: 
      "We conducted two studies examining the performance of simple oversight protocols where evaluators know that the model is correct most of the time, but not all of the time.",
    doi: "https://doi.org/10.48550/arXiv.2507.19486",
    pdf: "https://www.arxiv.org/pdf/2507.19486",
  },
  {
    id: 3,
    title: "Consolidating and Developing Benchmarking Datasets for the Nepali Natural Language Understanding Tasks",
    authors: "Nyachhyon J, Sharma M, Thapa P, Bal BK",
    journal: "AACL-IJCNLP",
    year: 2025,
    type: "conference",
    tags: ["NLP", "Benchmarking", "Language Understanding", "evaluations"],
    abstract:
      "We introduce twelvw new datasets, creating a new benchmark, the Nepali Language Understanding Evaluation (NLUE) benchmark, for evaluating the performance of models across a diverse set of Natural Language Understanding (NLU) tasks. The added tasks include single-sentence classification, similarity and paraphrase tasks, and Natural Language Inference (NLI) tasks. On evaluating the models using added tasks, we observe that the existing models fall short in handling complex NLU tasks effectively.",
    doi: "10.48550/arXiv.2411.19244",
    pdf: "https://arxiv.org/pdf/2411.19244",
  },
  {
    id: 4,
    title: "Development of Pre-Trained Transformer-based Models for the Nepali Language",
    authors: "Thapa P, Nyachhyon J, Sharma M, Bal BK",
    journal: "(CHiPSAL) COLING",
    year: 2025,
    type: "Conference Workshop",
    tags: ["NLP", "Transformer", "Low-resource language", "Language modeling"],
    abstract:
      "We collected 27.5 GB of Nepali text data, approximately 2.4x larger than any previously available Nepali language corpus. Leveraging this data, we pre-trained three different models i.e., BERT, RoBERTa, and GPT-2, exclusively for the Nepali Language.",
    doi: "10.48550/arXiv.2411.15734",
    pdf: "https://aclanthology.org/2025.chipsal-1.2.pdf",
  },
  {
    id: 5,
    title: "Global PIQA: Evaluating Physical Commonsense Reasoning Across 100+ Languages and Cultures",
    authors: "Chang TA, Arnett C,............., Sharma M, ....",
    journal: "Arxiv Pre-print",
    year: 2025,
    type: "preprint",
    tags: ["PIQA", "Benchmarks", "Physical Commonsense", "evaluations"],
    abstract: 
      "We present Global PIQA, a participatory commonsense reasoning benchmark for over 100 languages, constructed by hand by 335 researchers from 65 countries around the world. The 116 language varieties in Global PIQA cover five continents, 14 language families, and 23 writing systems. In the non-parallel split of Global PIQA, over 50% of examples reference local foods, customs, traditions, or other culturally-specific elements.",
    doi: "//doi.org/10.48550/arXiv.2510.24081",
    pdf: "https://arxiv.org/pdf/2510.24081",
  },
  {
    id: 6,
    title: "Local Herb Identification Using Transfer Learning: A CNN-Powered Mobile Application for Nepalese Flora",
    authors: "Thapa P, Sharma M, Nyachhyon J, Pandeya YR",
    journal: "Arxiv Pre-print",
    year: 2025,
    type: "preprint",
    tags: ["herbs", "computer vision", "classification"],
    abstract:
      "Collected image datasets for local herbs and trained vision models for classification.",
    doi: "10.48550/arXiv.2505.02147",
    pdf: "https://arxiv.org/pdf/2505.02147",
  },
]
