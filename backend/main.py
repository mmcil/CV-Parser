from os import path, makedirs
from types import MethodType
from flask import *
from pyresparser import ResumeParser
import uuid
import json

app = Flask(__name__)


@app.route("/pdf-upload", methods=['POST'])
def file_upload():
    newFile = open("tmp.pdf", "wb")
    newFile.write(request.data)
    newFile.close()
    processed_json = ResumeParser("tmp.pdf").get_extracted_data()
    if not path.exists('db'):
        makedirs('db')
    myId = str(uuid.uuid4())
    resultJson = open ("db/" + myId + ".json", "w")
    resultJson.write(json.dumps(processed_json, indent=4))
    resultJson.close()
    return myId




app.run()
