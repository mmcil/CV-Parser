from os import path, makedirs
from types import MethodType
from flask import *
from pyresparser import ResumeParser
import uuid
import json

app = Flask(__name__)

@app.route("/pdf-upload", methods=['POST'])
def file_upload():
    file = request.files['file']
    file.save("tmp.pdf")
    processed_json = ResumeParser("tmp.pdf").get_extracted_data()
    if not path.exists('db'):
        makedirs('db')
    db_item_id = str(uuid.uuid4())
    result_json = open ("db/" + db_item_id + ".json", "w")
    result_json.write(json.dumps(processed_json, indent=4))
    result_json.close()

    response = jsonify({'some': 'data'})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

app.run()
