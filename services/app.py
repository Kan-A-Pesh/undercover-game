
from flask import Flask
from word2vec import Word2vec
from flask import request

app = Flask(__name__)
model = Word2vec()

@app.get("/RandomWord")
def random_word():
    return model.get_random_word()

@app.post("/addNewWord")
def add_new_word():
    data = request.get_json()
    word = data.get('word')
    if not word:
        return {"error": "Word is required"}, 400
    model.add_new_word(word)
    return {"message": f"The word '{word}' has been successfully added to the word list."}, 200

@app.get("/ClosestWord/<word>")
def closest_word(word):
    return model.get_closest_word(word)

if __name__ == "__main__":
    app.run()