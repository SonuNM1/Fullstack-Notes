- **Generative AI** is a type of AI that can generate new content based on patterns learned during training. 

- It can generate: 

    Text: chatbots, interview answers, summaries, emails 

    Images: image generation from prompts 

    Code: code suggestions, debugging, test generation 

    Audio: speech generation, transcription 

1. AI (Artificial Intelligence): A broad field of building systems that perform tasks associated with intelligence, such as reasoning, prediction and perception. 

2. Machine Learning (ML): A branch of AI where systems learn patterns from data instead of relying only on explicitly programmed rules 

3. Deep Learning: A type of ML using neural networks with multiple layers to learn complex patterns 

4. Generative AI: AI systems that can generate content, such as text, code, images or audio. 

5. LLM (Large Language Model): A model trained on larged amounts of data to process and generate language. Many modern LLMs are based on the Transformer Architecture. 

6. AI API: An interface that lets your backend send input to an AI model and receive output without managing the model infrastructure yourself. 


### How does an LLM actually work? 

1. The text is converted into tokens (small units of text) 

2. The model processes these tokens using its learned parameters and context. 

3. It predicts/generates output tokens, one step at a time 

4. Those tokens are decoded into the answer you read. 

- **Token:** A piece of text processed by the model 

- **Tokenization:** Converting text into tokens 

- **Embedding:** Representing data as a numerical vector 

- **Context Window:** Amount of input/output context a model can handle 

- **Hallucination:** Model produces incorrect or unsupported information 

- **Temperature:** A sampling setting that can influence output variability

- **Inference:** Running a trained model to generate a prediction/response


### What we have to learn? 

- LLM Fundamentals: Tokens, Context windows, Inference, Transformers basics

- Prompt Engineering: System instructions, User prompts, Few-shot prompting 

- LLM API Integration: Node.js, Streaming, Structured JSON, Error handling 

- Embeddings & Vector Search: Semantic search, Similarity, Vector databases

- RAG: Chat with PDFs, Company documents, Citations 

- AI Tools & Agents: Function calling, Tool execution, Workflows 

- Production AI: Evaluation, Security, Cost, Latency, Observability 

- Fine-tuning & Advanced Topics: When needed, model customization, multi-model AI


## Prompt Engineering 

- Prompts help guide the model's behaviour and output 

- Prompt Engineering means designing instructions and context to guide an AI model toward a useful output. 

    Weak Prompt: Explain React 

    Better prompt: You are a React mentor. Explain useEffect to a developer with 2 yoe. Include one practical code example, common mistakes and 3 interview questions. Keep it concise. 

- Useful prompting techniques include - zero shot prompting, few shot prompting, explicit output formulas and adding relevant context 


## How LLMs work internally - tokens, embeddings, neural networks, transformers and attention 