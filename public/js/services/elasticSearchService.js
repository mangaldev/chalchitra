angular.module('mean.system').service('es', function (esFactory) {
  return esFactory({
    host: 'localhost:9200',
    log: 'trace'
  });
});