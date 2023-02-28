# dotnet-battle-client

this is the frontend of [this project](https://github.com/zizzhangJohn/dotnet-rpg-battle)

## Installation
Project is built with vite, you need to include `.env.development` and `.env.production` in the root for dev server and production build.
And add two environment variables to both of them

`VITE_API_URL`: \<the Base URL of your server\>

`VITE_GCLIENT_ID`: \<google web client ID\>

for web client ID, you will also need to setup redirection url and test account, refer to [official doc](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)

## Usage

```bash
# for dev server
npm run dev

# for production build
npm run build

```
