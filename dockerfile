FROM node:12

COPY ["package.json", "package-lock.json" , "/usr/src/"]

WORKDIR /usr/src 

RUN npm install
RUN npx tsc

COPY [".", "/usr/src/"]

EXPOSE 4000

