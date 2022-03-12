import { FC } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import { RouteProps, Outlet } from 'react-router-dom';

export const Main: FC<RouteProps> = () => {

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginBottom={4}
      >
        <Typography variant="h2" component="h1">The Rick and Morty</Typography>
      </Stack>
      <Outlet />
    </Container>
  );
}