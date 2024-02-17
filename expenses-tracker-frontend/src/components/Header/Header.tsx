import classes from './Header.module.css';
import { Typography } from '@mui/material';
import { Auth } from '../Auth';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [text, setText] = useState('Default Text');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setText('ET');
      } else {
        setText('Expenses Tracker');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={classes.header}>
      <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
        <div className={classes.container}>
          <Typography variant="h1">{text}</Typography>
        </div>
      </Link>
      <div className={classes.profile}>
        <Auth />
      </div>
    </header>
  );
}
