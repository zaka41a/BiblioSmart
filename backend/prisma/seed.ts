import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const books = [
  {
    title: "L'odyssée des bibliothèques",
    author: "Camille Durand",
    category: "Essai",
    isbn: "9781234567001",
    synopsis: "Un tour du monde des innovations qui transforment nos espaces de lecture.",
    tags: ["Innovation", "Culture"]
  },
  {
    title: "Neon Archives",
    author: "Sami Lefèvre",
    category: "Science-Fiction",
    isbn: "9781234567002",
    synopsis: "Une enquête dans un futur où les souvenirs se prêtent comme des livres.",
    tags: ["Anticipation", "Thriller"]
  },
  {
    title: "Coding the Stacks",
    author: "Amina Cohen",
    category: "Technologie",
    isbn: "9781234567003",
    synopsis: "Guide moderne pour digitaliser un catalogue de bibliothèque.",
    tags: ["Tech", "Pratique"]
  },
  {
    title: "Les Veilleurs de papier",
    author: "Tristan Morel",
    category: "Roman",
    isbn: "9781234567004",
    synopsis: "Une équipe de bibliothécaires défend un fonds ancien contre l'oubli.",
    tags: ["Aventure", "Patrimoine"]
  },
  {
    title: "Atlas poétique des métropoles",
    author: "Léa Aït Ben",
    category: "Poésie",
    isbn: "9781234567005",
    synopsis: "Recueil de poèmes cartographiant les villes contemporaines.",
    tags: ["Poésie", "Voyage"]
  },
  {
    title: "Horizon jeunesse",
    author: "Malik Ortega",
    category: "Jeunesse",
    isbn: "9781234567006",
    synopsis: "Roman initiatique pour les lecteurs de 10-12 ans.",
    tags: ["Jeunesse", "Aventure"]
  },
  {
    title: "Les archives du futur",
    author: "Inès Aubry",
    category: "Science-Fiction",
    isbn: "9781234567007",
    synopsis: "Des bibliothèques orbitales où l'on emprunte des réalités parallèles.",
    tags: ["Science-Fiction", "Exploration"]
  },
  {
    title: "Manuel de médiation culturelle",
    author: "Noémie Vidal",
    category: "Professionnel",
    isbn: "9781234567008",
    synopsis: "Actions concrètes pour valoriser vos collections auprès de nouveaux publics.",
    tags: ["Médiation", "Stratégie"]
  },
  {
    title: "Reflets de lecture",
    author: "Yanis Lemaire",
    category: "Roman",
    isbn: "9781234567009",
    synopsis: "Une communauté de lecteurs se recompose après la fermeture de leur médiathèque.",
    tags: ["Roman", "Contemporain"]
  },
  {
    title: "Le guide des makers",
    author: "Sofia Bernard",
    category: "DIY",
    isbn: "9781234567010",
    synopsis: "Ateliers et projets à lancer dans un espace fablab de bibliothèque.",
    tags: ["Makers", "Créativité"]
  },
  {
    title: "Politique des communs", 
    author: "Clarisse Pinto",
    category: "Essai",
    isbn: "9781234567011",
    synopsis: "Comment la bibliothèque devient un acteur central de la ville contributive.",
    tags: ["Société", "Commun"]
  },
  {
    title: "Origami quantique",
    author: "Hugo Park",
    category: "BD",
    isbn: "9781234567012",
    synopsis: "Bande dessinée rétrofuturiste autour d'une bibliothèque interdimensionnelle.",
    tags: ["BD", "Science-Fiction"]
  }
];

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe42!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bibliosmart.io" },
    update: {},
    create: {
      email: "admin@bibliosmart.io",
      passwordHash,
      firstName: "Admin",
      lastName: "Biblio",
      role: Role.ADMIN
    }
  });

  await prisma.book.deleteMany();
  await prisma.book.createMany({ data: books.map((book) => ({ ...book, copies: 5, available: 4 })) });

  console.log(`Seed completed. Admin id: ${admin.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
