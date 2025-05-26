from flask import Flask, request, jsonify
import spacy
import json

app = Flask(__name__)

# Load the spaCy English model
nlp = spacy.load("en_core_web_sm")

# Define keyword sets for each urgency level
high_urgency_keywords = {
    "explosion", "fire", "blast", "flood", "short circuit", "electric shock", "gas leak",
    "fatal", "injury", "emergency", "accident", "collapsed", "died", "death", "bleeding",
    "serious", "severe", "critical", "danger", "unsafe", "life-threatening"
}

medium_urgency_keywords = {
    "water leakage", "leaking", "internet down", "no internet", "power cut", "no electricity",
    "power outage", "power failure", "blocked road", "clogged", "damaged pipe", "crack in wall",
    "no water", "fan not working", "ac not working", "lift stuck", "broken light", "malfunction",
    "low voltage", "overheating", "network issue", "plumbing issue"
}

low_urgency_keywords = {
    "slow wifi", "dust", "noise", "dirty", "garbage", "smell", "mosquito", "rats", "light flicker",
    "dirty floor", "cleaning needed", "unhygienic", "maintenance required", "bugs", "small leak",
    "water drip", "minor issue", "rust", "peeling paint", "old wiring", "slow drainage"
}

def classify_urgency(text):
    text = text.lower()
    doc = nlp(text)

    # Check for phrases as well as single words
    text_tokens = set(token.text for token in doc)
    text_full = text

    # Match against phrase keywords
    high_score = any(kw in text_full for kw in high_urgency_keywords)
    medium_score = any(kw in text_full for kw in medium_urgency_keywords)
    low_score = any(kw in text_full for kw in low_urgency_keywords)

    if high_score:
        return "High"
    elif medium_score:
        return "Medium"
    elif low_score:
        return "Low"
    else:
        return "Low"

@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()
    text = data.get('text', '')
    urgency = classify_urgency(text)
    return jsonify({'urgency': urgency})

if __name__ == '__main__':
    app.run(port=5000) 