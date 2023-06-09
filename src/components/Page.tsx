// import { useLocation } from 'react-router-dom';
import { forwardRef, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, BoxProps } from '@mui/material';
// import track from '../utils/analytics';

interface PageProps extends BoxProps {
  children: ReactNode;
  title?: string;
}

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', ...other }, ref) => {
    // const { pathname } = useLocation();

    // const sendPageViewEvent = useCallback(() => {
    //   track.pageview({
    //     page_path: pathname
    //   });
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //   sendPageViewEvent();
    // }, [sendPageViewEvent]);

    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </Box>
    );
  }
);

export default Page;
