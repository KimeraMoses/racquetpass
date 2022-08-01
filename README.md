# Racquet Pass Frontend Setup

1- SSH into your server and navigate to /var/www/html

```sh
cd /var/www/html
```

2- Copy the repository to your server and move into the repository

```sh
git clone https://gitlab.com/m2m-node-react-projects/reactjs/racquet-pass-frontend-web.git
cd racquet-pass-frontend-web
```

3- Edit the .env file and make the changes below

| Variable                 | Type   | Description                                                                                     |
| ------------------------ | ------ | ----------------------------------------------------------------------------------------------- |
| `REACT_APP_APIKEY`       | string | API key for making requests to the backend                                                      |
| `REACT_APP_BASEURL`      | string | API URL                                                                                         |
| `REACT_APP_COUNTRY_CODE` | string | Country Code to use with phone number                                                           |
| `REACT_APP_SITE_KEY`     | string | Google Recaptcha v3 site key. See https://cloud.google.com/recaptcha-enterprise/docs/create-key |

_Example_

```
REACT_APP_APIKEY=d7715438-71aa-4c93-8eb8-a4ec9bab0768
REACT_APP_BASEURL=https://racquet-stringer-api.herokuapp.com
REACT_APP_SITE_KEY=XXXX
REACT_APP_COUNTRY_CODE=+256
```

4- Install npm modules

```sh
npm i
```

5- Build the app

```sh
npm run build
```

6- Copy the contents `/build` folder to the root of your host with Nginx/Apache and SSL.

7- Proceed to setup the API at the _REACT_APP_BASEURL_ if not done already.

# End
