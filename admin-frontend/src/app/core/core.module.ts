import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services will be provided in root, so no need to provide them here
// Guards and Interceptors are already provided in root

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Core services are provided in root via @Injectable({ providedIn: 'root' })
  ]
})
export class CoreModule {
  // Ensure CoreModule is only imported once
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}