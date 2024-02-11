import { Header } from '../../components/Header/Header';
import classes from './PageLayout.module.css';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps): React.ReactElement {
  return (
    <>
      <Header />
      <div className={classes.body}>{children}</div>
    </>
  );
}
