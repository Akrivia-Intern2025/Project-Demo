import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-individual-dashboard',
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.css']
})
export class IndividualDashboardComponent implements OnInit {
  userName: string = '';
  articles: any[] = [];
  paginatedArticles: any[] = [];
  currentPage: number = 1;
  articlesPerPage: number = 5;
  totalPages: number = 0;
  showFullContent: boolean[] = []; // Track which article content should be shown
  showAddForm: boolean = false; // Control the visibility of the Add Blog form
  newBlog: { title: string; content: string; fileUrl?: string } = { title: '', content: '' }; // New blog data
  uploadedFile: File | null = null; // Store the uploaded file

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('email') || '{}');
    console.log(localStorage);

    // Check if the user is logged in
    if (user && user.email) {
      this.userName = user.email; // Set the user name from the login data
    } else {
      this.userName = 'Guest'; // If no user is found, set default as 'Guest'
    }

    // Simulate fetching blog articles
    this.articles = this.generateBlogArticles(50);
    console.log(this.articles); // Generate 50 random blog articles
    this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
    this.updatePaginatedArticles();
  }

  // Function to generate blog articles with random titles, content, and publish date
  generateBlogArticles(count: number): any[] {
    const titles = [
      "Understanding Angular Directives",
      "Introduction to TypeScript",
      "Best Practices for Angular Services",
      "Exploring Observables in Angular",
      "Angular Routing 101",
      "How to Build Responsive Angular Apps",
      "Building Secure Angular Applications",
      "Advanced Angular Patterns",
      "Angular State Management with NgRx",
      "Angular Forms: Template-driven vs Reactive"
    ];

    const contents = [
      "This article explores how to work with Angular directives and how they can help in creating dynamic views.",
      "In this article, we introduce TypeScript and its benefits when working with Angular.",
      "Learn how to properly use Angular services and how they can simplify dependency management.",
      "Understanding Observables in Angular and how they can help in handling asynchronous operations.",
      "Learn about the Angular Router and how to manage navigation within Angular applications.",
      "Learn how to make your Angular applications responsive and mobile-friendly.",
      "Learn security practices for building secure and maintainable Angular applications.",
      "Explore advanced patterns in Angular for scalable and maintainable applications.",
      "A deep dive into NgRx and how it helps manage application state in Angular.",
      "Comparing Angular's template-driven forms and reactive forms, and which one you should use."
    ];

    const publishDates = [
      new Date('2024-01-15'),
      new Date('2024-02-01'),
      new Date('2024-03-20'),
      new Date('2024-04-10'),
      new Date('2024-05-05'),
      new Date('2024-06-30'),
      new Date('2024-07-12'),
      new Date('2024-08-25'),
      new Date('2024-09-10'),
      new Date('2024-10-18')
    ];

    let randomArticles = [];
    for (let i = 0; i < count; i++) {
      const randomTitle = titles[Math.floor(Math.random() * titles.length)];
      const randomContent = contents[Math.floor(Math.random() * contents.length)];
      const randomDate = publishDates[Math.floor(Math.random() * publishDates.length)];

      randomArticles.push({ title: randomTitle, content: randomContent, publishDate: randomDate });
    }
    console.log(randomArticles);
    return randomArticles;
  }

  updatePaginatedArticles() {
    const start = (this.currentPage - 1) * this.articlesPerPage;
    const end = start + this.articlesPerPage;
    this.paginatedArticles = this.articles.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedArticles();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedArticles();
    }
  }

  toggleContent(index: number) {
    this.showFullContent[index] = !this.showFullContent[index];
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  // Add Blog Feature Methods
  openAddBlogForm() {
    this.showAddForm = true;
    this.newBlog = { title: '', content: '' }; // Reset the form
    this.uploadedFile = null; // Reset file input
  }

  cancelAddBlog() {
    this.showAddForm = false;
  }

  onFileSelect(event: any) {
    this.uploadedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.newBlog.title && this.newBlog.content) {
      const newArticle = { ...this.newBlog };

      if (this.uploadedFile) {
        // Simulate file upload by generating a URL for the uploaded file
        newArticle.fileUrl = URL.createObjectURL(this.uploadedFile);
      }

      this.articles.unshift(newArticle); // Add the new article to the top of the list
      this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
      this.updatePaginatedArticles();

      this.showAddForm = false; // Close the form
    }
  }
}
