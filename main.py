from flask import Flask, render_template, request, jsonify
import openai
import config
app = Flask(__name__)

conversation = []
openai.api_key = config.api_key

@app.route('/')
def index():
    return render_template('index.html',conversation=conversation)

@app.route('/reset')
def reset():
    global conversation
    conversation = [
        {"role": "system", "content" : "You are InsureHub, You inform people about insurance. Keep the messages short and simple under 100 tokens, for dummies"},   
    ]

@app.route('/comment', methods=['POST'])
def getResponse():
    comment = request.form['comment']
    question = {}
    question['role'] = 'user'
    question['content'] = comment
    conversation.append(question)

    response = {}
    response['role'] = 'assistant'
    requests = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", 
        max_tokens=100,
        messages=conversation,
    )
    response['content'] = requests.choices[0]['message']['content']
    conversation.append(response)
    return jsonify({'bot_response': response['content']})








app.run(port = 5000)

