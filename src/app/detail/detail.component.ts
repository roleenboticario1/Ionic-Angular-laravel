import { Component, OnInit, Input } from '@angular/core';
import { ModalController }  from '@ionic/angular';
import { Product } from '../products/product.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() product: Product;

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {}

  closeModal(){
     this.modalCtrl.dismiss();
  }

}
