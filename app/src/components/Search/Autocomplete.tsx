import React, { useState, useEffect } from 'react';

import { SUBREDDIT_SEARCH_TEXT_PLACEHOLDER } from '../../constants';
import { fetchSubredditNameOptions, SubRedditNamesResponse, debounce } from '../../services/api';

import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

interface AutocompleteProps {
  selectedOption: string
  selectOption: (option: string) => void
}

const fetchOptions = debounce(async (searchText: string, setLocalOptions: (res: string[]) => void, setOfflineStatus: (isOffline: boolean) => void, load: any) => {
  const response: SubRedditNamesResponse = await fetchSubredditNameOptions(searchText);
  if (response.status === 'online') {
    setLocalOptions(response.subRedditNames);
    setOfflineStatus(false);
    return;
  } else {
    setOfflineStatus(true);    
  }
  load(false);
}) as any;

/* eslint-disable no-use-before-define */
export default function SearchOptions(props: AutocompleteProps) {
  const [ searchText, setText ] = useState('');
  const [ options, setOptions ] = useState<string[] | []>([]);
  const [ isOffline, setOffline ] = useState(false);
  const [ isLoading, setLoading ] = useState(false);
  
  useEffect(() => {
    if (!isOffline && searchText) {
      setLoading(true);
      fetchOptions(searchText, setOptions, setOffline, setLoading);
    }
  }, [searchText, isOffline]);

  return (
    <Autocomplete
      id="autocomplete-search-options"
      value={props.selectedOption}
      onChange={(ev: any, newOption: string | null) => {
        props.selectOption(newOption || '');
      }}
      options={options}
      getOptionLabel={(option: string) => option}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={isOffline ? 'Offline': SUBREDDIT_SEARCH_TEXT_PLACEHOLDER}
          variant="outlined"
          margin="none"
        />
      )}
      loading={isLoading}
      inputValue={searchText}
      onInputChange={(ev: any, newInputValue) => setText(newInputValue)}
      renderOption={(option: string, { inputValue }: { inputValue: string }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);

        return (
          <div>
            {parts.map((part: any, index: any) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { name: 'The Shawshank Redemption', year: 1994 },
  { name: 'The Godfather', year: 1972 },
  { name: 'The Godfather: Part II', year: 1974 },
  { name: 'The Dark Knight', year: 2008 },
  { name: '12 Angry Men', year: 1957 },
  { name: "Schindler's List", year: 1993 },
  { name: 'Pulp Fiction', year: 1994 },
  { name: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { name: 'The Good, the Bad and the Ugly', year: 1966 },
  { name: 'Fight Club', year: 1999 },
  { name: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { name: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { name: 'Forrest Gump', year: 1994 },
  { name: 'Inception', year: 2010 },
  { name: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { name: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { name: 'Goodfellas', year: 1990 },
  { name: 'The Matrix', year: 1999 },
  { name: 'Seven Samurai', year: 1954 },
  { name: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { name: 'City of God', year: 2002 },
  { name: 'Se7en', year: 1995 },
  { name: 'The Silence of the Lambs', year: 1991 },
  { name: "It's a Wonderful Life", year: 1946 },
  { name: 'Life Is Beautiful', year: 1997 },
  { name: 'The Usual Suspects', year: 1995 },
  { name: 'Léon: The Professional', year: 1994 },
  { name: 'Spirited Away', year: 2001 },
  { name: 'Saving Private Ryan', year: 1998 },
  { name: 'Once Upon a Time in the West', year: 1968 },
  { name: 'American History X', year: 1998 },
  { name: 'Interstellar', year: 2014 },
  { name: 'Casablanca', year: 1942 },
  { name: 'City Lights', year: 1931 },
  { name: 'Psycho', year: 1960 },
  { name: 'The Green Mile', year: 1999 },
  { name: 'The Intouchables', year: 2011 },
  { name: 'Modern Times', year: 1936 },
  { name: 'Raiders of the Lost Ark', year: 1981 },
  { name: 'Rear Window', year: 1954 },
  { name: 'The Pianist', year: 2002 },
  { name: 'The Departed', year: 2006 },
  { name: 'Terminator 2: Judgment Day', year: 1991 },
  { name: 'Back to the Future', year: 1985 },
  { name: 'Whiplash', year: 2014 },
  { name: 'Gladiator', year: 2000 },
  { name: 'Memento', year: 2000 },
  { name: 'The Prestige', year: 2006 },
  { name: 'The Lion King', year: 1994 },
  { name: 'Apocalypse Now', year: 1979 },
  { name: 'Alien', year: 1979 },
  { name: 'Sunset Boulevard', year: 1950 },
  { name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { name: 'The Great Dictator', year: 1940 },
  { name: 'Cinema Paradiso', year: 1988 },
  { name: 'The Lives of Others', year: 2006 },
  { name: 'Grave of the Fireflies', year: 1988 },
  { name: 'Paths of Glory', year: 1957 },
  { name: 'Django Unchained', year: 2012 },
  { name: 'The Shining', year: 1980 },
  { name: 'WALL·E', year: 2008 },
  { name: 'American Beauty', year: 1999 },
  { name: 'The Dark Knight Rises', year: 2012 },
  { name: 'Princess Mononoke', year: 1997 },
  { name: 'Aliens', year: 1986 },
  { name: 'Oldboy', year: 2003 },
  { name: 'Once Upon a Time in America', year: 1984 },
  { name: 'Witness for the Prosecution', year: 1957 },
  { name: 'Das Boot', year: 1981 },
  { name: 'Citizen Kane', year: 1941 },
  { name: 'North by Northwest', year: 1959 },
  { name: 'Vertigo', year: 1958 },
  { name: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { name: 'Reservoir Dogs', year: 1992 },
  { name: 'Braveheart', year: 1995 },
  { name: 'M', year: 1931 },
  { name: 'Requiem for a Dream', year: 2000 },
  { name: 'Amélie', year: 2001 },
  { name: 'A Clockwork Orange', year: 1971 },
  { name: 'Like Stars on Earth', year: 2007 },
  { name: 'Taxi Driver', year: 1976 },
  { name: 'Lawrence of Arabia', year: 1962 },
  { name: 'Double Indemnity', year: 1944 },
  { name: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { name: 'Amadeus', year: 1984 },
  { name: 'To Kill a Mockingbird', year: 1962 },
  { name: 'Toy Story 3', year: 2010 },
  { name: 'Logan', year: 2017 },
  { name: 'Full Metal Jacket', year: 1987 },
  { name: 'Dangal', year: 2016 },
  { name: 'The Sting', year: 1973 },
  { name: '2001: A Space Odyssey', year: 1968 },
  { name: "Singin' in the Rain", year: 1952 },
  { name: 'Toy Story', year: 1995 },
  { name: 'Bicycle Thieves', year: 1948 },
  { name: 'The Kid', year: 1921 },
  { name: 'Inglourious Basterds', year: 2009 },
  { name: 'Snatch', year: 2000 },
  { name: '3 Idiots', year: 2009 },
  { name: 'Monty Python and the Holy Grail', year: 1975 },
];
