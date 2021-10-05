import { useState, useEffect } from 'react'

import { Button } from './Button';

import '../styles/sidebar.scss';

import { api } from '../services/api';

interface SideBarProps {
  genres: GenreResponseProps[]
  setMovies: React.Dispatch<React.SetStateAction<MovieProps[]>>
  setSelectedGenre: React.Dispatch<React.SetStateAction<GenreResponseProps>>
}

interface GenreResponseProps {
  id: number;
  title: string;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function SideBar(props: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      props.setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      props.setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);  

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }
  
  return (
    <nav className="sidebar">

      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {props.genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
      
    </nav>
  )
}