from django.db import models
from django.contrib.auth.models import User
# from users.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    tweet = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.tweet} - {self.user}'

class Like(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
  # foreing key sempre vem como um id, então é necessário criar uma realação com oo array.find( obj => ...')
  tweet = models.ForeignKey(Note, on_delete=models.CASCADE, null=True)


  def __str__(self):
    return f'{self.tweet} - {self.user}'

class Comment(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
  tweet = models.ForeignKey(Note, on_delete=models.CASCADE, null=True)
  comment = models.CharField(max_length=50)
  
  def __str__(self):
    return f'{self.comment} - {self.user} - {self.tweet}'