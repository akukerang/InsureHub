import os
import openai
import config
# Set your OpenAI API key

openai.api_key = config.api_key

#Questions and prompts
    #read the file up to the question mark for the questiom
    #read the rest of the file for the response

# Open a file for reading

    # q_a = ["", ""]
    # with open(file_name, 'r') as file:
    #     content = ''
    #     while True:
    #         char = file.read(1)  # Read one character at a time
    #         if char == '\n':  # Stop reading at the '?' char
    #             break
    #         content += char #add character to content
    #     q_a[0] = content #store question in file
        
    #     content = file.read(1) #set content to answer
    

def read_q_a(file_path):
    question = ""
    answer = ""

    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()  # Remove leading/trailing whitespace
            
            if not question:
                # If we haven't found a question yet, assume this line is the question
                question = line
            else:
                # If we've already found the question, append this line to the answer
                answer += line + " "

    # Remove trailing whitespace from the answer
    answer = answer.strip()

    return [question, answer]

print(read_q_a('text/need-insurance.txt')[0] + "\n\n" + read_q_a('text/need-insurance.txt')[1])


initial_chat = {
    read_q_a('text/what-is-insurance.txt')[0]: read_q_a('text/what-is-insurance.txt')[1],
    read_q_a('text/types-of-insurance.txt')[0]: read_q_a('text/types-of-insurance.txt')[1],
    read_q_a('text/need-insurance.txt')[0]: read_q_a('text/need-insurance.txt')[1],
    read_q_a('text/quotes.txt')[0]: read_q_a('text/quotes.txt')[1]
}

# for key, value in initial_chat.items():
#     print(f"Key: {key} \n\n Value: {value}\n\n")


# Make an API request
# Define the prompt for the API request
def call(first_question, video_answer, user_question):

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    max_tokens=100,
    messages = [
        {"role": "system", "content" : "You are InsureHub, You inform people about insurance. Keep the messages short and simple under 100 tokens, for dummies"},
        {"role": "user", "content" :  first_question},
        {"role": "assistant", "content" : video_answer},
        {"role": "user", "content" : user_question},
        ]
    )
    return response

# Extract and print the translated text
print("Full JSON response:")
#print(response)

# translated_text = response.choices[0].text.strip()
# print("\nTranslated text:", translated_text)
