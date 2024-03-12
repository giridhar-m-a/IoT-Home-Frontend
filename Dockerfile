FROM node:17

WORKDIR /src/Frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install

COPY . .

# Build the React app for production
#RUN npm run build

EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
