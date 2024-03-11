import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [FormsModule, RouterModule, CommonModule],
  exports: [FormsModule, RouterModule, CommonModule],
})
export class SharedModule {}
