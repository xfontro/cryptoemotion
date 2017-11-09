FROM python

RUN mkdir -p /app
WORKDIR /app

RUN pip install nltk
RUN pip install flask

COPY . /app

EXPOSE 9000

CMD [ "python", "app.py" ]