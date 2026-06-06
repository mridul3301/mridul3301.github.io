export const profile = {
  name: "Mridul Sharma",
  role: "AI Engineer @ Lamida Inc.",
  tagline: "Exploring World Models, Program Synthesis, RL & VLA Models.",
  introI:
    `I’m interested in building and understanding intelligent agents that learn and reason about the world much like humans do. My focus is on <b>world models</b>, <b>planning</b>, and <b>self-improving systems</b>; particularly how agents can form rich internal representations from limited experience and use them to plan, generalize, and act under uncertainty. I draw on techniques from <b>Reinforcement Learning</b>, <b>Bayesian inference</b>, and <b>Large Language Models</b> for research. I'm also interested in learning how these ideas scale to <b>embodied</b> and <b>multi-agent settings</b>.`,
  introII:
    `Currently I work at <b>Lamida, Inc.</b> as AI Engineer where I focus on Video Analysis. I also collaborate with <a href="https://www.lancelotdacosta.com/home" target="_blank"><b>Lancelot Da Costa</b></a> at the <a href="https://atomresearch.github.io/" target="_blank"><b>ATOM Research Group</b></a> on developing methods to induce executable POMDP world models from raw observation-action trajectories using LLM priors. 
    `,
  
  introIII:
    `Previously, I was a Research Fellow at <a href="https://www.manifoldrg.com/" target="_blank"><b>Manifold Research Group</b></a>, where I worked on evaluating the generality of Vision-Language-Action models across robotic control, multi-agent coordination, and tool use. I've also worked with <a href="https://gabrielrecchia.com/" target="_blank"><b>Gabriel Recchia</b></a> at <a href="https://moduloresearch.com/" target="_blank"><b>Modulo Research</b></a> on scalable oversight and factual consistency in long-form generation, and with <a href="https://ku.edu.np/contact-detail/bal-krishna-bal" target="_blank"> <b>Prof. Bal Krishna Bal</b></a> at <a href="http://ilprl.ku.edu.np/" target="_blank"><b>ILPRL</b></a> on Natural Language Understanding Evaluation benchmark and pre-trained transformer based models for Nepali language.
    `,
  interests: [
    "RL / Planning",
    "Program Synthesis",
    "Vision-Language-Action Models",
    "Human-AI Interaction",
  ],
  links: {
    email: "mailto:mridulsharma3301@gmail.com",
    twitter: "https://x.com/mriiidullll",
    github: "https://github.com/mridul3301",
    scholar: "https://scholar.google.com/citations?user=TSC8VqkAAAAJ&hl=en",
    semantic: "https://www.semanticscholar.org/author/Mridul-Sharma/2332894534",
    cv: "/Mridul_CV.pdf",
  },
};

export type PubType = "Journal" | "Conference" | "Workshop" | "Preprint" | "Technical Report";

export interface PublicationResources {
  arxiv?: string;
  page?: string;
  blogs?: string[];
  code?: string;
  data?: string;
  models?: string;
  video?: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  type: PubType;
  abstract: string;
  tags: string[];
  pdf?: string;
  code?: string;
  doi?: string;
  featured?: boolean;
  underReview?: boolean;
  citation?: string;
  resources?: PublicationResources;
}

import publicationsData from "./publications.json";

export const publications: Publication[] = publicationsData as unknown as Publication[];

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  url: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bayes",
    title: "Bayesian Statistics — Introduction",
    date: "Oct 12, 2023",
    excerpt:
      "A gentle introduction to Bayesian reasoning, priors, likelihoods, and posteriors — and why they matter for modern ML.",
    cover:
      "https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/bayes_images/cover.png",
    url: "https://mridul3301.github.io/blog/bayes",
  },
  {
    slug: "eigen-vectors",
    title: "Eigenvalues and Eigenvectors",
    date: "Feb 18, 2023",
    excerpt:
      "Building geometric intuition for eigenvalues and eigenvectors, and how they appear across linear algebra and ML.",
    cover:
      "https://raw.githubusercontent.com/maxdecplanck/blog-images/refs/heads/main/eigen/cover.png",
    url: "https://mridul3301.github.io/blog/eigen-vectors",
  },
];

export interface LearnItem {
  title: string;
  description: string;
  topics: string[];
}

export const learnItems: LearnItem[] = [
  {
    title: "Reinforcement Learning",
    description: "Notes and resources from working through Sutton & Barto and modern RL papers.",
    topics: ["MDPs", "Policy Gradients", "Model-based RL", "World Models"],
  },
  {
    title: "Program Synthesis",
    description:
      "Exploring inductive program synthesis, neuro-symbolic methods, and LLM-driven code generation.",
    topics: ["DSLs", "Search", "Neuro-symbolic", "LLM Agents"],
  },
  {
    title: "Vision-Language-Action Models",
    description: "Tracking the latest VLA architectures, benchmarks, and evaluation methodology.",
    topics: ["OpenVLA", "RT-2", "Benchmarks", "Generalization"],
  },
  {
    title: "Probability & Statistics",
    description: "Foundational notes on probability, Bayesian inference, and statistical learning.",
    topics: ["Bayesian", "MCMC", "Information Theory"],
  },
];
