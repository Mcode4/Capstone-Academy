FROM python:3.9.18-alpine3.18


RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /var/www


ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV SECRET_KEY=ecc43f8120bd14d05889397de8275b03
ENV DATABASE_URL=postgresql://my_db_bsxp_user:oA7glqSlMMeI3D5Xtue1f2AjsGHLaGWg@dpg-cuproetumphs73eamvpg-a/my_db_bsxp
ENV SCHEMA=


COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .


CMD flask db upgrade && flask seed all && gunicorn app:app