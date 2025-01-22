import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver(() => {
    const licenseElement = document.querySelector('dx-license');
    if (licenseElement) {
      licenseElement.remove();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
