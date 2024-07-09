// @mui
import {
    Box,
    Container,
} from '@mui/material';
import Page from '../../../components/Page';
import { useEffect, useRef, useState } from 'react';
import { getCategories } from 'src/redux/slices/category';
import { useDispatch, useSelector } from 'src/redux/store';

import ICON from 'src/assets/images/sdc.png'

// ----------------------------------------------------------------------

export default function GeneralBooking() {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);

    const [images, setImages] = useState([]);
    const [icon, setIcon] = useState({ name: 'round', image: ICON });

    useEffect(() => {
        dispatch(getCategories({
            search: ''
        }));
    }, []);

    useEffect(() => {
        if (categories?.length) {
            let tempArr = [];
            categories?.map((category) => {
                if (category?.imageUrl) {
                    tempArr.push({ title: category?.title, image: category?.imageUrl, description: category?.shortDesc })
                }
            })
            setImages(tempArr);
        }

    }, [categories]);


    return (
        <Page title="Dashboard">
            <Container>
                <h2>Admin dashboard</h2>
                <Box display={'flex'} gap={2}>
                    {
                        images.length > 0 &&
                        images.map((_cat) => {
                            return (<CanvasImage icon={icon} image={_cat} />)
                        }

                        )
                    }
                </Box>
                <Box display={'flex'} gap={2} mt={3}>
                    {
                        images.length > 0 &&
                        images.map((_cat) => {
                            return (<CanvasImage icon={icon} image={_cat} />)
                        }

                        )
                    }
                </Box>
            </Container>
        </Page>
    );
}

const CanvasImage = ({ image, icon }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {

            canvas.width = 1080;
            canvas.height = 1350;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const angle = 90 * (Math.PI / 180);
            const x0 = 0;
            const y0 = canvas.height;
            const x1 = canvas.width * Math.cos(angle);
            const y1 = canvas.height - (canvas.width * Math.sin(angle));

            const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
            gradient.addColorStop(0.50, 'black');
            gradient.addColorStop(0.70, 'transparent');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);



            const roundImg = new Image();
            roundImg.onload = () => {
                const roundImgSize = 300;
                const roundImgX = (canvas.width - roundImgSize) / 2;
                const roundImgY = 600;

                ctx.save();
                ctx.beginPath();
                ctx.arc(roundImgX + roundImgSize / 2, roundImgY + roundImgSize / 2, roundImgSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(roundImg, roundImgX, roundImgY, roundImgSize, roundImgSize);

                ctx.restore();

                // Draw title below the round image
                ctx.font = 'bold 72px Arial';
                ctx.fillStyle = '#febc44';
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
                ctx.fillStyle = '#fff';
                ctx.textAlign = 'center';

                wrapText(ctx, image?.description, canvas.width / 2, descriptionStartY, maxWidth, lineHeight);
            };

            roundImg.src = icon?.image;
        };

        img.src = image?.image;
    }, [image, icon]);

    return (
        <canvas ref={canvasRef} style={{ borderRadius: 12, width: '200px', height: '250px' }} />
    );
};
