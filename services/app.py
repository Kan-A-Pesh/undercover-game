
from flask import Flask
from word2vec import Word2vec

app = Flask(__name__)
model = Word2vec()

@app.get("/getRandomWord")
def get_random_word():
    return model.get_random_word()

@app.get("/getClosestWord/<word>")
def get_closest_word(word):
    return model.get_closest_word(word)

if __name__ == "__main__":
    app.run()