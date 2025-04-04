
from flask import Flask
from word2vec import Word2vec
from flask import request

app = Flask(__name__)
model = Word2vec()

@app.get("/random-word/<language>")
def random_word(language):
    return model.get_random_word(language)

@app.post("/add-new-word")
def add_new_word():
    data = request.get_json()
    word = data.get('word')
    language = data.get('language')
    if not word:
        return {"error": "Word is required"}, 400
    model.add_new_word(word, language)
    return {"message": f"The word '{word}' has been successfully added to the word list."}, 200

@app.get("/closest-word/<word>")
def closest_word(word):
    return model.get_closest_word(word)

if __name__ == "__main__":
    app.run()