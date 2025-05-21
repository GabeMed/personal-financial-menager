from datetime import timedelta

# import os

SECRET_KEY = "Just_for_testing"  # os.getenv(SECRET_KEY)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = timedelta(minutes=30)
CORS_ORIGINS = ["http://localhost:3000"]
