import {Component, inject} from '@angular/core';
import {BlogService} from '../../services/blog-service';
import {AsyncPipe} from '@angular/common';
import {BlogComponent} from '../../shared/blog-componet/blog.component';

@Component({
  selector: 'app-blog-panel',
  imports: [
    AsyncPipe,
    BlogComponent
  ],
  templateUrl: './blog-panel.html',
  styleUrl: './blog-panel.scss'
})
export class BlogPanel {
  private blogService = inject(BlogService);

  blog$ = this.blogService.getBlogContent();
}
