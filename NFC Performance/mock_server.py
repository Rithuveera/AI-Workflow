from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime
import asyncio
import random

app = FastAPI()

# In-memory storage to simulate a database mapping Employee UUID -> Tag Data
mapped_nfc_tags = {}

class NfcPayload(BaseModel):
    tag_id: str
    signature: str
    employee_id: str
    log_time: str

@app.post("/api/v1/attendance/log")
async def log_attendance(request: NfcPayload):
    # Simulate processing delay
    await asyncio.sleep(random.uniform(0.01, 0.1))
    
    # Store the log
    mapped_nfc_tags[request.employee_id] = {
        "tag_id": request.tag_id,
        "signature": request.signature,
        "log_time": request.log_time,
        "synced_at": datetime.now().isoformat()
    }
    
    return {"status": "success", "message": "queued"}

@app.get("/api/v1/nfc/records")
async def get_records():
    return mapped_nfc_tags

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
