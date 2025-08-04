import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material imports can be added here for shared use

@NgModule({
  declarations: [
    // Add shared components here
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Re-export commonly used modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    // Add shared components here when created
  ]
})
export class SharedModule { }