/**
 * Extension framework for plugins.js viewModel
 */

App.viewModels.extensions.plugins=function(rootScope,App,Logger){
	var self = this;
	self.initPlugins = function(){
		App.viewModels.payee.prototype.x = new App.viewModels.extensions.payee(rootScope.payee,Logger);
	}
};
