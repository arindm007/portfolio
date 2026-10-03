export const profile = {
  name: 'Arindam Chakraborty',
  firstName: 'Arindam',
  lastName: 'Chakraborty',
  role: 'Senior Agentic AI Engineer',
  roleAlt: 'Forward Deployed Engineer',
  company: 'EnterpriseSI',
  location: 'Bengaluru, India',
  coordinates: '12.97° N, 77.59° E',
  timeZone: 'Asia/Kolkata',
  email: 'arindamchakraborty6.10@gmail.com',
  headline: 'AI agents',
  headlineAccent: 'that ship.',
  intro:
    'Agentic AI systems, RAG pipelines and cloud-native backends, built alongside the enterprise teams who use them.',
  // Words wrapped in *asterisks* are set in accent italics.
  statement:
    'I design and ship production-grade *agentic* *AI* — agents that orchestrate tools, APIs and LLMs, the RAG pipelines that ground them, and the cloud-native backends underneath. As a *forward* *deployed* engineer I sit with enterprise teams, map how the work actually happens, and turn it into systems that *hold* *up* in production.',
  bio: [
    'Three-plus years across enterprise AI, research labs at IISc and IIT Hyderabad, and industrial MLOps — on AWS and Azure, from edge devices to multi-tenant SaaS.',
    'I also teach. I have delivered 150+ hours of hands-on AI training to enterprise engineering and business teams across India, covering agent architecture, RAG and production LLM deployment.',
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/arindm007' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/arindm007' },
    { label: 'Hashnode', href: 'https://arindamchakraborty.hashnode.dev' },
  ],
};

export const stats = [
  { value: 3, suffix: '+', label: 'Years building production AI systems' },
  { value: 150, suffix: '+', label: 'Hours of hands-on AI training delivered' },
  { value: 40, suffix: '%', label: 'Manual effort cut with LLM-powered workflows' },
  { value: 50, suffix: '%', label: 'Boost in deployment efficiency' },
];

export const clients = ['Capgemini', 'KPMG', 'Guardian Life', 'CIBC', 'Amdocs'];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  tags: string[];
}

export const experience: Experience[] = [
  {
    company: 'EnterpriseSI',
    role: 'Senior Agentic AI Engineer · Forward Deployed AI Engineer',
    period: 'Apr 2026 — Present',
    location: 'Bengaluru',
    points: [
      'Designing and implementing agentic AI systems that orchestrate multiple tools, APIs and LLMs for enterprise workflows — knowledge assistants, copilots and autonomous task agents.',
      'Forward deployed on an agentic GTM platform for ICP creation and sales intelligence at a US-based startup: AS-IS process discovery with stakeholders, a To-Be agentic design with target architecture and integration points, and a phased transformation roadmap.',
      'Forward deployed at a North American bank for AI pilots — use-case discovery complete; governance, tech stack and sandbox creation in progress.',
      'Building production-grade backend services in Python (FastAPI) that expose agent workflows as scalable APIs with observability and evaluation loops.',
      'Lead lab trainer for applied and agentic AI engagements with Capgemini, KPMG, Guardian Life, CIBC and Amdocs — 6+ agentic AI engineering trainings delivered to date.',
      'Mentoring junior engineers and running internal sessions on prompt engineering, RAG and agent architecture.',
    ],
    tags: ['Agentic AI', 'FastAPI', 'RAG', 'Evaluation', 'Enablement'],
  },
  {
    company: 'Indian Institute of Science',
    role: 'Project Associate',
    period: 'Aug 2025 — Apr 2026',
    location: 'Bengaluru',
    points: [
      'Designed and developed scalable, microservices-based backend architectures for real-time crowd-sourced road data collection using MQTT, Kafka and Python (FastAPI).',
      'Built ingestion and processing pipelines for high-throughput sensor and IoT data, integrating ClickHouse and PostgreSQL for geospatial analytics and road-quality assessment.',
      'Architected cloud-native, containerized (Docker) solutions for scalability, reliability and fault tolerance.',
      'Collaborated with interdisciplinary teams to implement distributed systems for high-performance data processing.',
    ],
    tags: ['Kafka', 'MQTT', 'FastAPI', 'ClickHouse', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'TiHAN — IIT Hyderabad',
    role: 'Junior Research Fellow',
    period: 'Nov 2024 — Aug 2025',
    location: 'Hyderabad',
    points: [
      'Engineered adaptive software-defined vehicle (SDV) architectures to integrate AI and ML across edge devices, cloud environments and web-based systems.',
      'Designed an SDV dashboard and a remote monitoring system with AI-assisted emotion detection for user experience and safety.',
      'Implemented camera-based object and obstacle detection using YOLO to improve real-time vehicle perception.',
      'Built middleware for real-time data processing with API integration and cross-platform compatibility across cloud, edge and web.',
      'Created an AI-driven announcement system for an autonomous campus shuttle, enabling context-aware, real-time passenger notifications.',
    ],
    tags: ['Software-Defined Vehicles', 'YOLO', 'Edge AI', 'Middleware'],
  },
  {
    company: 'Kloudstac',
    role: 'AI & ML Engineer',
    period: 'Jan 2024 — Nov 2024',
    location: 'Bengaluru',
    points: [
      'Developed and deployed AI agents and RAG-based systems (LangChain, LlamaIndex) to automate business workflows, reducing manual tasks by 40%.',
      'Designed and deployed cloud infrastructure on Azure with containerized environments, virtual networks and managed databases, improving platform performance and cost efficiency.',
      'Built an AI companion using Azure OpenAI and Graph RAG for code explanations and debugging, reducing solution development time by 30%.',
      'Delivered hands-on training in Python, machine learning, LLMs and generative AI for enterprise clients.',
      'Earlier, as AI/ML Engineering Intern (Jan — May 2023): API integrations for an AI-powered SaaS platform on Azure, NLP pipelines for customer-support automation, and a Node.js backend for a legal-services marketplace with an NLP chatbot.',
    ],
    tags: ['LangChain', 'LlamaIndex', 'Azure OpenAI', 'Graph RAG'],
  },
  {
    company: 'HARTING India',
    role: 'MLOps Engineering Intern',
    period: 'May 2023 — Dec 2023',
    location: 'Bengaluru',
    points: [
      'Designed modules for machine learning pipelines built to scale and adapt across cloud and on-premise environments.',
      'Implemented reusable modules to automatically train computer vision models, track parameters and data, and label images for training and validation.',
      'Implemented a fine-tuning module to minimize catastrophic forgetting in computer vision models.',
      'On the Industry 4.0 team: built a module to programmatically generate Asset Administration Shell submodels and metamodels to IDTA standards, plus real-time machine-to-AAS communication.',
    ],
    tags: ['MLOps', 'Computer Vision', 'Asset Administration Shell', 'Industry 4.0'],
  },
  {
    company: 'Gobaskt',
    role: 'Product Engineering · Remote retainer',
    period: 'Oct 2021 — Dec 2022',
    location: 'Remote',
    points: [
      'Product engineering for a US-based hyperlocal, AI-powered commerce platform built on AWS — business logic for food delivery, restaurant search, product catalog search and order status tracking.',
    ],
    tags: ['AWS', 'Backend', 'E-commerce'],
  },
];

export interface Project {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  visual: 'orbit' | 'road' | 'voice';
}

export const projects: Project[] = [
  {
    title: 'Context Accelerator',
    subtitle: 'Multi-tenant AI context platform',
    date: 'May 2026',
    description:
      'A full-stack, multi-tenant SaaS platform serving AI-generated business context. Real-time Claude analysis streams over Server-Sent Events with prompt caching, and a remote MCP server with a spec-compliant OAuth 2.1 layer lets Claude Desktop search, fetch and sync the context library directly. Runs on AWS with zero-touch deploys through GitHub Actions OIDC and SSM.',
    metrics: [
      { value: '~90%', label: 'lower repeat-run input token cost with prompt caching' },
      { value: '10', label: 'MCP tools behind OAuth 2.1 with PKCE' },
      { value: '5 min', label: 'checksum-based incremental sync' },
    ],
    tags: ['Claude', 'MCP', 'OAuth 2.1', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS'],
    visual: 'orbit',
  },
  {
    title: 'DriveSight AI Agent',
    subtitle: 'Serverless multimodal road intelligence',
    date: 'Nov 2025',
    description:
      'A serverless, real-time road intelligence system built for the Google Build & Blog Hackathon. Gemini 2.5 Flash handles scene analysis, object detection and hazard reasoning, while an ADK-based structured-output agent turns visual data into risk scores, severity labels and driving recommendations — persisted end to end from GCS through Cloud Run to Firestore.',
    metrics: [
      { value: '<500 ms', label: 'average inference time under load' },
      { value: '~40%', label: 'faster responses with caching and image hashing' },
    ],
    tags: ['Gemini 2.5 Flash', 'Cloud Run', 'FastAPI', 'ADK', 'Firestore'],
    visual: 'road',
  },
  {
    title: 'AI Interview System',
    subtitle: 'Avatar interviewer on a fine-tuned LLM',
    date: 'Apr 2024',
    description:
      'An interview system with an interactive avatar interface that simulates realistic candidate conversations. Mistral 7B is fine-tuned on domain-specific interview datasets, and responses are evaluated with semantic similarity, sentiment analysis and scoring logic to generate recruiter insights.',
    metrics: [{ value: '7B', label: 'parameter Mistral model, fine-tuned with LoRA' }],
    tags: ['Mistral 7B', 'LoRA', 'Hugging Face Transformers', 'NLP'],
    visual: 'voice',
  },
];

export const skills = [
  {
    title: 'Agentic AI & GenAI',
    items: [
      'Agent architecture',
      'Retrieval-Augmented Generation',
      'Model Context Protocol',
      'LangChain · LlamaIndex',
      'Prompt engineering',
      'LoRA fine-tuning',
      'Hugging Face Transformers',
    ],
  },
  {
    title: 'Backend & Data',
    items: ['Python', 'FastAPI · Django · Flask', 'REST APIs', 'Kafka · MQTT', 'PostgreSQL · ClickHouse', 'MongoDB · Redis', 'SQL'],
  },
  {
    title: 'Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Computer vision · YOLO', 'NumPy · Pandas', 'MLOps pipelines'],
  },
  {
    title: 'Cloud & Platform',
    items: ['AWS — EC2, SageMaker, IoT Core', 'Azure AI Services', 'Google Cloud Run', 'Docker', 'GitHub Actions', 'Linux'],
  },
];

export const education = {
  school: 'OP Jindal University',
  location: 'Raigarh, Chhattisgarh',
  degree: 'B.Tech, Computer Science and Engineering',
  detail: 'Cumulative GPA 9.25 / 10',
  coursework:
    'Data Analysis, Database Management Systems, Software Engineering, Operating Systems, Data Structures and Algorithms, Machine Learning, Discrete Mathematics, Deep Learning',
};

export const activities = [
  {
    title: 'IEEE Student Branch, OP Jindal University',
    role: 'Branch Secretary',
    detail: 'Organised and promoted 5+ quarterly networking and learning events with 300+ participants.',
  },
];

export const certifications = [
  'Data Science Using Python Programming',
  'Internet of Things',
  'Introduction to Cybersecurity (Cisco)',
  'Cybersecurity Essentials (Cisco)',
];

export const languages = ['English — fluent', 'Bengali — conversational', 'Hindi — conversational'];
