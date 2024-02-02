import classes from './Header.module.css';
import { Typography } from '@mui/material';
import { Auth } from '../Auth';

export function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Typography variant="h1">Expenses Tracker</Typography>
      </div>
      <div className={classes.profile}>
        <Auth />
      </div>
    </header>
  );
}
