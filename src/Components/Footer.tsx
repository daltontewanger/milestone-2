import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = ({ isMainPage }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 3,
        position: isMainPage ? 'fixed' : 'static',
        bottom: isMainPage ? 0 : 'auto',
        left: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Typography variant="h6">Connect with us:</Typography>
      <Box sx={{ mt: 2 }}>
        <IconButton
          component="a"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          sx={{ color: 'inherit' }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          sx={{ color: 'inherit' }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          sx={{ color: 'inherit' }}
        >
          <YouTubeIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          sx={{ color: 'inherit' }}
        >
          <FacebookIcon />
        </IconButton>
      </Box>
      <Typography variant="body2">© 2024 by JEDCV. All rights reserved.</Typography>
    </Box>
  );
}

export default Footer;
