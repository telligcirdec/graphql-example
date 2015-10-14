require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _schemaJs = __webpack_require__(1);
	
	var _starWarsSchemaJs = __webpack_require__(3);
	
	var express = __webpack_require__(5);
	var app = express();
	var graphqlHTTP = __webpack_require__(6);
	
	var app = express();
	
	app.configure(function () {
	    app.use('/graphql', graphqlHTTP({ schema: _starWarsSchemaJs.StarWarsSchema, graphiql: true }));
	});
	
	var myLogger = function myLogger(req, res, next) {
	    console.log(req.originalUrl);
	    next();
	};
	
	app.use(myLogger);
	
	var server = app.listen(process.env.PORT, process.env.IP, function () {
	    var host = server.address().address;
	    var port = server.address().port;
	
	    console.log('Example app listening at http://%s:%s', host, port);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _graphql = __webpack_require__(2);
	
	var MyGraphQLSchema = new _graphql.GraphQLSchema({
	  query: new _graphql.GraphQLObjectType({
	    name: 'ExampleQuery',
	    description: 'Root query type description',
	    fields: {
	      hello: {
	        type: _graphql.GraphQLString,
	        description: 'Hello to the world',
	        resolve: function resolve() {
	          return 'world';
	        }
	      }
	    }
	  })
	});
	exports.MyGraphQLSchema = MyGraphQLSchema;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("graphql");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _graphql = __webpack_require__(2);
	
	var _starWarsDataJs = __webpack_require__(4);
	
	/**
	 * This is designed to be an end-to-end test, demonstrating
	 * the full GraphQL stack.
	 *
	 * We will create a GraphQL schema that describes the major
	 * characters in the original Star Wars trilogy.
	 *
	 * NOTE: This may contain spoilers for the original Star
	 * Wars trilogy.
	 */
	
	/**
	 * Using our shorthand to describe type systems, the type system for our
	 * Star Wars example is:
	 *
	 * enum Episode { NEWHOPE, EMPIRE, JEDI }
	 *
	 * interface Character {
	 *   id: String!
	 *   name: String
	 *   friends: [Character]
	 *   appearsIn: [Episode]
	 * }
	 *
	 * type Human : Character {
	 *   id: String!
	 *   name: String
	 *   friends: [Character]
	 *   appearsIn: [Episode]
	 *   homePlanet: String
	 * }
	 *
	 * type Droid : Character {
	 *   id: String!
	 *   name: String
	 *   friends: [Character]
	 *   appearsIn: [Episode]
	 *   primaryFunction: String
	 * }
	 *
	 * type Query {
	 *   hero(episode: Episode): Character
	 *   human(id: String!): Human
	 *   droid(id: String!): Droid
	 * }
	 *
	 * We begin by setting up our schema.
	 */
	
	/**
	 * The original trilogy consists of three movies.
	 *
	 * This implements the following type system shorthand:
	 *   enum Episode { NEWHOPE, EMPIRE, JEDI }
	 */
	var episodeEnum = new _graphql.GraphQLEnumType({
	  name: 'Episode',
	  description: 'One of the films in the Star Wars Trilogy',
	  values: {
	    NEWHOPE: {
	      value: 4,
	      description: 'Released in 1977.'
	    },
	    EMPIRE: {
	      value: 5,
	      description: 'Released in 1980.'
	    },
	    JEDI: {
	      value: 6,
	      description: 'Released in 1983.'
	    }
	  }
	});
	
	/**
	 * Characters in the Star Wars trilogy are either humans or droids.
	 *
	 * This implements the following type system shorthand:
	 *   interface Character {
	 *     id: String!
	 *     name: String
	 *     friends: [Character]
	 *     appearsIn: [Episode]
	 *   }
	 */
	var characterInterface = new _graphql.GraphQLInterfaceType({
	  name: 'Character',
	  description: 'A character in the Star Wars Trilogy',
	  fields: function fields() {
	    return {
	      id: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
	        description: 'The id of the character.'
	      },
	      name: {
	        type: _graphql.GraphQLString,
	        description: 'The name of the character.'
	      },
	      friends: {
	        type: new _graphql.GraphQLList(characterInterface),
	        description: 'The friends of the character, or an empty list if they ' + 'have none.'
	      },
	      appearsIn: {
	        type: new _graphql.GraphQLList(episodeEnum),
	        description: 'Which movies they appear in.'
	      }
	    };
	  },
	  resolveType: function resolveType(character) {
	    return (0, _starWarsDataJs.getHuman)(character.id) ? humanType : droidType;
	  }
	});
	
	/**
	 * We define our human type, which implements the character interface.
	 *
	 * This implements the following type system shorthand:
	 *   type Human : Character {
	 *     id: String!
	 *     name: String
	 *     friends: [Character]
	 *     appearsIn: [Episode]
	 *   }
	 */
	var humanType = new _graphql.GraphQLObjectType({
	  name: 'Human',
	  description: 'A humanoid creature in the Star Wars universe.',
	  fields: function fields() {
	    return {
	      id: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
	        description: 'The id of the human.'
	      },
	      name: {
	        type: _graphql.GraphQLString,
	        description: 'The name of the human.'
	      },
	      friends: {
	        type: new _graphql.GraphQLList(characterInterface),
	        description: 'The friends of the human, or an empty list if they ' + 'have none.',
	        resolve: function resolve(human) {
	          return (0, _starWarsDataJs.getFriends)(human);
	        }
	      },
	      appearsIn: {
	        type: new _graphql.GraphQLList(episodeEnum),
	        description: 'Which movies they appear in.'
	      },
	      homePlanet: {
	        type: _graphql.GraphQLString,
	        description: 'The home planet of the human, or null if unknown.'
	      }
	    };
	  },
	  interfaces: [characterInterface]
	});
	
	/**
	 * The other type of character in Star Wars is a droid.
	 *
	 * This implements the following type system shorthand:
	 *   type Droid : Character {
	 *     id: String!
	 *     name: String
	 *     friends: [Character]
	 *     appearsIn: [Episode]
	 *     primaryFunction: String
	 *   }
	 */
	var droidType = new _graphql.GraphQLObjectType({
	  name: 'Droid',
	  description: 'A mechanical creature in the Star Wars universe.',
	  fields: function fields() {
	    return {
	      id: {
	        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString),
	        description: 'The id of the droid.'
	      },
	      name: {
	        type: _graphql.GraphQLString,
	        description: 'The name of the droid.'
	      },
	      friends: {
	        type: new _graphql.GraphQLList(characterInterface),
	        description: 'The friends of the droid, or an empty list if they ' + 'have none.',
	        resolve: function resolve(droid) {
	          return (0, _starWarsDataJs.getFriends)(droid);
	        }
	      },
	      appearsIn: {
	        type: new _graphql.GraphQLList(episodeEnum),
	        description: 'Which movies they appear in.'
	      },
	      primaryFunction: {
	        type: _graphql.GraphQLString,
	        description: 'The primary function of the droid.'
	      }
	    };
	  },
	  interfaces: [characterInterface]
	});
	
	/**
	 * This is the type that will be the root of our query, and the
	 * entry point into our schema. It gives us the ability to fetch
	 * objects by their IDs, as well as to fetch the undisputed hero
	 * of the Star Wars trilogy, R2-D2, directly.
	 *
	 * This implements the following type system shorthand:
	 *   type Query {
	 *     hero(episode: Episode): Character
	 *     human(id: String!): Human
	 *     droid(id: String!): Droid
	 *   }
	 *
	 */
	var queryType = new _graphql.GraphQLObjectType({
	  name: 'Query',
	  fields: function fields() {
	    return {
	      hero: {
	        type: characterInterface,
	        args: {
	          episode: {
	            description: 'If omitted, returns the hero of the whole saga. If ' + 'provided, returns the hero of that particular episode.',
	            type: episodeEnum
	          }
	        },
	        resolve: function resolve(root, _ref) {
	          var episode = _ref.episode;
	          return (0, _starWarsDataJs.getHero)(episode);
	        }
	      },
	      human: {
	        type: humanType,
	        args: {
	          id: {
	            description: 'id of the human',
	            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	          }
	        },
	        resolve: function resolve(root, _ref2) {
	          var id = _ref2.id;
	          return (0, _starWarsDataJs.getHuman)(id);
	        }
	      },
	      droid: {
	        type: droidType,
	        args: {
	          id: {
	            description: 'id of the droid',
	            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
	          }
	        },
	        resolve: function resolve(root, _ref3) {
	          var id = _ref3.id;
	          return (0, _starWarsDataJs.getDroid)(id);
	        }
	      }
	    };
	  }
	});
	
	/**
	 * Finally, we construct our schema (whose starting query type is the query
	 * type we defined above) and export it.
	 */
	var StarWarsSchema = new _graphql.GraphQLSchema({
	  query: queryType
	});
	exports.StarWarsSchema = StarWarsSchema;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 *  Copyright (c) 2015, Facebook, Inc.
	 *  All rights reserved.
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	/**
	 * This defines a basic set of data for our Star Wars Schema.
	 *
	 * This data is hard coded for the sake of the demo, but you could imagine
	 * fetching this data from a backend service rather than from hardcoded
	 * JSON objects in a more complex demo.
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getFriends = getFriends;
	exports.getHero = getHero;
	exports.getHuman = getHuman;
	exports.getDroid = getDroid;
	var luke = {
	  id: '1000',
	  name: 'Luke Skywalker',
	  friends: ['1002', '1003', '2000', '2001'],
	  appearsIn: [4, 5, 6],
	  homePlanet: 'Tatooine'
	};
	
	var vader = {
	  id: '1001',
	  name: 'Darth Vader',
	  friends: ['1004'],
	  appearsIn: [4, 5, 6],
	  homePlanet: 'Tatooine'
	};
	
	var han = {
	  id: '1002',
	  name: 'Han Solo',
	  friends: ['1000', '1003', '2001'],
	  appearsIn: [4, 5, 6]
	};
	
	var leia = {
	  id: '1003',
	  name: 'Leia Organa',
	  friends: ['1000', '1002', '2000', '2001'],
	  appearsIn: [4, 5, 6],
	  homePlanet: 'Alderaan'
	};
	
	var tarkin = {
	  id: '1004',
	  name: 'Wilhuff Tarkin',
	  friends: ['1001'],
	  appearsIn: [4]
	};
	
	var humanData = {
	  1000: luke,
	  1001: vader,
	  1002: han,
	  1003: leia,
	  1004: tarkin
	};
	
	var threepio = {
	  id: '2000',
	  name: 'C-3PO',
	  friends: ['1000', '1002', '1003', '2001'],
	  appearsIn: [4, 5, 6],
	  primaryFunction: 'Protocol'
	};
	
	var artoo = {
	  id: '2001',
	  name: 'R2-D2',
	  friends: ['1000', '1002', '1003'],
	  appearsIn: [4, 5, 6],
	  primaryFunction: 'Astromech'
	};
	
	var droidData = {
	  2000: threepio,
	  2001: artoo
	};
	
	/**
	 * Helper function to get a character by ID.
	 */
	function getCharacter(id) {
	  // Returning a promise just to illustrate GraphQL.js's support.
	  return Promise.resolve(humanData[id] || droidData[id]);
	}
	
	/**
	 * Allows us to query for a character's friends.
	 */
	
	function getFriends(character) {
	  return character.friends.map(function (id) {
	    return getCharacter(id);
	  });
	}
	
	/**
	 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
	 */
	
	function getHero(episode) {
	  if (episode === 5) {
	    // Luke is the hero of Episode V.
	    return luke;
	  }
	  // Artoo is the hero otherwise.
	  return artoo;
	}
	
	/**
	 * Allows us to query for the human with the given id.
	 */
	
	function getHuman(id) {
	  return humanData[id];
	}
	
	/**
	 * Allows us to query for the droid with the given id.
	 */
	
	function getDroid(id) {
	  return droidData[id];
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("express-graphql");

/***/ }
/******/ ]);
//# sourceMappingURL=backend.js.map