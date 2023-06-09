import * as React from 'react';
import { styled, alpha, makeStyles } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import ball from '../pokeball.png';
import { Image } from 'react-bootstrap';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export const NavigationBar = () => {
  const appBarStyle = { backgroundColor: '#f44336' };
  const [pokemonName, setPokemonName] = useState('');

  const navigate = useNavigate();

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then((res) => {
      setPokemonName(pokemonName);
      const pokemonid = res.data.id;
      navigate(`/detail/${pokemonid}`);
      window.location.reload();
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={appBarStyle}>
          <Toolbar>
            <Typography variant="h6" noWrap component="a" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/'}>
                <Image fluid src={ball} style={{ width: '50px' }} />
              </Link>
            </Typography>
            <Search>
              <StyledInputBase
                onChange={(event) => {
                  setPokemonName(event.target.value);
                }}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
              <Button onClick={searchPokemon}>
                <SearchIconWrapper>
                  <SearchIcon style={{ color: 'white' }} />
                </SearchIconWrapper>
              </Button>
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavigationBar;
