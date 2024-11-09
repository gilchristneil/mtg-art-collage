
import cv2 
import matplotlib.pyplot as plt 
from PIL import Image
import numpy as np

#convert to bitmap -  dimensional array where each array holds a list of the RGB values of that specific pixel
def convert_img_to_bitmap(image):
    img = Image.open(image)
    return [img.getpixel((x, y)) for x in range(img.width) for y in range(img.height)]


#build pyramid level
def get_pyramid(image, levels=4):
    pyramid = {}
    layer = cv2.imdecode(np.asarray(bytearray(image), dtype="uint8"), -1)
    for l in range(levels):
        plt.subplot(2,2,l+1)
        layer = cv2.pyrDown(layer)
        pyramid[f"level_{l}"]=layer

    return pyramid
