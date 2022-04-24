import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { GroceryServiceService } from '../grocery-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  title = "Grocery List"


  constructor(public toastController: ToastController, public alertController: AlertController, public dataService: GroceryServiceService, public inputDialogService: InputDialogServiceService, private socialSharing: SocialSharing) {}
  
  loadItems(){
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    console.log("Remove item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Remove this item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.dataService.removeItem(index);
    
  }

  async shareItem(item, index) {
    console.log("Sharing item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Sharing item - ' + index + " ...",
      duration: 3000
    });
    toast.present();

    let message = "Grocery Item - Name: "+ item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      // Sharing via email is possible
      console.log("Shared successfully");
    }).catch(() => {
      // Sharing via email is not possible
      console.error("Error sharing");
    });

  }

  async editItem(item, index) {
    console.log("Editing Item - ", item, index);
    const toast = await this.toastController.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  addItem() {
    this.inputDialogService.showPrompt();
  }


  
}
