from rest_framework import serializers
from .models import Note, AudioRecording


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'created_at']


class AudioRecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioRecording
        fields = ['id', 'note', 'audio_file']
