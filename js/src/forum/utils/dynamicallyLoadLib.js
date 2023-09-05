const libs = {
  fullcalendarCore: {
    js: 'https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/index.global.min.js',
    loaded: () => typeof FullCalendar !== 'undefined',
  },
  fullcalendarLocales: {
    js: 'https://cdn.jsdelivr.net/npm/@fullcalendar/core@6.1.8/locales-all.global.min.js',
    loaded: () => typeof FullCalendar !== 'undefined' && FullCalendar.globalLocales.length > 2,
  },
  fullcalendarDayGrid: {
    js: 'https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@6.1.8/index.global.min.js',
    loaded: () => typeof FullCalendar !== 'undefined' && FullCalendar.globalPlugins.find((p) => p.name === '@fullcalendar/daygrid'),
  },
  fullcalendarInteraction: {
    js: 'https://cdn.jsdelivr.net/npm/@fullcalendar/interaction@6.1.8/index.global.min.js',
    loaded: () => typeof FullCalendar !== 'undefined' && FullCalendar.globalPlugins.find((p) => p.name === '@fullcalendar/interaction'),
  },
  fullcalendarList: {
    js: 'https://cdn.jsdelivr.net/npm/@fullcalendar/list@6.1.8/index.global.min.js',
    loaded: () => typeof FullCalendar !== 'undefined' && FullCalendar.globalPlugins.find((p) => p.name === '@fullcalendar/list'),
  },

  flatpickr: {
    css: 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css',
    js: 'https://cdn.jsdelivr.net/npm/flatpickr',
    loaded: () => typeof window.flatpickr !== 'undefined',
  },
  flatpickrLocale: {
    js: (locale) => `https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/${locale}.js`,
    loaded: (locale) => typeof window.flatpickr.l10ns[locale] !== 'undefined',
  },
};

export default function dynamicallyLoadLib(lib, ...moreArgs) {
  if (Array.isArray(lib)) {
    return Promise.all(lib.map((l) => dynamicallyLoadLib(l)));
  }

  let libConf = {};

  // If the lib is an object
  if (typeof lib === 'object') {
    libConf = { ...lib };

    if (!libConf.loaded) {
      console.warn('dynamicallyLoadLib: No loaded function defined for lib', lib);
      return Promise.resolve();
    }
  }

  if (typeof lib === 'string') {
    // If lib is not in the libs object log a warning and return a resolved promise
    if (!libs[lib]) {
      console.warn('dynamicallyLoadLib: lib not found', lib);
      return Promise.resolve();
    }

    libConf = { ...libs[lib] };
  }

  if (Object.keys(libConf).length === 0) {
    console.warn('dynamicallyLoadLib: lib is not a string nor an valid object', lib);
    return Promise.resolve();
  }

  let loadPromises = [];

  if (libConf.loaded(...moreArgs)) {
    loadPromises.push(Promise.resolve());
  } else {
    if (libConf.css) {
      const css = Array.isArray(libConf.css) ? libConf.css : [libConf.css];
      css.forEach((href) => {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = href;
        document.head.appendChild(css);
      });
    }

    if (libConf.js) {
      if (typeof libConf.js === 'function') {
        libConf.js = libConf.js(...moreArgs);
      }

      const js = Array.isArray(libConf.js) ? libConf.js : [libConf.js];
      js.forEach((src) => {
        const script = document.createElement('script');
        script.src = src;
        document.head.appendChild(script);
      });
    }

    loadPromises.push(
      new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          if (libConf.loaded(...moreArgs)) {
            clearInterval(interval);
            resolve();
          }
        }, 5);
      })
    );
  }

  return Promise.all(loadPromises);
}
