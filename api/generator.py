import cv2
import glob
import os
from moviepy.editor import *

def generate_story_cv(hash, music_num):
    outdir = "./stories/"+hash+"/"

    img_array = []
    for filename in glob.glob(outdir + 'samples/*.png'):
        img = cv2.imread(filename)
        img_array.append(img)

    out = cv2.VideoWriter(outdir+'movie.avi', cv2.VideoWriter_fourcc(*'DIVX'), 0.25, (img_array[0].shape[1],img_array[0].shape[0]))

    for i in range(len(img_array)):
        out.write(img_array[i])
    out.release()

    cv2.destroyAllWindows()

def add_music(vid_hash, music_file):
    outdir = "./stories/" + vid_hash + "/"
    video_clip = VideoFileClip(outdir+'movie.avi')
    video_clip.write_videofile(outdir+'preStoryTime.mp4', fps=24)
    os.system('ffmpeg -i '+ outdir+'preStoryTime.mp4'+' -i '+ music_file + ' -shortest '+ outdir +'StoryTime.mp4')



if __name__ == '__main__':
    # generate_story()
    hash = sys.argv[1]
    music_num = int(sys.argv[2])
    generate_story_cv(hash, music_num)
    song_dict = {-1 :'./music/s.mp3', 0:'./music/n.mp3', 1:'./music/h.mp3'}
    add_music(hash, song_dict[music_num]) #have sentiment analysis passed here.
