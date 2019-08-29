# coding: utf-8


from leancloud import Object
from common.response import BadRequest
from flask import jsonify


class UserSession(Object):
    pass


class UserInfo(Object):
    def fill(self, data):
        """

        :param data:
        """
        try:
            if isinstance(data, dict) is False:
                raise BadRequest('data is not dict in fill method')
        except Exception as e:
            raise e

        for key in data:
            self.set(key, data.get(key))

class Tabbar(Object):
    @property
    def to_dict(self):
        """

        :return:
        """
        try:
            item = {}
            for key in self._attributes:
                item[key] = self.get(key)
        except Exception as e:
            raise e

        return item
