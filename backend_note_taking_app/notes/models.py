from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class AudioRecording(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, related_name="audio_recordings")
    audio_file = models.FileField(upload_to='audio_files/')

    def __str__(self):
        return f"Audio for {self.note.title}"
