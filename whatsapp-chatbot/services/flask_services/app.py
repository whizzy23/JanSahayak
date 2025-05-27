from flask import Flask, request, jsonify
from nlp_service import classify_text_urgency

app = Flask(__name__)

@app.route("/classify", methods=["POST"])
def classify():
    data = request.get_json()
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "Text is required"}), 400

    urgency = classify_text_urgency(text)
    return jsonify({"urgency": urgency})

if __name__ == "__main__":
    app.run(debug=True)
