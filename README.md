# Liferay Web Services CLI
A command-line interface for [Liferay's JSON Web Services](https://www.liferay.com/api/jsonws).

This is a VERY early development build, and is really nothing more than a proof-of-concept at the moment. It is written with development, not production, in mind.

It is currently *master only*.

## What it is (and isn't)
During development and debugging of the master branch, I got very tired of having to repeatedly:
- Create a user
- Create a role
- Assign the role to the user

I mostly wanted to see if I could get that process down to a single command in the shell (success!). This is useful for me personally, but I would like to see broader and more useful functionality added.

I plan on adding more actions:
- Adding sites, site members, and site pages
- Adding user groups
- Adding Organizations and members
- And hopefully more...

If you happen to look through the source code and have an idea or suggestion for improvement, please open a Github issue or send a pull request.

## Installing
```
npm install -g liferay-web-services-cli
```

## Usage
```
lws <command> [options]
```

**Examples:**
```
# Adds a new user
lws au

# Adds x new users
lws au 20

# Gets an existing user
lws gu 12345 (userId)
lws gu userScreenName
lws gu useremail@usermail.com

# Adds a new role
lws ar

# Adds x new roles
lws ar 3

# Adds a new role of type 2 (site role)
lws ar -t 2

# Gets an existing role
lws gr 12345 (roleId)
lws gr roleName

# Creates a new user, a new role, and assigns the role to the user
lws aur

# Assigns a specific role to a specific user
lws aur -u 12345 -r 54321
```

**Help:**
```
lws -h
```






