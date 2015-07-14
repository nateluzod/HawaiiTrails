from flask import Flask, render_template
from flask.ext.basicauth import BasicAuth
import os, sys
from os import path
 
app = Flask(__name__)      

app.config['BASIC_AUTH_USERNAME'] = 'hawaii'
app.config['BASIC_AUTH_PASSWORD'] = 'trails'


@app.route('/')
def index():
  path = os.getcwd() + "/static/gpx/"
  files = []
  dirs = os.listdir( path )
  for file in dirs:
     files.append(file)
  return render_template('layout.html', files=files)

basic_auth = BasicAuth(app)

@app.route('/admin')
@basic_auth.required
def admin():
  path = os.getcwd() + "/static/gpx/"
  files = []
  dirs = os.listdir( path )
  for file in dirs:
     files.append(file)
  return render_template('admin.html', files=files)

if __name__ == '__main__':
  app.run(debug = True)
