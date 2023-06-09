import { useRef } from 'react';
import Slider from 'react-slick';
import { faker } from '@faker-js/faker';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
import { Icon } from '@iconify/react';
import { alpha, Box, Card, styled, Typography, useTheme } from '@mui/material';

import { mockImgFeed } from '@/utils/mockImages';

import { MIconButton } from '../@material-extend';

import { CarouselControlsArrowsBasic2 } from './controls';

const ContentItemStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderBottomLeftRadius: 16,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderBottomRightRadius: 16,
  justifyContent: 'space-between',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
  flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
}));

const CAROUSELS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.bio(),
    description: faker.lorem.paragraphs(),
    image: mockImgFeed(setIndex),
  };
});

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: '100%', height: 480, objectFit: 'cover' }}
      />

      <ContentItemStyle>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          {item.title}
        </Typography>
        <MIconButton
          onClick={() => {}}
          sx={{
            color: 'common.white',
            '&:hover': {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.common.white,
                  theme.palette.action.hoverOpacity
                ),
            },
          }}
        >
          <Icon icon={moreHorizontalFill} />
        </MIconButton>
      </ContentItemStyle>
    </Box>
  );
}

export default function CarouselBasic4() {
  const theme = useTheme();
  const carouselRef = useRef<Slider | null>(null);

  const settings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl'),
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
        {CAROUSELS.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
