from rest_framework import serializers
from .models import Note, AudioRecording

class AudioRecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioRecording
        fields = '__all__'

    def validate(self, attrs):
        if 'audio_file' not in attrs or 'note' not in attrs:
            raise serializers.ValidationError("Audio file and note ID must be provided.")
        return attrs

class NoteSerializer(serializers.ModelSerializer):
    audio_recordings = AudioRecordingSerializer(many=True, read_only=True)

    class Meta:
        model = Note
        fields = ['id', 'title', 'description', 'created_at', 'audio_recordings']
