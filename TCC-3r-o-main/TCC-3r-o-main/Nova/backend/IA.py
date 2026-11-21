import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)

CORS(app)
client = genai.Client(api_key="")
http_options=types.HttpOptions(
timeout=15000,  
retry_options=types.HttpRetryOptions(attempts=1), 
    ),

MODELOS = ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.5-flash-lite"]

INSTRUCOES = "Você é um assistente de segurança do trabalho da Dornext..."

@app.route("/chat", methods=["POST"])
def chat():
    mensagem = request.json["message"]

    for modelo in MODELOS:
        try:
            resposta = client.models.generate_content(
                model=modelo,
                contents=mensagem,
                config=types.GenerateContentConfig(
                    system_instruction=INSTRUCOES
                ),
            )
            return jsonify({"reply": resposta.text})
        except Exception as erro:
            print(f"Falha com {modelo}: {erro}")

    return jsonify({
        "error": "A IA está sobrecarregada no momento. Tente novamente em alguns instantes."
    }), 503


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


app.run(port=5000)