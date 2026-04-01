(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Book',
        isbn: '111111',
        publishedYear: 2024,
        pageCount: 150,
        language: 'English',
        description: 'My test book',
        authorId: 'author-1',
        publisherId: 'publisher-1',
        genres: ['Fantasy'],
      }),
    });
    console.log('status', res.status);
    const text = await res.text();
    console.log(text);
  } catch (error) {
    console.error(error);
  }
})();
