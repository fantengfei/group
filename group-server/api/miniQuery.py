# coding: utf-8

from leancloud import Query
from leancloud import LeanCloudError

from flask import jsonify

import requests
import json

from common.response import BadRequest
from models import UserInfo, UserSession


def login(req):
    try:
        code = req.headers['code']
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


def update_user_info(req):
    try:
        data = json.loads(req.get_data())
        content = data['content']
        # print data
        if 'openID' not in data:
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
