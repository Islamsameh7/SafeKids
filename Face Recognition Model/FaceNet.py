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

model_data = {
    'mtcnn': mtcnn,
    'resnet': resnet
}

with open('D:\FCAI fourth year (final year)\SafeKids\SafeKids\FaceNet.pkl', 'wb') as f:
    pickle.dump(model_data, f)