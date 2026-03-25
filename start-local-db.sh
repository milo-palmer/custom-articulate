#!/bin/bash

# Configuration
CONTAINER_NAME="custom-articulate-db"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_DB="custom-articulate-db"
POSTGRES_PORT="5432"
VOLUME_NAME="custom-articulate-data"

# Function to run the container
run_container() {
    echo "Running PostgreSQL container..."
    docker volume inspect $VOLUME_NAME >/dev/null 2>&1 || docker volume create $VOLUME_NAME

    docker run --name $CONTAINER_NAME \
        -e POSTGRES_USER=$POSTGRES_USER \
        -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
        -e POSTGRES_DB=$POSTGRES_DB \
        -p $POSTGRES_PORT:$POSTGRES_PORT \
        -v $VOLUME_NAME:/var/lib/postgresql/data \
        -d postgres:17
    echo "PostgreSQL container '$CONTAINER_NAME' is running."
    echo "You can connect using: psql -h localhost -p $POSTGRES_PORT -U $POSTGRES_USER -d $POSTGRES_DB"
}

# Function to stop the container
stop_container() {
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "Stopping PostgreSQL container '$CONTAINER_NAME'..."
        docker stop $CONTAINER_NAME
    else
        echo "Container '$CONTAINER_NAME' is not running."
    fi
}

# Function to start a stopped container
start_container() {
    if [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
        echo "Starting PostgreSQL container '$CONTAINER_NAME'..."
        docker start $CONTAINER_NAME
    else
        echo "Container '$CONTAINER_NAME' does not exist. Use 'run' command first."
    fi
}

# Function to remove the container and volume
remove_container() {
    stop_container
    echo "Removing PostgreSQL container '$CONTAINER_NAME'..."
    docker rm -f $CONTAINER_NAME
    echo "Removing volume '$VOLUME_NAME'..."
    docker volume rm $VOLUME_NAME
}

# Function to check the status of the container
status_container() {
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "PostgreSQL container '$CONTAINER_NAME' is running."
        docker ps -f name=$CONTAINER_NAME
    elif [ "$(docker ps -a -q -f name=$CONTAINER_NAME)" ]; then
        echo "PostgreSQL container '$CONTAINER_NAME' is stopped."
        docker ps -a -f name=$CONTAINER_NAME
    else
        echo "PostgreSQL container '$CONTAINER_NAME' does not exist."
    fi
}

# Main logic
case "$1" in
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    start)
        start_container
        ;;
    restart)
        stop_container
        start_container
        ;;
    status)
        status_container
        ;;
    remove)
        remove_container
        ;;
    *)
        echo "Usage: $0 {run|start|stop|restart|status|remove}"
        exit 1
        ;;
esac
