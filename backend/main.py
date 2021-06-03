from os import path, makedirs, listdir
from flask import *
from pyresparser import ResumeParser
import uuid
import json

app = Flask(__name__)


@app.route("/pdf-view", methods=['GET'])
def file_view_endpoint():
    resume_id = request.args.get("resume-id")
    pdf_file = open("resume/" + resume_id + ".pdf", "rb")
    pdf = pdf_file.read()
    pdf_file.close()
    response = make_response(pdf)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Content-Type", "application/pdf")
    return response


@app.route("/pdf-upload", methods=['POST'])
def file_upload_endpoint():
    file = request.files['file']
    db_item_id = str(uuid.uuid4())
    create_dir_if_not_exists("resume")
    file.save("resume/" + db_item_id + ".pdf")
    processed_json = ResumeParser(
        "resume/" + db_item_id + ".pdf").get_extracted_data()
    create_dir_if_not_exists("db")
    result_json = open("db/" + db_item_id + ".json", "w")
    result_json.write(json.dumps(processed_json, indent=4))
    result_json.close()

    response = jsonify({'id': db_item_id})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/search", methods=['OPTIONS'])
def search_endpoint_options():
    response = jsonify("")
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    return response


@app.route("/search", methods=['POST'])
def search_endpoint():
    result = perform_search(request.json)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def create_dir_if_not_exists(dir_name):
    if not path.exists(dir_name):
        makedirs(dir_name)


def string_contains(big, little):
    return little.lower() in big.lower()


def contains_property(document, criteria_key, criteria_value):
    if document == None:
        return False
    if isinstance(document, str):
        return criteria_value in document
    if (criteria_key in document) == False:
        return False
    if document[criteria_key] == None:
        return False
    if isinstance(document[criteria_key], str):
        return criteria_value in document[criteria_key]
    if isinstance(document[criteria_key], (int, float)):
        return document[criteria_key] > float(criteria_value)
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

    if criteria["total_experience"] == "":
        criteria["total_experience"] = 0

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
