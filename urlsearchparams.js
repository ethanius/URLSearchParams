/*
	simple polyfill without ES6 iterators but also without any dependecies
*/
(function () {
	'use strict';

	if ("URLSearchParams" in window) { return; }

	function URLSearchParams(params) {
		this._keys = {};

		if (params) {
			var pairs = params.toString().split("&");
			for (var x = 0; x < pairs.length; x++) {
				var tmp = pairs[x].split("=");
				this.append(decodeURIComponent(tmp[0]), decodeURIComponent(tmp.slice(1).join("=")));
			}
		}
	};

	URLSearchParams.prototype = {
		append: function(key, value) {
			if (this.has(key)) {
				this._keys[key].push(value);
			} else {
				this._keys[key] = [value];
			}
		},

		delete: function(key) {
			if (this.has(key)) {
				delete this._keys[key];
			}
		},

		get: function(key) {
			if (this.has(key) && this._keys[key].length) {
				return this._keys[key][0];
			}
			return null;
		},

		getAll: function(key) {
			if (this.has(key)) {
				return this._keys[key];
			}
			return [];
		},

		has: function(key) {
			return key in this._keys;
		},

		set: function(key, value) {
			this._keys[key] = [value];
		},

		toString: function() {
			var tmp = [];
			for (var key in this._keys) {
				for (var i = 0; i < this._keys[key].length; i++) {
					tmp.push(encodeURIComponent(key) + "=" + encodeURIComponent(this._keys[key][i]));
				}
			}
			return tmp.join("&");
		}
	};

	window.URLSearchParams = URLSearchParams;
})();
