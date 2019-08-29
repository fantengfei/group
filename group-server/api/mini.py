# coding: utf-8

from flask import Blueprint
from flask import request

from api.query import miniQuery

mini = Blueprint('mini', __name__)


@mini.route('/login', methods=['GET'])
def login():
    return miniQuery.login(request)


@mini.route('/update-user-info', methods=['POST'])
def update_user_info():
    return miniQuery.update_user_info(request)

@mini.route('/get-tab-bar', methods=['GET'])
def get_tab_bar():
    return miniQuery.get_tab_bar()
