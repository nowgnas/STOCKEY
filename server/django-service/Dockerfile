# Use an official Python runtime as the base image
FROM python:3.10.10
ENV PYTHONUNBUFFERED = 1

RUN apt-get -y update
RUN mkdir /app

# Set the working directory to /app
WORKDIR /app

COPY requirements.txt /app/

# Install required packages
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose the port 7777
EXPOSE 8000

# Run the command to start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]