from moviepy.editor import VideoFileClip, AudioFileClip, TextClip, CompositeVideoClip, concatenate
from moviepy.video.fx import resize
from moviepy.video.tools.subtitles import SubtitlesClip
import scipy.io.wavfile as wav
import numpy as np
import re



def makeVideo(gameplayVidPath, audioFilePath):
    TTS = AudioFileClip(audioFilePath)
    gameplayVid = VideoFileClip(gameplayVidPath)
    gameplayVid = gameplayVid.subclip(0,TTS.duration)

    #Crops to Mobile Screen
    new_width = int(gameplayVid.size[1] * (9/16)) 
    x_offset = (gameplayVid.size[0] - new_width) / 2
    cropped_clip = gameplayVid.crop(x_offset, 0, x_offset + new_width, gameplayVid.size[1])


    generator = lambda txt: TextClip(txt, font='Arial-Bold', color = 'white', stroke_color = 'black', stroke_width=1, method='caption',fontsize=25)
    subtitles = SubtitlesClip("./text/subs.srt", generator)
    final = CompositeVideoClip([cropped_clip, subtitles])
    final.audio = TTS
    final.write_videofile("finalVid/output.mp4",fps=30)

def getTextArray(textFile):
    f = open(textFile, "r")
    text = f.read()
    f.close()
    sentence_pattern = r'[.,!?]\s*'
    sentences = re.split(sentence_pattern, text)
    return sentences



def generateTiming(audioFile):
    audio = AudioFileClip(audioFile)
    audio.write_audiofile('audio/TTS.wav') # Converts mp3 into wav file
    audio.close()
    sample_rate, audio_data = wav.read('audio/TTS.wav')

    threshold = 600  # Adjust this value based on your audio data
    min_silence_duration = 0.1  # Adjust this value as needed

    silence_timing = []
    is_silence = True
    silence_start_time = 0

    for i, amplitude in enumerate(audio_data):
        if abs(amplitude[0]) > threshold:
            if not is_silence:
                is_silence = True
                silence_duration = (i / sample_rate) - silence_start_time
                if silence_duration >= min_silence_duration:
                    silence_timing.append((silence_start_time, i / sample_rate))
        else:
            if is_silence:
                silence_start_time = i / sample_rate
                is_silence = False

    # # Check if the audio ends with silence longer than min_silence_duration
    if is_silence:
        silence_duration = (len(audio_data) / sample_rate) - silence_start_time
        if silence_duration >= min_silence_duration:
            silence_timing.append((silence_start_time, len(audio_data) / sample_rate))

    sound_segments = []
    for i in range(len(silence_timing) - 1): # Genereates segments of sound from silence
        silence_end_time = silence_timing[i][1]
        next_silence_start_time = silence_timing[i + 1][0]
        sound_segments.append((silence_end_time, next_silence_start_time))
    sound_segments.append((silence_timing[len(silence_timing)-1][1], len(audio_data) / sample_rate)) # Add the last segment
    return sound_segments

def generateSubtitles(sentences, timing):
    f = open("text/subs.srt", "w")
    for i in range(0,len(timing)):
        f.write(str(i+1) + '\n')
        f.write(f'{convertToTime(timing[i][0])} --> {convertToTime(timing[i][1])} \n')
        f.write(sentences[i]+ '\n' + '\n')
    f.close()

def convertToTime(seconds: float): #Conversion from seconds to 00:00:00,000 for SRT file
    millisecond = seconds % 1 * 1000
    seconds = seconds % (24 * 3600)
    hour = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60
    return f'{"%02d" %hour}:{"%02d" %minutes}:{"%02d" %seconds},{"%03d" %millisecond}'

textArray = getTextArray('text/what-is-insurance.txt')
timing = generateTiming('audio/what-is-insurance.mp3')
generateSubtitles(textArray, timing)



gameplayVid = VideoFileClip("videos/minecraft.mp4")
makeVideo('videos/minecraft.mp4', 'audio/TTS.wav')