from os import path, makedirs, listdir, truncate
from types import MethodType
from typing import Match
from flask import *
from pyresparser import ResumeParser
import uuid
import json

app = Flask(__name__)


@app.route("/pdf-upload", methods=['POST'])
def file_upload_endpoint():
    file = request.files['file']
    file.save("tmp.pdf")
    processed_json = ResumeParser("tmp.pdf").get_extracted_data()
    if not path.exists('db'):
        makedirs('db')
    db_item_id = str(uuid.uuid4())
    result_json = open("db/" + db_item_id + ".json", "w")
    result_json.write(json.dumps(processed_json, indent=4))
    result_json.close()

    response = jsonify({'id': db_item_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/search", methods=['POST'])
def search_endpoint():
    result = perform_search(request.json)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def string_contains(big, little):
    return little.lower() in big.lower()


def contains_property(document, criteria_key, criteria_value):
    if isinstance(document, str):
        return string_contains(document, criteria_value)
    if (criteria_key in document) == False:
        return False
    if isinstance(document[criteria_key], str):
        return string_contains(document[criteria_key], criteria_value)
    if isinstance(document[criteria_key], list):
        for item in document[criteria_key]:
            if contains_property(item, criteria_key, criteria_value):
                return True
        return False
    raise Exception("db error")


def document_matches(document, criteria):
    matched_criteria_count = 0
    for criteria_item in criteria:
        if contains_property(document, criteria_item, criteria[criteria_item]):
            matched_criteria_count += 1
    return 100 * matched_criteria_count / len(criteria)


def perform_search(criteria):
    if not path.exists('db'):
        makedirs('db')

    matched_json = []
    matched_id = []
    match_score = []

    for file_name in listdir("db"):
        file = open("db/" + file_name, 'r')
        data_json = json.loads(file.read())
        file.close()

        score = document_matches(data_json, criteria)
        if score <= 0.1:
            continue

        matched_id.append(file_name)
        matched_json.append(data_json)
        match_score.append(score)

    for i in range(0, len(matched_json)):
        matched_json[i]["_score"] = match_score[i]
        matched_json[i]["_id"] = matched_id[i][:36]

    matched_json.sort(reverse=True, key=lambda x: int(x["_score"]))
    return matched_json


app.run()
