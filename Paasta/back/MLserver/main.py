from typing import Optional
from fastapi import FastAPI, File, UploadFile , Form

app = FastAPI()

# TODO: 
# OCR(??)
# Hand detection
# Object detection
# frame cutting 

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


@app.post("/image/")
async def upload_image(
    image: UploadFile = File(...),
    threshold: float = Form(...)):
    if threshold is None:
            threshold = 0.5
    else:
        threshold = float(threshold)
    try:
        # finally run the image through tensor flow object detection`
        image_object = Image.open(image_file)
        objects = object_detection_api.get_objects(image_object, threshold)
        return objects
    except Exception as e:
        print('POST /image error: %e' % e)
        return e
