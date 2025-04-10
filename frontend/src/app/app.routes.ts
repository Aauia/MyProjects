import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecommendComponent } from './recommend/recommend.component';

export const routes: Routes = [
  { path: '', component: RecommendComponent },
  { path: 'recommend', component: RecommendComponent },
];
