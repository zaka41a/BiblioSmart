import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const books = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    isbn: "9780132350884",
    coverUrl: "https://m.media-amazon.com/images/I/51E2055ZGUL._SY445_SX342_.jpg",
    description: "A comprehensive guide to writing clean, maintainable code that stands the test of time.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    price: 0,
    year: 2008,
    available: true
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "Technology",
    isbn: "9780135957059",
    coverUrl: "https://m.media-amazon.com/images/I/71VStE2hElL._SY466_.jpg",
    description: "Your journey to mastery through practical and pragmatic programming techniques.",
    pdfUrl: "https://github.com/media-lib/prog_lib/raw/master/general/The%20Pragmatic%20Programmer.pdf",
    price: 29.99,
    year: 2019,
    available: true
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    category: "Programming",
    isbn: "9780596517748",
    coverUrl: "https://m.media-amazon.com/images/I/81kqrwS1nNL._SY466_.jpg",
    description: "A deep dive into the beautiful and elegant parts of JavaScript.",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    price: 0,
    year: 2008,
    available: true
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    category: "Computer Science",
    isbn: "9780262033848",
    coverUrl: "https://m.media-amazon.com/images/I/61Pgdn8Ys-L._SY466_.jpg",
    description: "The comprehensive guide to algorithms, covering a broad range of algorithms in depth.",
    pdfUrl: "",
    price: 39.99,
    year: 2009,
    available: true
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    category: "Software Engineering",
    isbn: "9780201633612",
    coverUrl: "https://m.media-amazon.com/images/I/81gtKoapHFL._SY466_.jpg",
    description: "Elements of reusable object-oriented software design patterns.",
    pdfUrl: "",
    price: 24.99,
    year: 1994,
    available: true
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    category: "Programming",
    isbn: "9781491904244",
    coverUrl: "https://m.media-amazon.com/images/I/71VCVrcoLzL._SY466_.jpg",
    description: "Deep dive into the core mechanisms of JavaScript language.",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    price: 0,
    year: 2015,
    available: true
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Programming",
    isbn: "9781593279509",
    coverUrl: "https://m.media-amazon.com/images/I/51InjRPaF7L._SY445_SX342_.jpg",
    description: "A modern introduction to programming with JavaScript.",
    pdfUrl: "https://eloquentjavascript.net/Eloquent_JavaScript.pdf",
    price: 0,
    year: 2018,
    available: true
  },
  {
    title: "Learning React",
    author: "Alex Banks & Eve Porcello",
    category: "Web Development",
    isbn: "9781492051718",
    coverUrl: "https://m.media-amazon.com/images/I/51Ga5GuElyL._SY445_SX342_.jpg",
    description: "Modern patterns for developing React applications.",
    pdfUrl: "",
    price: 39.99,
    year: 2020,
    available: true
  }
];

async function main() {
  console.log("🌱 Starting database seeding...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@bibliosmart.com" },
    update: {},
    create: {
      email: "admin@bibliosmart.com",
      password: adminPassword,
      name: "Admin BiblioSmart",
      role: Role.ADMIN
    }
  });
  console.log(`✅ Admin user: ${admin.email} (password: admin123)`);

  // Create regular user
  const userPassword = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@bibliosmart.com" },
    update: {},
    create: {
      email: "user@bibliosmart.com",
      password: userPassword,
      name: "John Doe",
      role: Role.USER
    }
  });
  console.log(`✅ Regular user: ${user.email} (password: user123)`);

  // Create books
  await prisma.book.deleteMany();
  await prisma.book.createMany({ data: books });
  console.log(`✅ Created ${books.length} books`);

  // Create sample purchase
  const cleanCodeBook = await prisma.book.findFirst({ where: { title: "Clean Code" } });
  if (cleanCodeBook) {
    await prisma.purchase.create({
      data: {
        userId: user.id,
        bookId: cleanCodeBook.id,
        price: cleanCodeBook.price
      }
    });
    console.log(`✅ Created sample purchase for user`);
  }

  console.log("✨ Database seeding completed successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
