# Start with the official Node.js image
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN yarn -i

# Copy all files
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run npm start script
CMD ["yarn", "start"]