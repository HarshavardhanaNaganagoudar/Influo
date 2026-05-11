from runwayml import RunwayML
from dotenv import load_dotenv
import os
import time

load_dotenv()

api_key = os.getenv("RUNWAYML_API_SECRET")

client = RunwayML(api_key=api_key)


def generate_video(image_url, prompt):

    task = client.image_to_video.create(
        model="veo3.1",
        prompt_image=image_url,
        prompt_text=prompt,
        duration=8,
        ratio="1280:720",
    )

    task_id = task.id

    while True:

        current_task = client.tasks.retrieve(task_id)

        print("Status:", current_task.status)

        if current_task.status == "SUCCEEDED":
            return current_task.output[0]

        if current_task.status == "FAILED":
            raise Exception("Video generation failed")

        time.sleep(5)