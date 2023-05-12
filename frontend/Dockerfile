# Use a node image as the base image
FROM node:18 AS build
# Set the working directory
WORKDIR /app
# Copy the package.json and package-lock.json files to the working directory
COPY frontend/package*.json ./
# Install the dependencies
RUN npm install
# Copy the rest of the source code to the working directory
COPY frontend/. .
# Build the React app
RUN npm run build

# Stage 2: Use the nginx image as the base image
FROM nginx:alpine

# Install Certbot and its dependencies
RUN apk update && \
    apk add certbot certbot-nginx && \
    rm -rf /var/cache/apk/*

# Copy the Nginx configuration file to the appropriate location
COPY frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the existing Nginx configuration files to the appropriate location
COPY /etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY /etc/nginx/conf.d/custom.conf /etc/nginx/conf.d/custom.conf

# Copy the built React app to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy existing Let's Encrypt SSL certificates to the appropriate location
COPY --from=0 /etc/letsencrypt /etc/letsencrypt

# Expose ports 80 (HTTP) and 443 (HTTPS)
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
