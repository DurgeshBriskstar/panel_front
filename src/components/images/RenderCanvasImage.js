// @mui
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import Iconify from '../Iconify';

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

        img.crossOrigin = 'anonymous';

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
                const roundImgY = 730;

                ctx.save();
                ctx.beginPath();
                ctx.arc(roundImgX + roundImgSize / 2, roundImgY + roundImgSize / 2, roundImgSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(roundImg, roundImgX, roundImgY, roundImgSize, roundImgSize);

                ctx.restore();

                // Draw title below the round image
                ctx.font = 'bold 65px Arial';
                ctx.fillStyle = image?.palette?.title || 'tomato';
                ctx.textAlign = 'center';
                ctx.fillText(image?.title, canvas.width / 2, roundImgY + roundImgSize + 80);

                // Wrap and draw description text
                const wrapText = (context, text, x, y, maxWidth, lineHeight) => {
                    const words = text.split(' ');
                    let line = '';
                    let lines = [];

                    for (let n = 0; n < words.length; n++) {
                        const testLine = line + words[n] + ' ';
                        const metrics = context.measureText(testLine);
                        const testWidth = metrics.width;

                        if (testWidth > maxWidth && n > 0) {
                            lines.push(line);
                            line = words[n] + ' ';
                        } else {
                            line = testLine;
                        }
                    }
                    lines.push(line);

                    lines.forEach((line, index) => {
                        drawStyledText(context, line, x, y + (index * lineHeight), maxWidth);
                    });
                };

                const drawStyledText = (context, text, centerX, y, maxWidth) => {
                    const parts = text.split('#');
                    let offsetX = centerX;
                    const partWidths = [];

                    parts.forEach(part => {
                        context.font = 'bold 50px Arial';
                        partWidths.push(context.measureText(part).width);
                    });

                    const totalWidth = partWidths.reduce((acc, width) => acc + width, 0);

                    offsetX = centerX - totalWidth / 2;

                    parts.forEach((part, index) => {
                        if (index % 2 === 1) {
                            context.font = 'bold 50px Arial';
                            context.fillStyle = image?.palette?.highlight || image?.palette?.title;
                        } else {
                            context.font = 'bold 50px Arial';
                            context.fillStyle = image?.palette?.description || '#fff';
                        }

                        context.fillText(part, offsetX, y);
                        offsetX += partWidths[index];
                    });
                };

                const maxWidth = canvas.width + 250;
                const lineHeight = 80;
                const descriptionStartY = roundImgY + roundImgSize + 180;

                ctx.font = 'bold 60px Arial';
                ctx.fillStyle = image?.palette?.description || '#fff';
                ctx.textAlign = 'left';

                wrapText(ctx, image?.description, canvas.width / 2, descriptionStartY, maxWidth, lineHeight);

                // Draw "Hello" at the bottom of the canvas
                ctx.font = 'bold 30px Arial';
                ctx.fillStyle = image?.palette?.description; // Change the color if needed
                ctx.textAlign = 'center';
                ctx.fillText(image?.footerText || "", canvas.width / 2, canvas.height - 30);
            };

            roundImg.src = icon?.image;
        };

        img.src = image?.image;
    }, [image, icon]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'download.png';
        link.click();
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <canvas ref={canvasRef} style={{ margin: '10px', borderRadius: 12, width: '200px', height: '250px' }} />
            <button
                onClick={handleDownload}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                <Iconify icon={'eva:download-fill'} width="14px" height="14px" />
            </button>
        </div>
    );
};
