import random

from gensim.models import KeyedVectors
import urllib.request
import time
import os
import gzip
import shutil

MODEL_DOWNLOAD_LINK="https://media.githubusercontent.com/media/eyaler/word2vec-slim/refs/heads/master/GoogleNews-vectors-negative300-SLIM.bin.gz"

class Word2vec:
  def __init__(self):
    try:
      print("Downloading model")

      # Create the /model folder if it doesn't exist
      model_dir = './model'
      os.makedirs(model_dir, exist_ok=True)

      # Define the model file path
      model_file_path = os.path.join(model_dir, 'googleNews.bin')

      # Download the model if it doesn't already exist
      if not os.path.exists(model_file_path):
          compressed_model_path = os.path.join(model_dir, 'GoogleNews-vectors-negative300-SLIM.bin.gz')
          print("Downloading the Word2Vec model...")
          urllib.request.urlretrieve(MODEL_DOWNLOAD_LINK, compressed_model_path)
          print("Download complete. Extracting the model...")

          # Unzip the downloaded file
          with gzip.open(compressed_model_path, 'rb') as f_in:
              with open(model_file_path, 'wb') as f_out:
                  shutil.copyfileobj(f_in, f_out)

          # Remove the compressed file after extraction
          os.remove(compressed_model_path)
          print("Model extracted and ready to use.")
      else:
          print("Model already exists. Skipping download.")

      print("Loading Word2Vec model...")
      
      start_time = time.time()
      self.model = KeyedVectors.load_word2vec_format('./model/googleNews.bin', binary=True)
      load_time = time.time() - start_time
      
      print(f"Word2Vec model loaded in {load_time:.2f} seconds")
    except Exception as e:
      print(f"Error loading Word2Vec model: {e}")


#!                                  _____  _____   ______    _____      _____ 
#!                              ___|\    \|\    \ |\     \  |\    \    /    /|
#!                             /    /\    \\\    \| \     \ | \    \  /    / |
#!                            |    |  |    |\|    \  \     ||  \____\/    /  /
#!                            |    |__|    | |     \  |    | \ |    /    /  / 
#! Cursed random word: takes  |    .--.    | |      \ |    |  \|___/    /  /   word from word2vec model
#!                            |    |  |    | |    |\ \|    |      /    /  /   
#!                            |____|  |____| |____||\_____/|     /____/  /    
#!                            |    |  |    | |    |/ \|   ||    |`    | /     
#!                            |____|  |____| |____|   |___|/    |_____|/      
#!                              \(      )/     \(       )/         )/         
#!                               '      '       '       '          '          
  def get_random_word(self):
    return random.choice(self.model.index_to_key)
  
  
  def get_closest_word(self, word):
    words = self.model.most_similar(word, topn=10)
    
    closestwords = [word[0] for word in words]
    print (closestwords)
    
    randomWord = random.choice(closestwords)
    max_retries = 10
    retries = 0
    while word.lower() in randomWord.lower() and retries < max_retries:
        randomWord = random.choice(closestwords)
        retries += 1
    
    return randomWord