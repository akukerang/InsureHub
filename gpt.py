import os
import openai
# Set your OpenAI API key

api_key_file = 'api_key.txt'

# Read the API key from the file
with open(api_key_file, 'r') as file:
    api_key = file.read().strip()

openai.api_key = api_key

openai.Model.list()

# Define the prompt for the API request
prompt = "What color is a banana"

# Make an API request
response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo", 
  messages = [{"role": "system", "content" : "You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible."},
{"role": "user", "content" : "How are you?"},
{"role": "assistant", "content" : "I am doing well"},
{"role": "user", "content" : "What is the mission of the company OpenAI?"}]
)

# Extract and print the translated text
print("Full JSON response:")
print(response)

translated_text = response.choices[0].text.strip()
print("\nTranslated text:", translated_text)
