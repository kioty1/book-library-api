import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL || "",
  }),
});

async function main() {
  const genres = [
    { id: "genre-1", name: "Fantasy" },
    { id: "genre-2", name: "Drama" },
    { id: "genre-3", name: "Science Fiction" },
    { id: "genre-4", name: "Mystery" },
    { id: "genre-5", name: "Adventure" },
    { id: "genre-6", name: "Romance" },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: {},
      create: genre,
    });
  }

  const authors = [
    {
      id: "author-1",
      firstName: "J.K.",
      lastName: "Rowling",
      birthYear: 1965,
      nationality: "British",
    },
    {
      id: "author-2",
      firstName: "George",
      lastName: "Orwell",
      birthYear: 1903,
      nationality: "British",
    },
    {
      id: "author-3",
      firstName: "Agatha",
      lastName: "Christie",
      birthYear: 1890,
      nationality: "British",
    },
    {
      id: "author-4",
      firstName: "J.R.R.",
      lastName: "Tolkien",
      birthYear: 1892,
      nationality: "British",
    },
    {
      id: "author-5",
      firstName: "Jane",
      lastName: "Austen",
      birthYear: 1775,
      nationality: "British",
    },
    {
      id: "author-6",
      firstName: "Frank",
      lastName: "Herbert",
      birthYear: 1920,
      nationality: "American",
    },
  ];

  for (const authorData of authors) {
    const existingAuthor = await prisma.author.findFirst({
      where: {
        firstName: authorData.firstName,
        lastName: authorData.lastName,
      },
    });

    if (!existingAuthor) {
      await prisma.author.create({
        data: authorData,
      });
    }
  }

  const publishers = [
    {
      id: "publisher-1",
      name: "Bloomsbury",
      country: "UK",
      foundedYear: 1986,
    },
    {
      id: "publisher-2",
      name: "Penguin Books",
      country: "UK",
      foundedYear: 1935,
    },
    {
      id: "publisher-3",
      name: "HarperCollins",
      country: "USA",
      foundedYear: 1989,
    },
    {
      id: "publisher-4",
      name: "Vintage",
      country: "USA",
      foundedYear: 1954,
    },
  ];

  for (const publisherData of publishers) {
    const existingPublisher = await prisma.publisher.findFirst({
      where: { name: publisherData.name },
    });

    if (!existingPublisher) {
      await prisma.publisher.create({
        data: publisherData,
      });
    }
  }

  const books = [
    {
      title: "Harry Potter and the Deathly Hallows",
      isbn: "123456789",
      publishedYear: 2007,
      pageCount: 500,
      language: "English",
      description: "Fantasy book",
      authorName: { firstName: "J.K.", lastName: "Rowling" },
      publisherName: "Bloomsbury",
      genreNames: ["Fantasy", "Adventure"],
    },
    {
      title: "1984",
      isbn: "123456790",
      publishedYear: 1949,
      pageCount: 328,
      language: "English",
      description: "Dystopian science fiction novel",
      authorName: { firstName: "George", lastName: "Orwell" },
      publisherName: "Penguin Books",
      genreNames: ["Science Fiction", "Drama"],
    },
    {
      title: "Animal Farm",
      isbn: "123456791",
      publishedYear: 1945,
      pageCount: 112,
      language: "English",
      description: "Political satire novel",
      authorName: { firstName: "George", lastName: "Orwell" },
      publisherName: "Penguin Books",
      genreNames: ["Drama"],
    },
    {
      title: "Murder on the Orient Express",
      isbn: "123456792",
      publishedYear: 1934,
      pageCount: 256,
      language: "English",
      description: "Detective mystery novel",
      authorName: { firstName: "Agatha", lastName: "Christie" },
      publisherName: "HarperCollins",
      genreNames: ["Mystery"],
    },
    {
      title: "The Hobbit",
      isbn: "123456793",
      publishedYear: 1937,
      pageCount: 310,
      language: "English",
      description: "Fantasy adventure novel",
      authorName: { firstName: "J.R.R.", lastName: "Tolkien" },
      publisherName: "HarperCollins",
      genreNames: ["Fantasy", "Adventure"],
    },
    {
      title: "The Lord of the Rings",
      isbn: "123456794",
      publishedYear: 1954,
      pageCount: 1178,
      language: "English",
      description: "Epic high-fantasy novel",
      authorName: { firstName: "J.R.R.", lastName: "Tolkien" },
      publisherName: "HarperCollins",
      genreNames: ["Fantasy", "Adventure"],
    },
    {
      title: "Pride and Prejudice",
      isbn: "123456795",
      publishedYear: 1813,
      pageCount: 432,
      language: "English",
      description: "Classic romance novel",
      authorName: { firstName: "Jane", lastName: "Austen" },
      publisherName: "Vintage",
      genreNames: ["Romance", "Drama"],
    },
    {
      title: "Emma",
      isbn: "123456796",
      publishedYear: 1815,
      pageCount: 474,
      language: "English",
      description: "Novel about youthful misunderstanding",
      authorName: { firstName: "Jane", lastName: "Austen" },
      publisherName: "Vintage",
      genreNames: ["Romance", "Drama"],
    },
    {
      title: "Dune",
      isbn: "123456797",
      publishedYear: 1965,
      pageCount: 412,
      language: "English",
      description: "Science fiction epic novel",
      authorName: { firstName: "Frank", lastName: "Herbert" },
      publisherName: "HarperCollins",
      genreNames: ["Science Fiction", "Adventure"],
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      isbn: "123456798",
      publishedYear: 1997,
      pageCount: 223,
      language: "English",
      description: "First Harry Potter novel",
      authorName: { firstName: "J.K.", lastName: "Rowling" },
      publisherName: "Bloomsbury",
      genreNames: ["Fantasy", "Adventure"],
    },
  ];

  for (const bookData of books) {
    const author = await prisma.author.findFirst({
      where: {
        firstName: bookData.authorName.firstName,
        lastName: bookData.authorName.lastName,
      },
    });

    if (!author) {
      throw new Error(`Author ${bookData.authorName.firstName} ${bookData.authorName.lastName} not found`);
    }

    const publisher = await prisma.publisher.findFirst({
      where: { name: bookData.publisherName },
    });

    if (!publisher) {
      throw new Error(`Publisher ${bookData.publisherName} not found`);
    }

    const genreRecords = await prisma.genre.findMany({
      where: {
        name: { in: bookData.genreNames },
      },
    });

    if (genreRecords.length !== bookData.genreNames.length) {
      throw new Error(`Some genres not found for book ${bookData.title}`);
    }

    await prisma.book.upsert({
      where: { isbn: bookData.isbn },
      update: {
        title: bookData.title,
        publishedYear: bookData.publishedYear,
        pageCount: bookData.pageCount,
        language: bookData.language,
        description: bookData.description,
        authorId: author.id,
        publisherId: publisher.id,
        genres: {
          set: genreRecords.map((g) => ({ id: g.id })),
        },
      },
      create: {
        title: bookData.title,
        isbn: bookData.isbn,
        publishedYear: bookData.publishedYear,
        pageCount: bookData.pageCount,
        language: bookData.language,
        description: bookData.description,
        authorId: author.id,
        publisherId: publisher.id,
        genres: {
          connect: genreRecords.map((g) => ({ id: g.id })),
        },
      },
    });
  }

  const reviewData = [
    {
      isbn: "123456789",
      userName: "Milana",
      rating: 5,
      comment: "Very good",
    },
    {
      isbn: "123456789",
      userName: "Alex",
      rating: 4,
      comment: "Interesting and exciting",
    },
    {
      isbn: "123456790",
      userName: "Anna",
      rating: 5,
      comment: "A classic dystopian novel",
    },
    {
      isbn: "123456791",
      userName: "Mark",
      rating: 4,
      comment: "Short but powerful",
    },
    {
      isbn: "123456792",
      userName: "Kate",
      rating: 5,
      comment: "Amazing mystery",
    },
    {
      isbn: "123456793",
      userName: "John",
      rating: 5,
      comment: "A wonderful adventure",
    },
    {
      isbn: "123456794",
      userName: "Sara",
      rating: 5,
      comment: "Epic story",
    },
    {
      isbn: "123456795",
      userName: "Tom",
      rating: 4,
      comment: "Beautiful writing",
    },
    {
      isbn: "123456796",
      userName: "Eva",
      rating: 4,
      comment: "Very enjoyable",
    },
    {
      isbn: "123456797",
      userName: "Chris",
      rating: 5,
      comment: "Great sci-fi universe",
    },
    {
      isbn: "123456798",
      userName: "Nina",
      rating: 5,
      comment: "Magical beginning",
    },
    {
      isbn: "123456798",
      userName: "Leo",
      rating: 4,
      comment: "Very good first part",
    },
  ];

  for (const review of reviewData) {
    const book = await prisma.book.findUnique({
      where: { isbn: review.isbn },
    });

    if (!book) {
      continue;
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        bookId: book.id,
        userName: review.userName,
        comment: review.comment,
      },
    });

    if (!existingReview) {
      await prisma.review.create({
        data: {
          bookId: book.id,
          userName: review.userName,
          rating: review.rating,
          comment: review.comment,
        },
      });
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });