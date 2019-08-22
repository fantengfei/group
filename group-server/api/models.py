# coding: utf-8


from leancloud import Object
from common.response import BadRequest


class UserSession(Object):
    pass


class UserInfo(Object):
    def fill(self, data):
        try:
            if isinstance(data, dict) is False:
                raise BadRequest('data is not dict in fill method')
        except Exception as e:
            raise e

        for key in data:
            self.set(key, data.get(key))
