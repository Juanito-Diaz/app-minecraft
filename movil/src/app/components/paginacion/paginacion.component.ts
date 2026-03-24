import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.scss'],
  standalone: false
})
export class PaginacionComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  paginas: number = 0;
  activeIndex: number = 0;
  paginacionItems: number[] = [];

  @Input() total: number = 0;
  @Input() porPagina: number = 20;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.inicializarSwiper();
  }

  ngOnChanges() {
    // Calculamos cuántas páginas habrá
    this.paginas = Math.ceil(this.total / this.porPagina);
    this.paginacionItems = [];
    for (let i = 1; i <= this.paginas; i++) {
      this.paginacionItems.push(i);
    }
    
    // Forzamos el reinicio de Swiper tras un micro-segundo
    setTimeout(() => {
      this.inicializarSwiper();
    }, 200);
  }

  inicializarSwiper() {
    const mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 10,
      observer: true,
      observeParents: true
    });
  }

  onClickSlide(index: number) {
    this.activeIndex = index;
  }
}