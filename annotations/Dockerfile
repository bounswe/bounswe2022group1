FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip install mysqlclient
RUN pip install djangorestframework
RUN pip install django-cors-headers
RUN pip install django-environ
RUN pip install Pillow 
COPY . /code/