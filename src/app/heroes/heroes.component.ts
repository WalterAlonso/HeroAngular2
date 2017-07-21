import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit{  
   title = 'Tour of Heroes';
   heroes: Hero[];
   selectedHero: Hero;

   constructor(private heroService: HeroService, private router: Router) {   
   }
  ngOnInit(): void {
      this.getHeroes();
   }

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  getHeroes(): void {
    //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

/*
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }*/

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.heroService.create(name)
    .then(hero => {
      this.heroes.push(hero);
      this.selectedHero = null;
    });
}

delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}

}
