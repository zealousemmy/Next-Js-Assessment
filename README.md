## Setup Instructions 
  Install dependencies using npm install

## Set up environment variables
  Create a .env file in the root with the following 
  DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

## Push schema to the database:
   npx prisma db push

## Seed the database
  npx prisma db seed

## Start the app
  npm run dev

