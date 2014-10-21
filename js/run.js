(function () {

  curl.config({
    baseUrl: '../',
    packages: {
      curl: { location: 'lib/curl/src/curl/' },
      //app: { location: 'app', main: 'main' },   
    },
    paths: {
      d3: 'bower_components/d3/d3.min.js',
      d3_tip: 'bower_components/d3-tip/index.js',
      data: 'js/data.js',
      main: 'js/main.js',
    }
  });

  curl(['main']).then(start, fail);

  function start(main) {
    // do something startup-ish
  }

  function fail(ex) {
    // show a meaningful error to the user.
  }

}());
