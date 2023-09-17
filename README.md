# InsureHub
Shellhack 2023, Insurance based Tiktok Inspired website
## Requirements
- `pip install -r requirements.txt`
- `Python 3.10.x`
- ImageMagick
- FFMPEG
- OpenAI API Key
## Usage
- Create `config.py`, and enter `api_key = "SECRET KEY HERE"`
- Run main.py
- Go to link http://127.0.0.1:5000
## Making more videos
1. Goto `video.ipynb`
2. Follow the template, and adjust `minimum_silence_duration`, attempt to match length of `timing` and `textarray`
    ```
    textArray = getTextArray('text/what-is-insurance.txt')
    timing = generateTiming('audio/what-is-insurance.mp3' ,0.18)
    generateSubtitles(textArray, timing)
    makeVideo('videos/minecraftCropped.mp4', 'audio/TTS.wav', 'finalVid/what-is-insurance.webm')
    ```
3. Recommended for TTS: https://ttstool.com/