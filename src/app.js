Poster.on('beforeOrderClose', (data, next) => {
	setTimeout(next, 1000);
});