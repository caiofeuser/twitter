from .serializers import NoteSerializer, LikeSerializer, UserSerializer, CommentSerializer, FollowSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view
from .models import Note, Like, Comment, Follow




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    notes = Note.objects.all().order_by('-id')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLikes(request):
    user = request.user
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getComments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getFollows(request):
    follows = Follow.objects.all()
    serializer = FollowSerializer(follows, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNotes(request):
    user = request.user
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLikes(request):
    user = request.user
    serializer = LikeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addComments(request):
    user = request.user
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFollows(request):
    user = request.user
    serializer = FollowSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateNotes(request, pk):
    user = request.user
    note = user.note_set.get(id=pk)
    serializer = NoteSerializer(instance=note, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateLikes(request, pk):
    user = request.user
    like = user.like_set.get(id=pk)
    serializer = LikeSerializer(instance=like, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

# olhar com atenção aqui 
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFollows(request, pk):
    user = request.user
    follow = Follow.objects.get(following=user,id=pk)
    serializer = FollowSerializer(instance=follow, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteNotes(request, pk):
    user = request.user
    note = user.note_set.get(id=pk)
    note.delete()
    return Response('Note was deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteLikes(request, pk):
    user = request.user
    like = user.like_set.get(id=pk)
    like.delete()
    return Response('Like was deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComments(request, pk):
    user = request.user
    comment = user.comment_set.get(id=pk)
    comment.delete()
    return Response('Comment was deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFollows(request, pk):
    user = request.user
    follow = user.follow_set.get(id=pk)
    follow.delete()
    return Response('Follow was deleted')


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)
