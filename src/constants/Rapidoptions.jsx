export const Rapidoptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f4d8c4b0damshaaa929b9a6a3bd1p174e49jsn66d467e50843',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
}}

export const Rapidpostoptions = {
        method: 'POST',
        url:'https://imdb188.p.rapidapi.com/api/v1/getPopularTVShows',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'f4d8c4b0damshaaa929b9a6a3bd1p174e49jsn66d467e50843',
            'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
        },
        body: {
            country: {
                anyPrimaryCountries: ['IN']
            },
            limit: 200,
            releaseDate: {
                releaseDateRange: {
                    end: '2029-12-31',
                    start: '2020-01-01'
                }
            },
            userRatings: {
                aggregateRatingRange: {max: 10, min: 6},
                ratingsCountRange: {min: 1000}
            },
            genre: {
                allGenreIds: ['Action']
            },
            runtime: {
                runtimeRangeMinutes: {max: 120, min: 0}
            }
        }
    };
