FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install -f

ENV VITE_BASE_AUTH=http://localhost:8000/faculty/auth/
ENV VITE_BASE_ACHIEVEMENT=http://localhost:8000/faculty/actions/achievement/
ENV VITE_BASE_EXTRACURRICULAR=http://localhost:8000/faculty/actions/extracuricullar/
ENV VITE_BASE_TECHNICAL=http://localhost:8000/faculty/actions/technical/
ENV VITE_BASE_PLACEMENT=http://localhost:8000/faculty/actions/placement/

EXPOSE 2003

CMD [ "pnpm","run","dev" ]