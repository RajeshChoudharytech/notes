from rest_framework import viewsets, permissions
from .models import Note, AudioRecording
from .serializers import NoteSerializer, AudioRecordingSerializer


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AudioRecordingViewSet(viewsets.ModelViewSet):
    queryset = AudioRecording.objects.all()
    serializer_class = AudioRecordingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
