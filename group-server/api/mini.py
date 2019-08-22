# coding: utf-8

from flask import Blueprint
from flask import request

import miniQuery

mini = Blueprint('mini', __name__)


@mini.route('/login', methods=['GET'])
def login():
    return miniQuery.login(request)


@mini.route('/update-user-info', methods=['POST'])
def update_user_info():
    return miniQuery.update_user_info(request)
