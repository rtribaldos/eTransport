import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: FirebaseListObservable<any>;
  viajes: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    
    this.viajes = this.database.list('/viajes');
  }

  createViaje(){
    let newTaskModal = this.alertCtrl.create({
      title: 'Nuevo transporte',
      message: "Introduzca destino",
      inputs: [
        {
          name: 'destino',
          placeholder: 'Introduzca destino'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.viajes.push({
              title: data.destino,
              done: false
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  updateViaje( viaje){
    this.viajes.update( viaje.$key,{
      title: viaje.title,
      done: !viaje.done
    });
  }

  removeViaje( viaje ){
    this.viajes.remove( viaje.$key );
  }
}