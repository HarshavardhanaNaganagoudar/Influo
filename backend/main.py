from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from services.gemma_service import generate_runway_prompt
from services.runway_service import generate_video

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.post("/generate-video")
async def generate_video_endpoint(
    file: UploadFile = File(...),
    image_url: str = Form(...)
):

    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # GEMMA PROMPT
    generated_prompt = generate_runway_prompt(file_path)

    print("\nGENERATED PROMPT:\n")
    print(generated_prompt)

    # RUNWAY VIDEO
    video_url = generate_video(
        image_url=image_url,
        prompt=generated_prompt
    )

    return {
        "success": True,
        "prompt": generated_prompt,
        "video_url": video_url
    }