import Image from 'next/image';

export default function About() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">About Me</h1>

                {/* Contact */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact</h2>
                        <p className="text-gray-600"><strong>Location:</strong> Raigarh, Chhattisgarh, India</p>
                        <p className="text-gray-600"><strong>Phone:</strong> +91 9981257969</p>
                        <p className="text-gray-600"><strong>Email:</strong> <a href="mailto:arindamchakraborty6.10@gmail.com" className="text-indigo-600 hover:underline">arindamchakraborty6.10@gmail.com</a></p>
                        <p className="text-gray-600"><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/arindm007" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">linkedin.com/in/arindm007</a></p>
                        <p className="text-gray-600"><strong>GitHub:</strong> <a href="https://github.com/arindm007" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">github.com/arindm007</a></p>
                    </div>
                    {/* Optional profile image */}
                    <div className="flex items-center justify-center">
                        <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">Profile Image</span>
                        </div>
                    </div>
                </div>

                {/* Professional Summary */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Professional Summary</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Software Engineer with expertise in designing and developing scalable backend systems, middleware platforms, and RESTful APIs using Python. Skilled in building data processing pipelines, integrating databases, and optimizing system performance for real‑time analytics. Experienced in applying machine learning and deep learning techniques for tasks such as object detection, classification, and infrastructure assessment. Adept at collaborating in interdisciplinary teams, writing efficient, reusable code, and architecting reliable cloud‑native solutions.
                    </p>
                </section>

                {/* Education */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>
                            <strong>OP JINDAL UNIVERSITY</strong>, Raigarh, Chhattisgarh, India – B.Tech in Computer Science and Engineering (June 2024)
                            <br />
                            GPA: 9.25/10.0
                            <br />
                            Relevant Coursework: Data Analysis, Database Management Systems, Software Engineering, Operating Systems, Data Structures & Algorithms, Machine Learning, Discrete Mathematics, Deep Learning
                        </li>
                        <li>
                            <strong>OP JINDAL SCHOOL</strong>, Raigarh, Chhattisgarh, India – High School (Mar 2018 – Apr 2019)
                            <br />
                            Academic Score: 82.3% (CBSE)
                            <br />
                            Relevant Coursework: Physics, Chemistry, Biology, Mathematics
                        </li>
                    </ul>
                </section>

                {/* Work Experience */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Work Experience</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-medium text-gray-900">Project Associate I – Indian Institute of Science (IISc), Bengaluru</h3>
                            <p className="text-gray-500 text-sm mb-2">Aug 2025 – Present</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Designed and developed scalable, microservices‑based backend architectures for real‑time crowd‑sourced road data collection using MQTT, Kafka, and Python (Django/Flask/FastAPI).</li>
                                <li>Built data ingestion and processing pipelines for high‑throughput sensor and IoT data, integrating TimescaleDB and PostgreSQL for geospatial analytics.</li>
                                <li>Architected cloud‑native, containerized (Docker) solutions ensuring scalability, reliability, and fault tolerance.</li>
                                <li>Collaborated with interdisciplinary teams to implement distributed systems and explored Rust for high‑performance data processing.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-900">Junior Research Assistant Fellow – Technology Innovation Hub on Autonomous Navigation (TiHAN), IIT Hyderabad</h3>
                            <p className="text-gray-500 text-sm mb-2">Nov 2024 – Aug 2025</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Engineered adaptive SDV architectures to integrate AI and machine learning solutions across edge devices, cloud, and web platforms.</li>
                                <li>Developed AI‑driven vehicle systems, including a Software‑Defined Vehicle (SDV) dashboard and remote monitoring with AI‑assisted emotion detection.</li>
                                <li>Implemented camera‑based object and obstacle detection using YOLO to improve real‑time vehicle perception.</li>
                                <li>Built robust middleware platforms for real‑time data processing, ensuring seamless API integration across cloud, edge, and web.</li>
                                <li>Created an AI‑driven announcement system for an autonomous campus shuttle, enabling context‑aware passenger notifications.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-medium text-gray-900">Student Intern – HARTING India Private Limited, Bengaluru</h3>
                            <p className="text-gray-500 text-sm mb-2">May 2023 – Dec 2023</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Worked in the MLOps team to design scalable modules for machine learning pipelines across cloud and on‑premise environments.</li>
                                <li>Implemented reusable software modules for automatic training of computer vision models and data labeling pipelines.</li>
                                <li>Developed fine‑tuning modules to minimize catastrophic forgetting in vision models.</li>
                                <li>Contributed to the Asset Administrative Shell (AAS) team, creating reusable modules for generating AAS submodels and ensuring IDTA compliance.</li>
                                <li>Implemented protocols for real‑time machine‑to‑AAS communication, enhancing interoperability in industrial settings.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selected Projects</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li><strong>Object Detection with DINO and COCO Evaluation (Sep 2024)</strong> – Developed a high‑precision computer vision model achieving 91.1% AP and 70.4% AR.</li>
                        <li><strong>AI‑powered Interview System with Avatar Interface (Apr 2024)</strong> – Built an interview simulation platform using a fine‑tuned Mistral 7B model and LoRA.</li>
                        <li><strong>IoT‑based Crop Prediction Model (Mar 2023)</strong> – Created a Raspberry Pi solution for real‑time crop forecasting using Firebase.</li>
                        <li><strong>IoT‑based Pest Detection Model (Jan 2023)</strong> – Developed a pest detection pipeline with edge devices and a supporting web app.</li>
                    </ul>
                </section>

                {/* Activities */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Activities</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Branch Secretary – IEEE Student Branch, OP Jindal University (Apr 2023 – May 2024)</li>
                        <li>Volunteer – NSS, OP Jindal University (Nov 2022 – Present)</li>
                    </ul>
                </section>

                {/* Technical Skills */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Technical Skills</h2>
                    <p className="text-gray-600"><strong>Languages:</strong> Python, JavaScript/TypeScript, Rust (exploratory)</p>
                    <p className="text-gray-600"><strong>Frameworks:</strong> Flask, Django, FastAPI, Next.js, React</p>
                    <p className="text-gray-600"><strong>ML/DL:</strong> PyTorch, TensorFlow, Scikit‑learn, Hugging Face Transformers, LoRA</p>
                    <p className="text-gray-600"><strong>Tools & Platforms:</strong> Docker, Kubernetes, AWS EC2, AWS IoT Core, PostgreSQL, TimescaleDB, MySQL, SQL Server</p>
                    <p className="text-gray-600"><strong>Other:</strong> CI/CD, Git, Linux, Data Analysis, Computer Vision, Edge Computing</p>
                </section>
            </div>
        </section>
    );
}
