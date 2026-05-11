# Influo

### Generate Influencer Ads with AI

Influo is an AI-powered platform that transforms product images into cinematic influencer-style promotional videos for TikTok, Instagram Reels, and YouTube Shorts.

Instead of traditional product ads, Influo creates authentic creator-style marketing content with:

* handheld smartphone realism
* creator-style framing
* social-media-native pacing
* direct-to-camera interaction
* realistic influencer energy

Upload a product image → generate a cinematic influencer prompt → create a viral-ready AI video.

---

# Demo

[Watch the Demo on YouTube](https://youtu.be/fHtgUaJJjrk?si=KojvDL0Lw58ZRE1M)

---

## Workflow

```txt
Upload Product Image
        ↓
Gemma4 Multimodal Analysis
        ↓
AI Influencer Prompt Generation
        ↓
Runway veo 3.1 Video Creation
        ↓
Generated Influencer-Style Video
```

---

# Why We Built This

Creating short-form influencer advertisements is expensive and time-consuming.

Brands and ecommerce stores often need:

* creators
* cameras
* production teams
* editing workflows
* social media optimization

Influo automates this workflow using multimodal AI and generative video models.

The goal is simple:

> Turn a single product image into a viral-ready creator video in minutes.

---

# Features

* AI-powered product understanding
* Multimodal image analysis using Gemma4
* Cinematic influencer-style prompt generation
* Runway veo 3.1 video generation
* Vertical video optimization for TikTok/Reels/Shorts
* Realistic creator-style marketing output
* Minimal and scalable interface
* Local AI execution using Ollama

---

# Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS

## Backend

* FastAPI
* Python

## AI Stack

* Ollama
* Gemma4 Multimodal
* Runway API

---

# How It Works

## 1. Product Image Upload

Users upload a product image through the React frontend.

## 2. Multimodal AI Analysis

The uploaded image is analyzed locally using Gemma4 through Ollama.

The model understands:

* product category
* design style
* materials
* aesthetic
* environment
* audience fit
* visual mood

## 3. Influencer Prompt Generation

Influo generates a highly cinematic creator-style Runway prompt optimized for:

* TikTok
* Instagram Reels
* YouTube Shorts

The generated prompts focus on:

* authentic influencer behavior
* handheld realism
* creator pacing
* social-media-native storytelling

## 4. Runway Video Generation

The generated prompt is sent to the Runway API.

Runway creates a realistic vertical AI-generated influencer video.

---

# Architecture

```txt
Frontend (React + Vite)
        ↓
FastAPI Backend
        ↓
Gemma4 via Ollama
(Image Understanding + Prompt Generation)
        ↓
Runway veo 3.1 API
(Video Generation)
        ↓
Generated AI Influencer Video
```

---

# Example Use Cases

* Ecommerce product marketing
* AI-generated TikTok ads
* Instagram Reel campaigns
* AI influencer marketing
* Creator-style product promotion
* Fashion and beauty campaigns
* Automotive promotional content
* Product launch videos

---

# Screenshots

## Upload Interface

*Add screenshot here*

## Generated Prompt

Hyper-realistic vertical YouTube Shorts style video of an energetic female runner influencer spontaneously showing off her Adidas Adizero Pro Evo 3 running shoes while walking outdoors in a sunlit urban park, selfie-style handheld camera with natural, slightly shaky movement, authentic direct eye contact, dynamic creator energy, close-up shots focusing on the shoe details and foot movement, natural and engaging facial expressions, casual athleisure aesthetic, vibrant natural lighting, fast engaging social media pacing, candid creator-style framing.

---

# Local Setup

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/influo.git
cd influo
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Backend runs on:

```txt
http://127.0.0.1:8000
```

---

# Environment Variables

Create a `.env` file inside `backend/`

```env
RUNWAYML_API_SECRET=your_runway_api_key
```

---

# Future Improvements

* Cloudinary/S3 image hosting
* Async task queue system
* Multiple influencer styles
* Brand-specific creator generation
* Voiceover generation
* AI avatar support
* Batch video generation
* Social publishing workflow
* Analytics dashboard

---

# Inspiration

Influo was built around the growing creator economy and the rise of AI-generated media.

Instead of replacing creators, Influo helps brands rapidly prototype creator-style campaigns using generative AI.

---

# Built For

Creator tools, AI marketing workflows, and the future of automated short-form content generation.

---
