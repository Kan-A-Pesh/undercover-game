import random

from gensim.models import KeyedVectors
import time

class Word2vec:
  def __init__(self):
    try:
      print("Loading Word2Vec model...")
      
      start_time = time.time()
      self.model = KeyedVectors.load_word2vec_format('./googleNews.bin', binary=True)
      load_time = time.time() - start_time
      
      print(f"Word2Vec model loaded in {load_time:.2f} seconds")
    except Exception as e:
      print(f"Error loading Word2Vec model: {e}")


  def get_random_word(self):
    return random.choice(self.model.index_to_key)
  
  
  def get_closest_word(self, word):
    words = self.model.most_similar(word, topn=10)
    closestwords = [word[0] for word in words]
    print (closestwords)
    randomWord = random.choice(closestwords)
    
    while randomWord.lower().startswith(word.lower()):
      randomWord = random.choice(closestwords)
    
    return randomWord