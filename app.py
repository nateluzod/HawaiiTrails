from flask import Flask, render_template
from flask.ext.basicauth import BasicAuth
 
app = Flask(__name__)      

app.config['BASIC_AUTH_USERNAME'] = 'hawaii'
app.config['BASIC_AUTH_PASSWORD'] = 'trails'
 
@app.route('/')
def index():
  return render_template('home.html')

basic_auth = BasicAuth(app)

@app.route('/admin')
@basic_auth.required
def admin():
  return render_template('admin.html')
  
if __name__ == '__main__':
  app.run(debug = True)