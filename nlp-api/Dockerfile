FROM python

RUN mkdir -p /app
WORKDIR /app

RUN pip install nltk
RUN pip install flask

COPY . /app

CMD [ "python", "app.py" ]