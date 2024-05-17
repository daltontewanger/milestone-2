// import { TextField, InputAdornment, Box } from '@mui/material';
// import { Search } from '@mui/icons-material';
import SearchForm from './SearchForm';

function MovieList() {



    return (
        <div>
            <h1 align="center">Welcome to JEDCV Movie Reviews</h1>
            {/* <Box display="flex" justifyContent="center" height="100vh">
                <TextField
                    variant="outlined"
                    placeholder="Search Movies"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box> */}
            <SearchForm />
        </div>
    );
};

export default MovieList;