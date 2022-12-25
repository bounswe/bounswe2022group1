from rest_framework import generics, permissions, status, generics
from rest_framework.response import Response
from .serializers import *
from rest_framework.views import APIView




class AnnotationApiView(APIView):
    serializer_class = AnnotationSerializer
    
    def get(self, request, *args, **kwargs):
        try:
            content_id_req = int(request.GET.get('content_id'))
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            annotations = Annotation.objects.filter(content_id=content_id_req)
            serializer = self.serializer_class(annotations, many=True)
            return Response({"data": serializer.data}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
            
        

   
    def post(self, request, *args, **kwargs):

        data = request.data.copy()
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def patch(self, request, *args, **kwargs):
        data = request.data.copy()

        try:
            annotation_id = int(data['id'])
        except:
            return Response({"error": "given id is not an integer"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            annotation = Annotation.objects.get(id=annotation_id)
        except:
            return Response({"error": "given id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)


        
        if 'annotation_string' not in data:
            data['annotation_string'] = annotation.annotation_string
        if 'content_id' not in data:
            data['content_id'] = annotation.content_id
        
        print(data)


        serializer = self.serializer_class(annotation, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class deleteAnnotationAPIView(APIView):
    serializer_class = AnnotationSerializer

    def post(self, request, *args, **kwargs):
        try:
            annotation_id = int(request.data.get('id'))
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            record = Annotation.objects.get(id=annotation_id)
            record.delete()
            serializer = self.serializer_class(record)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"message": "given annotation id doesn't exist"}, status=status.HTTP_400_BAD_REQUEST)
