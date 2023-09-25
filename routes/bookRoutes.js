import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.genres
    ) {
      response.status(400).send({
        error: " Send All Required Fields: title, author, publichYear, genres",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
      genres: request.body.genres,
    };

    const book = await Book.create(newBook);

    response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);
    if (book) {
      response.status(200).send(book);
    } else {
      response.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const book = await Book.findById(request.params.id);

    if (book) {
      book.title = request.body.title || book.title;
      book.author = request.body.author || book.author;
      book.publishYear = request.body.publishYear || book.publishYear;
      book.genres = request.body.genres || book.genres;

      console.log(request.body);
      const updatedBook = await book.save();
      response.status(200).send(updatedBook);
    } else {
      response.status(404).send({ error: "Book not found" });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ error: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      response.status(404).send({ error: "Book not found" });
    }

    response.status(200).send({ message: "Book deleted successfully" });
  } catch {
    (error) => {
      console.log(error.message);
      response.status(500).send({ error: error.message });
    };
  }
});

export default router;
