from facenet_pytorch import MTCNN, InceptionResnetV1
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from scipy import spatial
from sklearn.decomposition import PCA
#import dlib
#import cv2
import pickle

mtcnn = MTCNN()

resnet = InceptionResnetV1(pretrained='vggface2').eval()

def preprocessing(photo):
    image = Image.open(photo)
    image_cropped = mtcnn(image)
    image_embedding = resnet(image_cropped.unsqueeze(0)).flatten().detach().numpy()
    return image_embedding

def similarity(image_embedding, db_image_embedding):
    similarity = 1 - spatial.distance.cosine(image_embedding, db_image_embedding)
    return similarity

model_data = {
    'mtcnn': mtcnn,
    'resnet': resnet,
    'preprocessing': preprocessing,
    'similarity': similarity,

}

with open('Face Recognition Model\FaceNet.pkl', 'wb') as f:
    pickle.dump(model_data, f)