var daoServices = angular.module('DAOServices', []);
daoServices.service("prodService", function(){
  this.getAllDocs = function(){
    prodDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
      return doc.rows;
  });
  }
});
