# Liferay Web Services CLI (LWS)
A command-line interface for [Liferay's JSON Web Services](https://www.liferay.com/api/jsonws).

## Usage
```
lws --help
lws <command> --help
lws <command> <sub-command> --help
```

Example: Adding three users
```
lws add user 3
```

## Description
Liferay Web Services CLI (LWS) is a command-line tool for developers to **quickly add sample data to a Liferay instance**. It will generate dummy data (users, organizations, user-groups, roles, sites, pages) with commands like ` lws add user ` or `lws add role`.

There are also combo commands like `lws add user-role` which will create a user, create a role, then assign that role to a user.

All commands are aliased, For example, you can type `lws add o` to add a user instead of `lws add organization`. The aliases can be found in the help output.


## Passing options to commands

LWS makes it very easy to add lots of sample data quickly.  Many of the `add` commands can be given a quantity to add multiples of an item.  For example, `lws add user 50` will add 50 users to the database very quickly!

Other commands take arguments to specify details about the objects being added.  `lws add r -t site` will add a site role (whereas the default is a regular role).

You can also combine the two.  `lws add r -t site 5` will add 5 different site roles.

## Interactive mode
Some commands support the `-i` flag, which allows you to create or adjust data interactively. For example, you can add users to a site (group) using `lws add group-users -i`.  You will be prompted to first select the site, then choose available users to add to the site.

Another example would be adding a user with `lws add u -i`.  You will then be prompted for a name and other details, rather than using generated user data (though you can only create one at a time this way).


## Multiple Liferay instances
LWS supports switching between different Liferay instances.  You can set up LWS for use with a different instance using the `lws config` command.  This will allow you to configure the username, password, hostname, and port you use for each instance.

`lws config use` will switch which instance LWS interacts with.


## More Examples
**Add 5 groups:**
```
lws add group 5
lws add g 5
```

**Add 20 users:**
```
lws add u 20
```

**Add a group, then a user, then assign the user to the group:**
```
lws add gu
```

**Add users to a site (group) interactively**
```
lws add gu -i
```

**Get all users:**
```
lws get u
```


## Changes

**0.3.0**
- Returned data is now displayed in a table.  It's much easier to read than before.
- Fixed several bugs having to do with changing configurations.
- Updated the configuration schema to now properly handle different portal instances with different mail domains.  Now when creating users, they will not all be `@liferay.com`, but will follow the instance's mail domain.

**0.2.8**
- The companyId is now automatically detected and updated if different than the configuration.

**0.2.6**
- Adds an interactive mode for many of the commands using the `-i` flag!
- Lots of internal restructuring to prepare for plugins support

**0.2.52**
- Reduce parallel request limit.  In some cases it might have caused indexing errors to send too many requests at once.

**0.2.5**
- Speed improvements - multiple items are added much faster now.
- Internal structure changes to make the methods more flexible
