export function handleSearchQuery(obj) {
    obj.query = obj.$route.query.query;
    obj.type = obj.$route.query.type;
    const rating = obj.$route.query.rating;
    const selectedStartYear = obj.$route.query.start_year;
    const selectedEndYear = obj.$route.query.end_year;
    const selectedGenre = obj.$route.query.genre;
    const params = {
        type: obj.$route.query.type || '',
        query: obj.$route.query.query || '',
        start_year: selectedStartYear || '',
        end_year: selectedEndYear || '',
        genre: selectedGenre || '',
        rating: rating || '',
    }

    return params
}