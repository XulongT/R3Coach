<h1 align="center">🧘 R³Coach</h1>

<h3 align="center">Reconstruction, Recommendation, and Responsive Guidance for In-situ XR Fitness Training</h3>

<p align="center">
  <a href="https://github.com/XulongT/R3Coach">
    <img src="https://img.shields.io/badge/Node.js-22%2B-339933?logo=nodedotjs&amp;logoColor=white" alt="Node.js 22+">
  </a>
  <a href="https://github.com/XulongT/R3Coach" title="arXiv link pending; opens the repository">
    <img src="https://img.shields.io/badge/arXiv-coming%20soon-lightgrey" alt="arXiv coming soon">
  </a>
  <a href="https://github.com/XulongT/R3Coach" title="Project page link pending; opens the repository">
    <img src="https://img.shields.io/badge/Project_Page-coming%20soon-lightgrey" alt="Project page coming soon">
  </a>
  <a href="https://github.com/XulongT/R3Coach">
    <img src="https://img.shields.io/badge/GitHub-R3Coach-181717?logo=github" alt="GitHub R3Coach">
  </a>
</p>

> **R³Coach is a multi-agent in-situ XR training system that combines multimodal retrieval with 3D motion generation, helping you observe your posture, discover movements tailored to your needs, and follow personalized corrective guidance during practice.**

## 📦 Installation

Requires **Node.js 22 or newer**.

```sh
npm ci
npm start
```

Open http://localhost:8080. Build the client separately with `npm run build`.
The server binds to `127.0.0.1` by default; use `PORT` to choose another port.

### 🛠️ Set up the Environment

**1. Create the environment.**

```bash
conda create -n R3Coach python=3.10.18 pip -y
conda activate R3Coach
sudo apt update
sudo apt install -y build-essential ffmpeg libsndfile1 curl
```

**2. Install PyTorch (CUDA 12.8) and build dependencies.**

```bash
python -m pip install torch==2.7.1 --index-url https://download.pytorch.org/whl/cu128
python -m pip install -c requirements.txt numpy==1.23.5 setuptools wheel packaging ninja psutil
```

**3. Install CUDA extensions and dependencies.**

```bash
MAX_JOBS=4 NVCC_THREADS=2 CAUSAL_CONV1D_FORCE_BUILD=TRUE MAMBA_FORCE_BUILD=TRUE \
  python -m pip install --no-build-isolation -c requirements.txt \
  causal-conv1d==1.5.3.post1 mamba-ssm==2.2.6.post3
python -m pip install --no-build-isolation -r requirements.txt
python -m pip install -e . --no-deps
```

## 🥽 Connect Meta Quest

With developer mode enabled and the headset authorized through Android Platform Tools, connect your Quest over USB and run:

```sh
adb reverse tcp:8080 tcp:8080
```

Then open http://localhost:8080 in Quest Browser. Immersive mode requires a compatible browser and a secure context (HTTPS or localhost).

## 🙏 Acknowledgements

This work is standing on the shoulders of giants. We thank the contributors of
[FlowerDance](https://github.com/XulongT/FlowerDance),
[TMR](https://github.com/Mathux/TMR),
[Mamba](https://github.com/state-spaces/mamba),
[causal-conv1d](https://github.com/Dao-AILab/causal-conv1d),
[SAT-HMR](https://github.com/ChiSu001/SAT-HMR),
[PromptHMR](https://github.com/yufu-wang/PromptHMR),
[MDM](https://github.com/GuyTevet/motion-diffusion-model),
[StableMotion](https://github.com/Murrol/StableMotion), and
[CLIP](https://github.com/openai/CLIP).
We also thank [MOYO](https://github.com/sha2nkt/moyo_toolkit) for providing yoga motion data and supporting tools, and [SMPL](https://smpl.is.tue.mpg.de/) for providing the human body model.
