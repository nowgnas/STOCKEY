# Use a node image as the base image
FROM node:18
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files to the working directory
COPY frontend/package*.json ./
# Install the dependencies
RUN npm install --force
# Copy the rest of the source code to the working directory
COPY frontend/. .
# Build the React app
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
# Copy the Nginx configuration file to the appropriate location
COPY frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
