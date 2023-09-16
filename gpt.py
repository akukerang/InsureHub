import os
import openai
import config
# Set your OpenAI API key

openai.api_key = config.api_key

# print(openai.Model.list())

# Define the prompt for the API request
prompt = "What color is a banana"

types = """
What are the different types of insurance? Let's break down the different types of insurance. Imagine health insurance as a sort of savings account for when you're not feeling well. You put in a bit of money regularly, and when you need to see a doctor or buy medicines. that account helps cover the costs. Now, auto insurance is like having a safety net for your car. If your car gets into an accident or trouble, this insurance steps in to help pay for the repairs. It's like having a backup plan for your vehicle.Moving on to homeowners insurance, think of it as a protective shield for your home. If something unfortunate happens, like a fire or a break-in, this insurance steps up to fix your house or replace your belongings.Life insurance, on the other hand, is like a financial gift to your family in case something happens to you. You pay a little money, and if you pass away, your loved ones receive a sum of money to help them during a tough time.So, these various types of insurance are like safety nets or protectors that you invest in, so they're there to help you when unexpected problems or expenses arise. You pay a little bit regularly, and in return, they provide support when you need it most."
"""
# Make an API request
response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo", 
  max_tokens=100,
  messages = [
      {"role": "system", "content" : "You are InsureHub, You inform people about insurance. Keep the messages short and simple under 100 tokens, for dummies"},
      {"role": "user", "content" : "What are the types of insurance?"},
      {"role": "assistant", "content" : types},
      {"role": "user", "content" : "What is the most important one out of them?"},
    ]
)

# Extract and print the translated text
print("Full JSON response:")
print(response)

# translated_text = response.choices[0].text.strip()
# print("\nTranslated text:", translated_text)
