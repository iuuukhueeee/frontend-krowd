import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
import { faker } from '@faker-js/faker';
import {
  alpha,
  Box,
  Card,
  CardContent,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

import { MotionContainer, varFadeInRight } from '@/shared/components/animate';
import {
  CarouselControlsArrowsBasic1,
  CarouselControlsPaging1,
} from '@/shared/components/carousel';
import { mockImgFeed } from '@/utils/mockImages';

const CAROUSELS = [
  'Harry Potter and the Deathly Hallows - Part 2',
  'Disney Zombies 2',
  'Lightroom mobile - Koloro',
].map((item, index) => {
  const setIndex = index + 1;

  return {
    title: item,
    description: faker.lorem.lines(),
    image: mockImgFeed(setIndex),
  };
});

const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: 280,
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320,
  },
  background: 'red',
}));

type CarouselItemProps = {
  item: {
    image: string;
    title: string;
    description: string;
  };
  isActive?: boolean;
};

function CarouselItem({ item, isActive }: CarouselItemProps) {
  const { image, title, description } = item;

  return (
    <RouterLink to="#">
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          }}
        />
        <CarouselImgStyle alt={title} src={image} />
        <CardContent
          sx={{
            bottom: 0,
            width: '100%',
            textAlign: 'left',
            position: 'absolute',
            color: 'common.white',
          }}
        >
          <MotionContainer open={isActive}>
            <motion.div variants={varFadeInRight}>
              <Typography
                variant="overline"
                sx={{
                  mb: 1,
                  opacity: 0.48,
                  display: 'block',
                }}
              >
                Featured App
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h5" gutterBottom noWrap>
                {title}
              </Typography>
            </motion.div>
            <motion.div variants={varFadeInRight}>
              <Typography variant="body2" noWrap>
                {description}
              </Typography>
            </motion.div>
          </MotionContainer>
        </CardContent>
      </Box>
    </RouterLink>
  );
}

export default function AppFeatured() {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(
    theme.direction === 'rtl' ? CAROUSELS.length - 1 : 0
  );

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current: number, next: number) => setCurrentIndex(next),

    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto',
        right: 'auto',
      },
    }),
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

      <CarouselControlsArrowsBasic1
        data-id="carousel-controls-arrows-basic"
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
