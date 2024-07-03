import { Component, OnInit } from '@angular/core';
import { PreloaderService } from '../../services/preloader.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent implements OnInit{

  isLoading = this.preloaderService.isLoading;

  constructor(private preloaderService: PreloaderService) {}

  ngOnInit(): void {}
}
