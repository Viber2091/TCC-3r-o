from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__)

CORS(app)

client = genai.Client(api_key="CHAVE")

INSTRUCOES = "Você é um assistente de segurança do trabalho da Dornext..."

@app.route("/chat", methods=["POST"])
def chat():
    mensagem = request.json["message"]

    resposta = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=mensagem,
        config=types.GenerateContentConfig(
            system_instruction=INSTRUCOES
        )
    )

    return jsonify({"reply": resposta.text})


app.run(port=5000)