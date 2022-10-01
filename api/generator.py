import click
import os
from moviepy.editor import *

@click.command()
@click.flag("hash", "the hash dir for the movie")
def generate_story(hash):

    outdir = "stories/"+hash+"/"

    # stable diffusion

    all_imgs = [
        outdir + name for name in os.listdir(outdir)
        if name.endswith('png') 
    ]

    clip = ImageSequenceClip(all_imgs, fps = 5)

    clip.ipython_display(width = 512)





    


