from moviepy.editor import VideoFileClip, AudioFileClip, TextClip, CompositeVideoClip, concatenate
from moviepy.video.fx import resize
import wave
import numpy as np




def makeVideo(gameplayVid):
    gameplayVid = gameplayVid.subclip(0,10)
    new_width = int(gameplayVid.size[1] * (9/16)) 
    x_offset = (gameplayVid.size[0] - new_width) / 2
    cropped_clip = gameplayVid.crop(x_offset, 0, x_offset + new_width, gameplayVid.size[1])
    cropped_clip.write_videofile("finalVid/final2.mp4",fps=30)

# gameplayVid = VideoFileClip("videos/minecraft.mp4")
# makeVideo(gameplayVid)

