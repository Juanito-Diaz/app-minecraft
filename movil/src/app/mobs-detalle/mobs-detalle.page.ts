import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-mobs-detalle',
  templateUrl: './mobs-detalle.page.html',
  styleUrls: ['./mobs-detalle.page.scss'],
  standalone: false,
})
export class MobsDetallePage implements OnInit {

  mob: any = null;
  baseUrl: string = "http://localhost:8080/mobs";

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.cargarMob();
  }

  async cargarMob() {
    const id = this.route.snapshot.paramMap.get('id');
    const loading = await this.loadingCtrl.create({
      message: 'Analizando criatura...',
      spinner: 'bubbles'
    });
    await loading.present();

    try {
      const url = `${this.baseUrl}/${id}?expand=bioma&t=${new Date().getTime()}`;
      const response = await axios.get(url);
      this.mob = response.data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      loading.dismiss();
    }
  }
}