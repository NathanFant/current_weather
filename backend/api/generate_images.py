import os
import time
import requests
from dotenv import load_dotenv
from weather_descriptions import weather_descriptions

load_dotenv()
REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

OUTPUT_DIR = "frontend/public/weather_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Replicate endpoint info
REPLICATE_URL = "https://api.replicate.com/v1/predictions"
REPLICATE_MODEL_VERSION = "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc"  # working SDXL version

HEADERS = {
    "Authorization": f"Token {REPLICATE_API_TOKEN}",
    "Content-Type": "application/json",
}


def slugify(text):
    return text.lower().replace(" ", "_").replace("/", "_")


def generate_image(prompt: str, filename: str):
    print(f"🎨 Generating: {prompt}")

    body = {
        "version": REPLICATE_MODEL_VERSION,
        "input": {
            "prompt": prompt,
            "width": 1920,
            "height": 1080,
            "refine": "expert_ensemble_refiner",
            "apply_watermark": False,
            "num_inference_steps": 25,
        },
    }

    # Start prediction
    response = requests.post(REPLICATE_URL, headers=HEADERS, json=body)
    if response.status_code != 201:
        print(f"Failed to start prediction for {prompt}: {response.text}")
        return

    prediction = response.json()
    prediction_url = prediction["urls"]["get"]

    # Polling for image generation to complete
    while True:
        poll_response = requests.get(prediction_url, headers=HEADERS)
        result = poll_response.json()
        status = result["status"]

        if status == "succeeded":
            image_url = result["output"][0]
            break
        elif status == "failed":
            print(f"Generation failed for {prompt}")
            return
        else:
            print(f"Waiting for image generation ({status})...")
            time.sleep(3)

    # Download the image
    filepath = os.path.join(OUTPUT_DIR, filename)
    img_data = requests.get(image_url).content
    with open(filepath, "wb") as f:
        f.write(img_data)
    print(f"Saved to {filepath}")


# Main loop
for desc in weather_descriptions:
    filename = f"{slugify(desc)}.jpg"
    prompt = f"A realistic photo of a sky with the weather being {desc}"
    generate_image(prompt, filename)
    time.sleep(10)  # Delay between requests to avoid rate limiting
