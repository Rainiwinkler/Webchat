// index.js
app.post('/discover-movies', (req, res) => {
    console.log('[POST] /discover-movies');
    const memory = req.body.conversation.memory;
    const movie = memory.movie;
    const tv = memory.tv;

    // Check for the presence of entities movie or tv
    // If both are present, we prioritize movie
    const kind = movie ? 'movie' : 'tv';

    const genre = memory.genre;
    const genreId = constants.getGenreId(genre.value);

    const language = memory.language;
    const nationality = memory.nationality;

    // Similar to movie and tv, we prioritize language over nationality
    const isoCode = language
      ? language.short.toLowerCase()
      : nationality.short.toLowerCase();

    return discoverMovie(kind, genreId, isoCode)
      .then((carouselle) => res.json({
        replies: carouselle,
      }))
      .catch((err) => console.error('movieApi::discoverMovie error: ', err));
  });

app.listen(config.PORT, () => console.log(`App started on port ${config.PORT}`));
