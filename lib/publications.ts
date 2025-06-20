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
    title: "Confirmation bias: A challenge for scalable oversight",
    authors: "Recchia G, Mangat CS, Nyachhyon J, Sharma M, Canavan C, Epstein-Gross D, Abdulbari M",
    journal: "Arxiv Pre-print",
    year: 2025,
    type: "preprint",
    tags: ["Scalable Oversight", "NLP", "Language Models", "evaluations"],
    abstract: 
      "We conducted two studies examining the performance of simple oversight protocols where evaluators know that the model is correct most of the time, but not all of the time.",
    doi: "#",
    pdf: "https://moduloresearch.com/papers/Confirmation_bias_A_challenge_for_scalable_oversight.pdf",
  },
  {
    
    id: 2,
    title: "Development of Pre-Trained Transformer-based Models for the Nepali Language",
    authors: "Thapa P, Nyachhyon J, Sharma M, Bal BK",
    journal: "(CHiPSAL) COLING",
    year: 2025,
    type: "conference",
    tags: ["NLP", "Transformer", "Low-resource language"],
    abstract:
      "We collected 27.5 GB of Nepali text data, approximately 2.4x larger than any previously available Nepali language corpus. Leveraging this data, we pre-trained three different models i.e., BERT, RoBERTa, and GPT-2, exclusively for the Nepali Language.",
    doi: "10.48550/arXiv.2411.15734",
    pdf: "https://aclanthology.org/2025.chipsal-1.2.pdf",
  },
  {
    id: 3,
    title: "Evaluating Transformer-based Encoders for the Nepali Natural Language Understanding Tasks",
    authors: "Nyachhyon J, Sharma M, Thapa P, Bal BK",
    journal: "Arxiv Pre-print",
    year: 2025,
    type: "preprint",
    tags: ["NLP", "Benchmarking", "Language Understanding"],
    abstract:
      "We introduce eight new datasets, creating a new benchmark, the Nepali Language Understanding Evaluation (NLUE) benchmark, which covers a total of 12 tasks for evaluating the performance of models across a diverse set of Natural Language Understanding (NLU) tasks. The added tasks include single-sentence classification, similarity and paraphrase tasks, and Natural Language Inference (NLI) tasks. On evaluating the models using added tasks, we observe that the existing models fall short in handling complex NLU tasks effectively.",
    doi: "10.48550/arXiv.2411.19244",
    pdf: "https://arxiv.org/pdf/2411.19244",
  },
  {
    id: 4,
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
