#!/bin/bash

mongoimport -d $MONGO_INITDB_DATABASE -c blog_tag --file /docker-entrypoint-initdb.d/blog_tag.json --jsonArray

mongoimport -d $MONGO_INITDB_DATABASE -c blog_recentnews --file /docker-entrypoint-initdb.d/blog_recentnews.json --jsonArray

mongoimport -d $MONGO_INITDB_DATABASE -c blog_post --file /docker-entrypoint-initdb.d/blog_post.json --jsonArray

mongoimport -d $MONGO_INITDB_DATABASE -c blog_categor --file /docker-entrypoint-initdb.d/blog_categor.json --jsonArray
