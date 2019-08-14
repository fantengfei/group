# coding: utf-8

# from leancloud import Object
# from leancloud import Query
# from leancloud import LeanCloudError

from flask import Blueprint
from flask import request
from flask import jsonify

import urllib
import json

from response import BadRequest

mini_group = Blueprint('mini-group', __name__)


@mini_group.route('/login', methods=['POST'])
def login():
    try:
        code = request.form['code']
        _url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4ce6fa524f8594c3&secret=a12ea3c16ce994903920c36ddfab646d&js_code=%s&grant_type=authorization_code' % code
        result = urllib.urlopen(_url)
        j = json.load(result)
        openid = j['openid']
    except:
        raise BadRequest('openid get failure', 403)
    else:
        return jsonify({'openid': openid})