import os, sys
from flask import Flask, render_template, request, redirect, url_for
from flask.ext.basicauth import BasicAuth
from werkzeug import secure_filename
from os import path
 
app = Flask(__name__)      

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['gpx'])

app.config['BASIC_AUTH_USERNAME'] = 'hawaii'
app.config['BASIC_AUTH_PASSWORD'] = 'trails'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def track_list():
  path = os.getcwd() + "/static/gpx/"
  files = []
  dirs = os.listdir( path )
  for file in dirs:
     files.append(file)
  return files
track_list = track_list()

@app.route('/')
def index():
  return render_template('layout.html', files=track_list)

basic_auth = BasicAuth(app)

@app.route('/admin')
@basic_auth.required
def admin():
  path = os.getcwd() + "/static/gpx/"
  files = []
  dirs = os.listdir( path )
  for file in dirs:
     files.append(file)
  return render_template('admin.html', files=track_list)


if __name__ == '__main__':
  app.run(debug = True)
