import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import 'rxjs/add/operator/switchMap';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //@Input() 
  hero: Hero;  

  constructor(
  private heroService: HeroService,
  private route: ActivatedRoute,
  private location: Location
) {}

  ngOnInit(): void {
  this.route.paramMap
    .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id'))) //El + es porque el recibe todo en string, con + lo pasa a numero
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }

}