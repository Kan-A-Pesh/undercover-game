# Development/builder stage
FROM python:3.9-slim-buster AS dev

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5000

# Production stage
FROM dev

COPY . .
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
