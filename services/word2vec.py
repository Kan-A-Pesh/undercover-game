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
    # Get a random word from the model's vocabulary
    # Check if wordList.txt exists
    if os.path.exists('wordList.txt'):
      # Read words from the file
      with open('wordList.txt', 'r') as file:
        words = [line.strip() for line in file if line.strip()]
      
      # If there are words in the file, choose a random one
      if words:
        random_word = random.choice(words)
      else:
        # Fallback to model vocabulary if file is empty
        random_word = random.choice(self.model.index_to_key)
    else:
      # Fallback to model vocabulary if file doesn't exist
      random_word = random.choice(self.model.index_to_key)
    
    try:
      # Find the closest word by vector similarity
      closest_word = self.get_closest_word(random_word)
      return [random_word, closest_word]
    except KeyError:
      # If there's an issue finding similar words, try another random word
      return self.get_random_word()
  
  def add_new_word(self, word):
    # Check if the file exists, if not create it
    file_path = 'wordList.txt'
    with open(file_path, 'a') as file:
      # Add new word with a line break
      file.write(f"{word}\n")
  
  def get_closest_word(self, word):
    words = self.model.most_similar(word, topn=10)
    
    closest_words = [word[0] for word in words]
    print(closest_words)
    
    randomWord = random.choice(closest_words)
    retries = 0
    max_retries = 10
    while word.lower() in randomWord.lower() and retries < max_retries:
        randomWord = random.choice(closestwords)
        retries += 1
    
    return randomWord