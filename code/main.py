from fastapi import FastAPI 
import uvicorn
from transformers import AutoTokenizer, T5ForConditionalGeneration
from pydantic import BaseModel




app = FastAPI(title="Code Generative Model")

class PromptRequest(BaseModel):
    prompt: str

class BotResponse(BaseModel):
    bot: str

@app.post("/")
async def response(prompt: PromptRequest):
    print(prompt.prompt)
    tokenizer = AutoTokenizer.from_pretrained("Salesforce/codet5-large-ntp-py")
    model = T5ForConditionalGeneration.from_pretrained("Salesforce/codet5-large-ntp-py")
    input_ids = tokenizer(prompt.prompt, return_tensors="pt").input_ids
    generated_ids = model.generate(input_ids, max_length=128)
    return BotResponse(bot=tokenizer.decode(generated_ids[0], skip_special_tokens=True))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=7000,
        log_level="debug",
        reload=True,
    )
