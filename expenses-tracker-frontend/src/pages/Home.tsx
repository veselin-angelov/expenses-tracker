import { Button } from '@mui/material';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { HttpService } from '../services/http-service';

export function Home() {
  const http = new HttpService();
  const { trigger } = useAsyncAction(async () => await http.get('/'));

  return (
    <>
      <h1>Hello world</h1>;<Button onClick={() => trigger()}>Click </Button>
    </>
  );
}
