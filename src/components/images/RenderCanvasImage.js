// @mui
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

// ----------------------------------------------------------------------

export default function RenderCanvasImage({ images, icon }) {

    return (
        <Box>
            {
                images.length > 0 &&
                images.map((_img, index) => <CanvasImage icon={icon} image={_img} key={index} />)
            }
        </Box>
    );
}

const CanvasImage = ({ image, icon }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {

            canvas.width = 1200;
            canvas.height = 1500;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const angle = 90 * (Math.PI / 180);
            const x0 = 0;
            const y0 = canvas.height;
            const x1 = canvas.width * Math.cos(angle);
            const y1 = canvas.height - (canvas.width * Math.sin(angle));

            const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
            gradient.addColorStop(0.50, image?.palette?.background || 'black');
            gradient.addColorStop(0.70, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);



            const roundImg = new Image();
            roundImg.onload = () => {
                const roundImgSize = 250;
                const roundImgX = (canvas.width - roundImgSize) / 2;
                const roundImgY = 700;

                ctx.save();
                ctx.beginPath();
                ctx.arc(roundImgX + roundImgSize / 2, roundImgY + roundImgSize / 2, roundImgSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(roundImg, roundImgX, roundImgY, roundImgSize, roundImgSize);

                ctx.restore();

                // Draw title below the round image
                ctx.font = 'bold 72px Arial';
                ctx.fillStyle = image?.palette?.title || 'tomato';
                ctx.textAlign = 'center';
                ctx.fillText(image?.title, canvas.width / 2, roundImgY + roundImgSize + 70);

                // Wrap and draw description text
                const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
                    const words = text.split(' ');
                    let line = '';
                    let lineNumber = 0;

                    for (let n = 0; n < words.length; n++) {
                        const testLine = line + words[n] + ' ';
                        const metrics = context.measureText(testLine);
                        const testWidth = metrics.width;

                        if (testWidth > maxWidth && n > 0) {
                            context.fillText(line, x, y + (lineNumber * lineHeight));
                            line = words[n] + ' ';
                            lineNumber++;
                        } else {
                            line = testLine;
                        }
                    }
                    context.fillText(line, x, y + (lineNumber * lineHeight));
                };

                const maxWidth = canvas.width - 20; // 10px padding on each side
                const lineHeight = 80;
                const descriptionStartY = roundImgY + roundImgSize + 160;

                ctx.font = 'bold 60px Arial';
                ctx.fillStyle = image?.palette?.description || '#fff';
                ctx.textAlign = 'center';

                wrapText(ctx, image?.description, canvas.width / 2, descriptionStartY, maxWidth, lineHeight);
            };

            roundImg.src = icon?.image;
        };

        img.src = image?.image;
    }, [image, icon]);

    return (
        <canvas ref={canvasRef} style={{ margin: '10px', borderRadius: 12, width: '200px', height: '250px' }} />
    );
};
