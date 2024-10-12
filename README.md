Build your docker image:

```sh
PROJECT=$(basename `pwd`) && docker image build -t $PROJECT-image . --build-arg user_id=`id -u` --build-arg group_id=`id -g`
```

And run it:

```sh
docker container run -d --rm --init -p 3000:3000 -e NODE_ENV=development --mount type=bind,src=`pwd`,dst=/app --mount type=bind,src=$HOME/.gitconfig,dst=/home/developer/.gitconfig --name $PROJECT-container $PROJECT-image
```

Run the following commands inside the Docker containers as needed:

```sh
npm ci
npm run start -w packages/ps-tree
npm run start -w packages/hello-npmjs
npm run test -ws --if-present
```
