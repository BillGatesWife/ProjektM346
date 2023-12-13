from PIL import Image
import sys

def resize_image(input_path):
    base_width = 300
    img = Image.open(input_path)
    w_percent = (base_width / float(img.size[0]))
    h_size = int((float(img.size[1]) * float(w_percent)))
    img = img.resize((base_width, h_size), Image.ANTIALIAS)
    img.save(input_path)  # Overwrite the original image

if __name__ == "__main__":
    image_path = sys.argv[1]
    resize_image(image_path)
