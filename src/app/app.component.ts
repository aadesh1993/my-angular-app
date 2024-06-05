import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/BookService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: string[] = [];
  bookTitle: string = '';
  searchTerm: string = '';

  constructor(private bookService: BookService) {} // Inject the BookService

  addBook(): void {
    const bookTitle = this.bookTitle.trim();
    console.log('Book added:', bookTitle); 
    if (bookTitle) {
      this.bookService.addBook(bookTitle).subscribe((response: any) => {
        console.log('Book added:', response); // Log the response
       // this.getBooks(); // Refresh the book list
        this.bookTitle = '';
      }, error => {
        console.error('Error adding book:', error); // Log any error
      });
    } else {
      alert('Please enter a book title');
    }
  }
  

  getBooks(): void {
    this.bookService.getBooks().subscribe((data: any) => {
      this.books = data.map((book: { name: any; }) => book.name);
     // this.displayBooks(this.searchTerm);
    });
  }

  retrieveBooks(): void {
    const searchTerm = this.searchTerm.trim().toLowerCase();
    this.displayBooks(searchTerm);
  }

  displayBooks(searchTerm: string = ''): void {
    const bookList = document.getElementById('book-list') as HTMLDivElement;
    bookList.innerHTML = '';
    const filteredBooks = this.books.filter(book => book.toLowerCase().includes(searchTerm));
    if (filteredBooks.length > 0) {
      const ul = document.createElement('ul');
      filteredBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book;
        ul.appendChild(li);
      });
      bookList.appendChild(ul);
    } else {
      bookList.textContent = 'No books found';
    }
  }
}
