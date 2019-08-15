# coding: utf-8

from flask import Flask
from flask_sockets import Sockets

from views.todos import todos_view
from api.mini import mini
from common.response import BadRequest

app = Flask(__name__)
sockets = Sockets(app)

# 动态路由
app.register_blueprint(todos_view, url_prefix='/todos')
app.register_blueprint(mini, url_prefix='/mini')


@app.errorhandler(BadRequest)
def handle_bad_request(error):
    response = error.to_json()
    response.status_code = error.status_code
    return response


@app.route('/')
def index():
    return '<center><h1>WECOME！！</h1></center>'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)