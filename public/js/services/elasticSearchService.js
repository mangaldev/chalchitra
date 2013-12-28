angular.module('mean.system').service('es', function (esFactory) {
  return esFactory({
    host: '54.201.156.156:9200',
    // log: 'trace'
  });
});