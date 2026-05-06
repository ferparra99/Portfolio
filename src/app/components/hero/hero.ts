import { Component, AfterViewInit, ElementRef, ViewChild, HostListener, signal } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})

export class Hero implements AfterViewInit {
  @ViewChild('sun') sunRef!: ElementRef;

  readonly isDarkMode = signal(false);
  private baseX: number = 0;
  private maxScrollMovement: number = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.captureBasePosition();
      this.calculateMaxMovement();
      this.initAnimations();
    }, 0);
  }

  /**
   * Captura la posición base del sol (sin ningún transform aplicado).
   * Solo se llama UNA vez al inicio.
   */
  private captureBasePosition(): void {
    gsap.set(this.sunRef.nativeElement, { x: 0 });

    const rect = (this.sunRef.nativeElement as HTMLElement).getBoundingClientRect();
    this.baseX = rect.left + rect.width / 2;
  }

  /**
   * Calcula cuánto puede moverse el sol hacia la derecha desde su posición base.
   * Usa baseX en lugar de leer el DOM, evitando que DevTools contamine la lectura.
   */
  private calculateMaxMovement(): void {
    const margin = 100;
    this.maxScrollMovement = window.innerWidth - margin - this.baseX;
  }

  /**
   * Detecta el scroll de la página y mueve el sol horizontalmente.
   * - scrollY: posición actual del scroll vertical
   * - documentHeight: altura total del documento menos la altura de la ventana
   * - scrollProgress: porcentaje de scroll (0 a 1)
   * - movement: posición x del sol basada en el progreso del scroll
   * - Math.min(..., 1): asegura que el progreso no exceda 1 (clamp entre 0 y 1)
   * - Math.min(..., maxScrollMovement): asegura que no pase del límite derecho
   */
  @HostListener('window:scroll')
  onScroll(): void {
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (documentHeight <= 0) return;

    const scrollProgress = Math.min(scrollY / documentHeight, 1);
    const movement = Math.min(scrollProgress * this.maxScrollMovement, this.maxScrollMovement);

    gsap.set(this.sunRef.nativeElement, { x: movement });
  }

  /**
   * Cuando se redimensiona la ventana:
   * 1. NO recaptura baseX — solo recalcula el máximo con el nuevo innerWidth
   * 2. Reaplica la posición correcta según el scroll actual
   */
  @HostListener('window:resize')
  onResize(): void {
    this.calculateMaxMovement();
    this.onScroll();
  }

  toggleTheme(): void {
    this.isDarkMode.update(v => !v);
    document.body.classList.toggle('dark-theme', this.isDarkMode());
  }

  private initAnimations(): void {
    const sun = this.sunRef.nativeElement;

    gsap.fromTo(sun,
      { y: -10, opacity: 0, rotation: -4 },
      { y: 0, opacity: 1, rotation: 0, duration: 1.5, ease: 'power3.out' }
    );

    gsap.to(sun, {
      y: 15,
      rotation: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }
}
