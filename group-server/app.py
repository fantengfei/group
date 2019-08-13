# coding: utf-8

from datetime import datetime

from flask import Flask
from flask import render_template
from flask_sockets import Sockets

from views.todos import todos_view

app = Flask(__name__)
sockets = Sockets(app)

# 动态路由
app.register_blueprint(todos_view, url_prefix='/todos')


# @app.route('/')
# def index():
#     return render_template('index.html')


@app.route('/')
def index():
    return '<center><h1>WECOME！！</h1></center>'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)