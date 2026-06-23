import { bookService } from "./services/bookService.js";
import { categoryService } from "./services/categoryService.js";
import { readingProgressService } from "./services/readingProgressService.js";

import { bookView } from "./ui/booksView.js";
import { categoryView } from "./ui/categoryView.js";
import { modalView } from "./ui/modalView.js";

import { store } from "./store/store.js";

const DEFAULT_EMAIL = "user1@gmail.com";

async function fetchBooksMetadata() {
    if (!store.bookCategories) store.bookCategories = {};
    if (!store.progress) store.progress = {};

    for (const book of store.books) {
        try {
            const progressList = await readingProgressService.getProgress(book.id);
            store.progress[book.id] = progressList?.[0] ?? null;
        } catch {
            store.progress[book.id] = null;
        }

        try {
            const categories = await categoryService.getCategoriesByBook(book.id, DEFAULT_EMAIL);
            store.bookCategories[book.id] = categories ?? [];
        } catch {
            store.bookCategories[book.id] = [];
        }
    }
}

async function removeBook(id) {
    try {
        await bookService.deleteBook(id);
        await init();
    } catch (error) {
        alert(error.message);
    }
}

async function removeCategory(id) {
    try {
        await categoryService.delete(id, DEFAULT_EMAIL);
        await init();
    } catch (error) {
        alert(error.message);
    }
}

async function createBook(bookData, categoryId) {
    try {
        const newBook = await bookService.create({ ...bookData, userEmail: DEFAULT_EMAIL });
        
        if (categoryId && newBook && newBook.id) {
            await categoryService.link(newBook.id, categoryId, DEFAULT_EMAIL);
        }

        modalView.close();
        await init();
    } catch (error) {
        alert(error.message);
    }
}

async function createCategory(data) {
    try {
        await categoryService.create({ ...data, userEmail: DEFAULT_EMAIL });
        await init();
    } catch (error) {
        alert(error.message);
    }
}

async function init() {
    try {
        store.categories = await categoryService.getCategories(DEFAULT_EMAIL);
        store.books = await bookService.getBooks(DEFAULT_EMAIL);

        await fetchBooksMetadata();

        bookView.render(store.books, store.progress, store.bookCategories, removeBook);
        categoryView.render(store.categories, removeCategory);

        categoryView.bindAdd(createCategory);
        modalView.bindEvents(createBook);

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com a API.");
    }
}

init();