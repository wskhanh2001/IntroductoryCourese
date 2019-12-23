from django.db import models


class User(models.Model):
    openid = models.CharField(max_length=50, unique=True)
    nickname = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nickname


