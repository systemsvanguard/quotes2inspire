// generate random motivational quotes.  
var app = angular.module("QuoteMachine", []);
app.controller("quoteController", quoteController);
app.factory("quoteFactory", quoteFactory);
quoteFactory.$inject = ["$http"];
function quoteFactory($http) {
  return {
    getQuotes: getQuotes
  };
  function getQuotes() {
    return $http
      .get(
        "quotes2inspire.json"
      )
      .then(getQuotesComplete)
      .catch(getQuotesFailed);
  }
  function getQuotesComplete(quotesBase) {
    return quotesBase.data;
    console.log("Loading quotes success");
  }
  function getQuotesFailed(error) {
    console.log("Loading quotes failed" + error.data);
  }
}
quoteController.$inject = ["quoteFactory"];
function quoteController(quoteFactory) {
  var vm = this;
  vm.refresh = function() {
    getQuotes();
  };
  getQuotes();
  function getQuotes() {
    return quoteFactory.getQuotes().then(function(data) {
      vm.quote = data[Math.floor(Math.random() * data.length)];
      return vm.quote;
    });
  }
}

