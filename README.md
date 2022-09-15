# starwaresources

Star Wars resource behind Login.

To install the app:

```
npm install
```

To build the app:

```
npm run build
```

To run the app locally:

```
npm run dev
```

You can run the server in production using:

```
npm run start
```

## How it works

The app asks the user to login, then if the user gives the right credentials, it fetches all of the available resources from the Star Wars API. After that, the user can search for different resources using a dropdown and and a free-text input field. If there are matches, they are displayed in a list, then the user can click on one of the matches and get to a page with all the info associated with that item.

The correct credentials for testing are:

- name: `admin`
- password: `123`

## Things that could be improved if there was more time

- `Resource` type only covers `Person`
- Router doesn't work when revisited (ideally it should check credentials then fetch the relevant assets)
- eslint is throwing errors when using `require` and `module.exports`
- handle errors in a less cluttered way (using Error Boundaries)
- credentials and API urls are not stored in `env variables
- security could be improved with better encryption of login credentials
- styling is not very exciting and Material UI could be used better
- not much variation in styling for different breakpoints
