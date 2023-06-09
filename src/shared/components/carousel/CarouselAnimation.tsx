import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { faker } from '@faker-js/faker';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

import { mockImgFeed } from '@/utils/mockImages';

import { MotionContainer, varFadeInRight } from '../animate';

import { CarouselControlsArrowsIndex } from './controls';

const CAROUSELS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.bio(),
    description: faker.lorem.paragraphs(),
    image: mockImgFeed(setIndex),
  };
});

const CarouselImgStyle = styled('img')(() => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({
  item,
  isActive,
}: {
  item: CarouselItemProps;
  isActive: boolean;
}) {
  const theme = useTheme();
  const { image, title } = item;

  return (
    <Paper
      sx={{
        position: 'relative',
        paddingTop: { xs: '100%', md: '50%' },
      }}
    >
      <CarouselImgStyle alt={title} src={image} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${
            theme.palette.grey[900]
          } 0%,${alpha(theme.palette.grey[900], 0)} 100%)`,
        }}
      />
      <CardContent
        sx={{
          bottom: 0,
          width: '100%',
          maxWidth: 480,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <MotionContainer open={isActive}>
          <motion.div variants={varFadeInRight}>
            <Typography variant="h3" gutterBottom>
              {item.title}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Typography variant="body2" noWrap gutterBottom>
              {item.description}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Button variant="contained" sx={{ mt: 3 }}>
              View More
            </Button>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Paper>
  );
}

export default function CarouselAnimation() {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? CAROUSELS.length - 1 : 0
  );

  const settings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {CAROUSELS.map((item, index) => (
          <CarouselItem
            key={item.title}
            item={item}
            isActive={index === currentIndex}
          />
        ))}
      </Slider>

      <CarouselControlsArrowsIndex
        index={currentIndex}
        total={CAROUSELS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
