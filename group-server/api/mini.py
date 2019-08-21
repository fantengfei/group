# coding: utf-8

from leancloud import Object
from leancloud import Query
from leancloud import LeanCloudError

from flask import Blueprint
from flask import request
from flask import jsonify

import requests
import json

from common.response import BadRequest


mini = Blueprint('mini', __name__)

class UserSession(Object):
    pass

class UserInfo(Object):
    def fill(self, data):
        self.set('phone', data.get('phone'))
        self.set('openID', data.get('openID'))
        self.set('province', data.get('province'))
        self.set('city', data.get('city'))
        self.set('avatarUrl', data.get('avatarUrl'))
        self.set('gender', data.get('gender'))
        self.set('country', data.get('country'))
        self.set('nickName', data.get('nickName'))


@mini.route('/login', methods=['GET'])
def login():
    try:
        code = request.headers['code']
        _url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx4ce6fa524f8594c3&' \
               'secret=a12ea3c16ce994903920c36ddfab646d&js_code=%s&grant_type=authorization_code' % code
        rep = requests.get(_url)
        data = rep.json()
    except Exception as e:
        raise e

    try:
        session = Query(UserSession).equal_to('openID', data['openid']).first()
    except LeanCloudError as e:
        if e.code == 101:
            session = UserSession()
        else:
            raise e

    session.set('sessionKey', data['session_key'])
    session.set('openID', data['openid'])
    try:
        session.save()
    except LeanCloudError as e:
        raise e

    return jsonify({'openid': data['openid']})


@mini.route('/update-user-info', methods=['POST'])
def update_user_info():
    try:
        data = json.loads(request.get_data())
        content = data['content']
        # print data

        if data.has_key('openID') is False:
            raise BadRequest('openID is None')

        content['openID'] = data.get('openID')
        content['phone'] = data.get('phone')
    except Exception as e:
        raise e

    try:
        info = Query(UserInfo).equal_to('openID', data['openID']).first()
    except LeanCloudError as e:
        if e.code == 101:
            info = UserInfo()
        else:
            raise e

    info.fill(content)
    try:
        info.save()
        return jsonify({'success': True})
    except LeanCloudError as e:
        raise e
















