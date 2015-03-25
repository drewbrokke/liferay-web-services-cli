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

My current challenge is figuring out how to structure the application to make it modular and pluggable, as I have no desire to write an action for every single available web service but would *love* to allow others to add them as they need them.

If you happen to look through the source code and have an idea or suggestion for improvement, please open a Github issue or send a pull request.  This is a side project for me so response and progress will be slow, but I welcome input as I have limited experience structuring apps.

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
lws adduser

# Adds a new user with a firstName of Joseph
lws adduser -f Joseph

# Adds a new role
lws addrole

# Creates a new user, a new role, and assigns the role to the user
lws adduserrole

# Assigns a specific role to a specific user
lws adduserrole -u 12345 -r 54321
```

**Help:**
```
lws -h
```






