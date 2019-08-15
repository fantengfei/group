# coding: utf-8

from flask import Blueprint
from flask import request
from flask import jsonify

import urllib
import json

from common.response import BadRequest


mini = Blueprint('mini', __name__)


@mini.route('/login', methods=['POST'])
def login():
    try:
        code = request.form['code']
        _url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4ce6fa524f8594c3&' \
               'secret=a12ea3c16ce994903920c36ddfab646d&js_code=%s&grant_type=authorization_code' % code
        result = urllib.urlopen(_url)
        j = json.load(result)
        openid = j['openid']
    except Exception:
        raise BadRequest('openid get failure')
    else:
        return jsonify({'openid': openid})
