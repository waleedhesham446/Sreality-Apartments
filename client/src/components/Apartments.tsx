import React, { useEffect, useState } from "react";
import { Dialog, ButtonBase, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Pagination, Stack, Typography, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { useQuery } from "@tanstack/react-query";
import { fetch_apartments } from "../utils/apartments.ts";

const page_size = 15;

export const Apartments = () => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState<any[]>([]);
  const [viewApartment, setViewApartment] = useState<any>(null);
  const [view, setView] = useState(false);

  const { data } = useQuery<any[]>({
    queryKey: ['apartments', (page - 1) * page_size, page_size],
    queryFn: fetch_apartments
  });

  useEffect(() => {
    if (data) setList(data);
  }, [data]);

  const closePopup = () => {
    setView(false);
    setTimeout(() => {
      setViewApartment(null);
    }, 300);
  }
  
  return (
    <Stack height="100vh">
      <Stack sx={{ m: 3, mb: 0, p: 3, boxShadow: 'rgba(0, 0, 0, 0.06) 0px 0px 25px', borderRadius: 4, alignItems: 'flex-start' }}>
        <ButtonBase onClick={() => setPage(1)} disableRipple>
          <img src="https://www.sreality.cz/img/logo-sreality.svg" style={{ height: 24 }} />
        </ButtonBase>
      </Stack>
      <Stack gap={3} sx={{ m: 3, p: 3, boxShadow: 'rgba(0, 0, 0, 0.06) 0px 0px 25px', borderRadius: 4 }}>
        <Grid container spacing={3}>
          { list.length === 0 ? <CircularProgress /> :
            list.map((apartment, i) => (
              <Grid key={i} item xs={6} sm={4} md={3} lg={2}>
                <Card sx={{ maxWidth: 345, height: '100%', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 30px 0px', borderRadius: 2.5 }}>
                  <CardActionArea onClick={() => { setViewApartment(apartment); setView(true); }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={apartment.image_url}
                      alt={`A-${page * page_size + i + 1}`}
                    />
                    <CardContent>
                      <Typography variant="h5" fontSize={18}>{apartment.title}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>
        <Pagination count={Math.ceil(500/page_size)} color='primary' page={page} onChange={(_, p) => setPage(p)} 
          sx={{
            '.MuiPaginationItem-previousNext': { backgroundColor: '#F3F2F7', color: 'primary.main' },
            'button': { mx: 0 },
            'li div': { height: 32 },
            'li:not(:first-of-type, :last-child)': { backgroundColor: '#F3F2F7' },
            'li:nth-of-type(2)': { borderRadius: '50% 0 0 50%' },
            'li:nth-last-of-type(2)': { borderRadius: '0 50% 50% 0' },
            'li:first-of-type, li:last-child': { mx: 1 }
          }}
        />
      </Stack>
      <Dialog
        onClose={closePopup}
        open={view}
        sx={{ '.MuiPaper-root': { borderRadius: 2 } }}
      >
        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' p={2.5} sx={{ borderBottom: '1px solid #ECECEC' }}>
          <Typography variant='body1' fontWeight='bold' color='#111927'>{viewApartment?.title}</Typography>
          <IconButton onClick={closePopup}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <img src={viewApartment?.image_url} style={{ width: 500, margin: 24 }} />
      </Dialog>
    </Stack>
  )
}