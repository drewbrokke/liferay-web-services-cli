var _ = require('lodash');

var generatorUtil = require('./utils/generatorUtil');
var methodUtil = require('./utils/methodUtil');
var outputUtil = require('./utils/outputUtil');

var methods = methodUtil.getMethods();
var methodRouters = methodUtil.getMethodRouters();

var REQUEST_LIMIT = 10;
var COMPANY_ID = require('./utils/configUtil').getCurrentCompanyId();

var Promise = require('bluebird');

module.exports = {
	// Returns no data
	addGroupUsers: function(groupId, userIds) {
		if (!groupId) {
			console.error('No group ID provided');
		}

		if (!userIds) {
			console.error('No user IDs provided');
		}

		return methods.addGroupUsers(groupId, userIds);
	},

	// Returns an array of groups
	addGroup: function(numberOfGroups) {
		var bar = outputUtil.getProgressBar(numberOfGroups);
		var groupNames = [];
		var i;

		outputUtil.statusMessage(numberOfGroups, 'group');

		for (i = 0; i < numberOfGroups; i++) {
			groupNames.push(generatorUtil.generateGroupName());
		}

		function doAddGroup(groupName) {
			bar.tick();

			return methods.addGroup(groupName);
		}

		return Promise.map(groupNames, doAddGroup, { concurrency: REQUEST_LIMIT });
	},

	// Returns an array of layouts
	addLayout: function(numberOfLayouts, groupId, parentLayoutId) {
		var bar = outputUtil.getProgressBar(numberOfLayouts);
		var layoutNameBase = generatorUtil.generateLayoutName();
		var layoutNames = [];
		var i;

		outputUtil.statusMessage(numberOfLayouts, 'layout');

		for (i = 0; i < numberOfLayouts; i++) {
			layoutNames.push(layoutNameBase + ' ' + i);
		}

		function doAddLayout(layoutName) {
			bar.tick();

			return methods.addLayout(groupId, layoutName, parentLayoutId);
		}

		return Promise.map(layoutNames, doAddLayout, { concurrency: 1 });
	},

	// Returns an array of organizations
	addOrganization: function(numberOfOrganizations, parentOrganizationId) {
		var bar = outputUtil.getProgressBar(numberOfOrganizations);
		var organizationNames = [];
		var i;

		outputUtil.statusMessage(numberOfOrganizations, 'organization');

		for (i = 0; i < numberOfOrganizations; i++) {
			organizationNames.push(generatorUtil.generateOrganizationName());
		}

		function doAddOrganization(organizationName) {
			bar.tick();

			return methods.addOrganization(organizationName);
		}

		return Promise.map(organizationNames, doAddOrganization, { concurrency: REQUEST_LIMIT });
	},

	// Returns and array of roles
	addRole: function(numberOfRoles, type) {
		var bar = outputUtil.getProgressBar(numberOfRoles);
		var roleNames = [];
		var i;

		for (i = 0; i < numberOfRoles; i++) {
			roleNames.push(generatorUtil.generateRoleName(type));
		}

		function doAddRole(roleName) {
			bar.tick();

			return methods.addRole(roleName, type);
		}

		return Promise.map(roleNames, doAddRole, { concurrency: REQUEST_LIMIT });
	},

	// Returns an array of user groups
	addUserGroup: function(numberOfUserGroups) {
		var bar = outputUtil.getProgressBar(numberOfUserGroups);
		var userGroupNames = [];
		var i;

		for (i = 0; i < numberOfUserGroups; i++) {
			userGroupNames.push(generatorUtil.generateUserGroupName());
		}

		function doAddUserGroup(userGroupNames) {
			bar.tick();

			return methods.addUserGroup(userGroupNames);
		}

		return Promise.map(userGroupNames, doAddUserGroup, { concurrency: REQUEST_LIMIT });
	},

	// Returns no data
	addUserRole: function(userInfo, roleInfo) {
		if (!userInfo) {
			console.error('No user information provided');
		}

		if (!roleInfo) {
			console.error('No role information provided');
		}

		var getUserAction = methodRouters.getUserRouter(userInfo);
		var getRoleAction = methodRouters.getRoleRouter(roleInfo);

		function getUser() {
			return methods[getUserAction](userInfo, COMPANY_ID);
		}

		function getRole() {
			return methods[getRoleAction](roleInfo, COMPANY_ID);
		}

		function doAddUserRole(user, roleIds) {
			return methods.addUserRole(user.userId, roleIds);
		}

		return getUser().then(function(user) {
			return getRole().then(function(role) {
				var roleIds = [];

				roleIds.push(role.roleId);

				return doAddUserRole(user, roleIds);
			});
		});
	},

	// Returns an array of users
	addUser: function(numberOfUsers) {
		var bar = outputUtil.getProgressBar(numberOfUsers);
		var usersData = [];

		outputUtil.statusMessage(numberOfUsers, 'user');

		for (i = 0; i < numberOfUsers; i++) {
			usersData.push(generatorUtil.generateUserInfo());
		}

		function doAddUser(userData) {
			bar.tick();

			return methods.addUser(userData.firstName, userData.lastName, userData.screenName, userData.emailAddress, userData.male, COMPANY_ID);
		}

		return Promise.map(usersData, doAddUser, { concurrency: REQUEST_LIMIT });
	},

	getCompany: function(mailDomain) {
		return methods.getCompanyByMx(mailDomain);
	},

	getGroups: function() {
		return methods.getGroups(COMPANY_ID);
	},

	getOrganizations: function() {
		return methods.getOrganizations(COMPANY_ID);
	},

	// Returns a role object
	getRole: function(roleInfo) {
		if (!roleInfo.length) {
			console.error('Please provide role info.');
		}

		var getRoleAction = methodRouters.getRoleRouter(roleInfo);

		return methods[getRoleAction](roleInfo, COMPANY_ID).then(function(role) {
			var roles = [];

			roles.push(role);

			return roles;
		});
	},

	// Returns all roles
	getRoles: function(type) {
		type = type || "1,2,3";

		return methods.getRoles(type, COMPANY_ID).then(function(roles) {
			return roles;
		});
	},

	// If passed with user info, returns a user object
	// If passed with no user info, returns an array of user objects
	getUser: function(userInfo) {
		if (userInfo) {
			// Get Users from provided info
			var getUserAction = methodRouters.getUserRouter(userInfo);

			return methods[getUserAction](userInfo, COMPANY_ID).then(function(user) {
				var users = [];

				users.push(user);

				return users;
			});
		}
		else {
			// Get all users in the company
			return methods.getCompanyUsers(COMPANY_ID);
		}
	},

	interactive: require('./interactiveActions')
};
