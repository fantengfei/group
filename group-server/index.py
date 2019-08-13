# -*- coding: utf-8 -*-
"""
    index.py
    ~~~~~~~~~

    :copyright: (c) 2019 - 8 - 13 by taffy.
"""

from flask import Flask, request, render_template

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return '<center><h1>WELCOME!!</h1></center>'



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
