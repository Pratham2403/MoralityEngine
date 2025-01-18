# Morality Engine - Ethical Decision Making Simulator 🤖

## Overview 🌟

Morality Engine is an interactive web application that simulates ethical dilemmas in autonomous decision-making systems. It combines cutting-edge ML/AI technologies with an intuitive 3D interface to explore complex moral scenarios through different ethical frameworks.

## Features ✨

### Frontend Interface

- **Interactive 3D Visualizations**

  - Built with Three.js and Blender
  - Real-time scenario rendering
  - Dynamic camera controls and scene manipulation

- **Ethical Framework Controls**
  - Utilitarianism parameter adjustments
  - Deontological ethics rule settings
  - Virtue ethics characteristic tuning
  - Real-time decision impact visualization

### Backend Architecture

- **Multi-Agent AI System**
  - Sequential processing pipeline
  - Thread-based parallel decision making
  - Master-slave architecture for complex scenarios
  - Chain of thought reasoning implementation
  - Crew AI integration for collaborative decision making

## Tech Stack 🛠️

### Frontend

- React + Vite
- Three.js
- Material-UI/Chakra UI
- React Router DOM
- Redux/Context API

### Backend

- Python
- LangChain
- CrewAI
- Custom Agent Frameworks

## Installation 💻

1. Clone the repository:

```bash
git clone https://github.com/yourusername/morality-engine.git
cd morality-engine
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

4. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Running the Application 🚀

1. Start the backend server:

```bash
cd backend
python main.py
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

3. Access the application at `http://localhost:3000`

## Project Structure 📁

```
morality-engine/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── styles/
│   ├── public/
│   └── vite.config.js
├── backend/
│   ├── agents/
│   │   ├── sequential/
│   │   ├── threaded/
│   │   └── master_slave/
│   ├── models/
│   └── api/
└── models/
    └── 3d/
```

## Available Scenarios 🎯

1. **Autonomous Vehicle Decisions**

   - Multiple-party collision scenarios
   - Pedestrian interaction dilemmas

2. **Resource Allocation**

   - Medical resource distribution
   - Emergency response prioritization

3. **Security Scenarios**

   - Threat assessment and response
   - Civilian protection protocols

4. **Healthcare Decisions**
   - Organ donation prioritization
   - Treatment resource allocation

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

MIT License - see the [LICENSE](LICENSE) file for details

## Contact 📧

- Project Link: [https://github.com/yourusername/morality-engine](https://github.com/yourusername/morality-engine)
- Documentation: [https://docs.morality-engine.io](https://docs.morality-engine.io)

## Acknowledgments 🙏

- Three.js Community
- React Team
- CrewAI Contributors
- LangChain Developers
