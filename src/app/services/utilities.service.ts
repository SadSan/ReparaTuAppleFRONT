import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const emailRepara: string = "@reparatuapple.com.co";

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  goToast(error: boolean, message: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: error ? 'error' : 'success',
      title: message
    })
  }
  
  validateEmailRepara(email: string): boolean {
    let newEmail = email.slice(-21); 
    if (newEmail == emailRepara) {
      return true;
    }
    return false;
  }
}
