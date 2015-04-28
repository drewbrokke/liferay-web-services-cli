# Liferay Web Services CLI
A command-line interface for [Liferay's JSON Web Services](https://www.liferay.com/api/jsonws).

It is currently *master only*.

## What it is
During development and debugging of the master branch, I got very tired of having to repeatedly:
- Create a user
- Create a role
- Assign the role to the user

I mostly wanted to see if I could get that process down to a single command in the shell (success!). This is useful for me personally, but I would like to see broader and more useful functionality added.

**Current functionality:**
- Create users, roles, user groups, sites, site pages, and organizations
- Get a single user or all users' information
- Get a single role's information
- Quickly create a user and a role, then assign the role to the user
- Quickly create a site populated with users

**Todo list:**
- Compatibility with 6.2.x and 6.1.x
- Add portlets to pages
- Interactive mode to manually add a user with specific information rather than generated info
- Interactively edit and update user and site info
- Compatibility with a plugin system - devs can add their own commands, actions and workflows.

Please let me know of any actions or features you would find useful.  There's a lot of methods in the JSONWS api, so it may take a while to add all the possible use-cases.  Suggestions help me know where the interest is.  Also, feel free to fork the repo and contribute.

## Installing
```
npm install -g liferay-web-services-cli
```

## Usage
```
lws <command> [options]
```

**Note:**
If after updating you are getting an error like this one:
```
ERROR:  { [Error: getaddrinfo ENOTFOUND undefined]
  code: 'ENOTFOUND',
  errno: 'ENOTFOUND',
  syscall: 'getaddrinfo',
  hostname: 'undefined' }
```
Simply delete `~/.lws.json` or edit it and change all the `domain` keys to `host` (e.g. `"domain": "localhost"` changes to `"host": "localhost"`).

**Examples:**
```
# Adds a new user
lws add user
lws add u               ('user' is aliased to 'u')
lws add user 20         (adds 20 users.  You can add as many as you want)

# Gets an existing user
lws get user 12345                      (get a user by user id)
lws get u userScreenName                (get a user by screen name)
lws get user useremail@usermail.com     (get a user by email address)
lws get user                            (returns the information for all users)

# Adds a new role
lws add role
lws add r               ('role' is aliased to 'r')
lws add role -t site    (adds a site role)
lws add r 3             (Adds 3 regular roles)

# Creates a new user, a new role, and assigns the role to the user
lws add user-role 
lws add ur          ('user-role' is aliased to 'ur')

# Assigns a specific role to a specific user
lws aur -u 12345 -r 54321

# Groups (sites)
lws add group           (aliased to 'g')

# Creates a site and populates it with users
lws add group-user      (aliased to 'gu')

# And more - 
lws add layout          (aliased to 'l') 
lws add organization    (aliased to 'o')
lws add user-group      (aliased to 'ug')

# Gets an existing role
lws get role 12345      (roleId)
lws get role roleName

# Configure for use with additional instances of portal:
lws config
lws config add ee-6.2.x
lws config use ee-6.2.x
```

**Help:**
```
# Help can be accessed per command level
lws -h
lws add -h
lws add page -h
```

## Changes
**2.5.1**
- Reduce parallel reqest limit.  In some cases it might have caused indexing errors to send too many requests at once.

**0.2.5**
- Speed improvements - multiple items are added much faster now.
- Internal strucure changes to make the methods more flexible




