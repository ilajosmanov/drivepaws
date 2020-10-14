/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEffect } from 'effector-logger';

const global = window as any;

let initialized = !!global.google;

const API_KEY = process.env.VUE_APP_GOOGLE_KEY_API;

const CALLBACK_NAME = 'gmapsCallback';

let resolveInitPromise: any;

let rejectInitPromise: any;

const initPromise = new Promise((resolve, reject) => {
  resolveInitPromise = resolve;
  rejectInitPromise = reject;
});

// eslint-disable-next-line import/no-mutable-exports
let geocoder: any;

function initGeocoder() {
  geocoder = new global.google.maps.Geocoder();
}

function init() {
  if (initialized) {
    return initPromise;
  }

  initialized = true;
  global[CALLBACK_NAME] = () => resolveInitPromise(global.google);

  const script = document.createElement('script');

  script.async = true;
  script.defer = true;
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
  script.onerror = rejectInitPromise;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.querySelector('head')!.appendChild(script);

  return initPromise;
}

const fxGeocode = createEffect<{lat: number; lng: number}, any>({
  handler: async ({ lat, lng }) => new Promise((resolve, reject) => {
    geocoder.geocode({
      location: { lat, lng },
    }, (results: any[], status: string) => {
      if (status !== 'OK' || !results[0]) {
        reject();
      }
      resolve(results);
    });
  }),
});

export {
  init,
  initGeocoder,
  geocoder,
  fxGeocode,
};
