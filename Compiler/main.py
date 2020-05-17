import os
import sys
import time
import shutil
from io import StringIO
from flask import Response, json, jsonify
from werkzeug.utils import secure_filename
from google.cloud import storage


# str(sys.version_info[0])

USER_ID = 'userId'
PROBLEM_ID = 'problemId'
INPUT_CODE = 'inputCode'
INPUT_FILE = 'inputFile'
ALLOWED_EXTENSIONS = {'py'}
# UPLOAD_FILE_PATH = './temp'

GC_PROJECT = 'cc-deny-271616'
GC_BUCKET = 'compy'
GC_COMPILER_PATH = 'Compiler'


def reject(status, message, mime_type=None):
    if mime_type is None:
        mime_type = 'application/json'
        message = json.dumps({'message': message})
    response = Response(response=message, status=status, mimetype=mime_type)
    return response


def run(code):
    """
    @note:
    if __name__ == '__main__' can not be used in this method
    """

    # old_stdout = sys.stdout
    sys.stdout = buffer = StringIO()
    t = time.time()
    # time.sleep(0)
    exec(code)
    # sys.stdout = old_stdout
    duration = time.time() - t

    return buffer.getvalue(), duration


def compile_code(request):
    """
    @production
    gcloud functions deploy compile_code --runtime python37 --trigger-http --allow-unauthenticated

    @debug
    functions-framework --target=compile_code
    """

    if request.method != 'POST':
        return reject(404, 'Only POST http request are accepted!')

    content_type = request.headers['content-type']
    if content_type != 'application/json':
        return reject(404, 'Only JSON data is accepted!')

    request = request.get_json(silent=True)
    keys = [PROBLEM_ID, INPUT_CODE, USER_ID]

    if request is None:
        return reject(404, 'Invalid JSON')

    for key in keys:
        if key not in request:
            return reject(404, 'Key {} not found!'.format(key))

    user_id = request[USER_ID]
    problem_id = request[PROBLEM_ID]
    code = request[INPUT_CODE]

    output, duration = run(code)

    response = {
        # PROBLEM_ID: problem_id,
        'output': output,
        'time': '{:.3f} ms'.format(duration)
    }

    return jsonify(response)


def compile_file(request):
    """
    @production
    gcloud functions deploy compile_file --runtime python37 --trigger-http --allow-unauthenticated

    @debug
    functions-framework --target=compile_file
    """

    def allowed_file(filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    def upload_file(file, user_id):
        storage_client = storage.Client.from_service_account_json('sa.json')
        bucket = storage_client.get_bucket(GC_BUCKET)
        blob = bucket.blob("/".join([GC_COMPILER_PATH, user_id, 'tmp', file.filename]))
        blob.upload_from_file(file)
        return blob

    if request.method != 'POST':
        return reject(404, 'Only POST http request are accepted!')

    keys = [PROBLEM_ID, USER_ID]

    for key in keys:
        if key not in request.form:
            return reject(404, 'Key {} not found!'.format(key))

    if len(request.files) == 0 or INPUT_FILE not in request.files:
        return reject(404, 'Key {} not found!'.format(INPUT_FILE))

    user_id = request.form[USER_ID]
    problem_id = request.form[PROBLEM_ID]
    file = request.files[INPUT_FILE]
    if not file:
        return reject(400, 'No file selected!')

    if file.filename == '':
        return reject(400, 'File {} must have a name!'.format(file.filename))

    if not allowed_file(file.filename):
        return reject(400, 'File {} type not allowed!'.format(file.filename))

    # Local, old fashion stuff

    # if not os.path.exists(UPLOAD_FILE_PATH):
    #     os.mkdir(UPLOAD_FILE_PATH)
    # file_name = secure_filename(file.filename)
    # file_path = os.path.join(UPLOAD_FILE_PATH, file_name)
    # file.save(file_path)
    #
    # output, duration = run(open(file_path).read())
    #
    # shutil.rmtree(UPLOAD_FILE_PATH)
    #
    # response = {
    #     # PROBLEM_ID: problem_id,
    #     'output': output,
    #     'time': '{:.3f} ms'.format(duration)
    # }
    #
    # return jsonify(response)

    # Google Cloud Storage

    blob = upload_file(file, user_id)
    code = blob.download_as_string()
    output, duration = run(code)

    response = {
        # PROBLEM_ID: problem_id,
        'output': output,
        'time': '{:.3f} ms'.format(duration)
    }

    blob.delete()

    return jsonify(response)
