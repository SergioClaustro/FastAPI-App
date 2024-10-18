from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from typing import Optional
from starlette.requests import Request

# Crear la aplicación FastAPI
app = FastAPI()

# Montar directorio para archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configurar templates
templates = Jinja2Templates(directory="templates")

# Definir el endpoint de nombres
@app.get("/nombres")
async def obtener_nombres(filtro: Optional[str] = None):
    nombres = ["Juan", "María", "Pedro", "Ana", "Luis"]
    if filtro:
        nombres = [nombre for nombre in nombres if filtro.lower() in nombre.lower()]
    return {"nombres": nombres}

# Definir la ruta para el HTML
@app.get("/", response_class=HTMLResponse)
async def leer_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Ejecutar la aplicación
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
