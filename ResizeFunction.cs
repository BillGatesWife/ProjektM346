using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace resizeImage;

public static Image resizeImage(Image image, int width, int height)
{
    image.Mutate(x => x.Resize(new ResizeOptions
    {
        Size = new Size(width, height),
        Mode = ResizeMode.Max
    }));
    return image;
}