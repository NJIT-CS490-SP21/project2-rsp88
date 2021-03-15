import unittest
from unittest.mock import patch
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import user_not_inDB
from app import user_scoreboard
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = 'user1'

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: 'Raj',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Raj'],
                
            },
            {
                KEY_INPUT: 'joe',
                KEY_EXPECTED: [INITIAL_USERNAME, 'joe'],
            },
            {
                KEY_INPUT: 'Biden',
                KEY_EXPECTED: [INITIAL_USERNAME, 'Biden'],
            },
            {
                KEY_INPUT: 'diana',
                KEY_EXPECTED: [INITIAL_USERNAME, 'diana'],
            },
        ]
        
        initial_person = models.Person(username=INITIAL_USERNAME)
        self.initial_db_mock = [initial_person]
    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_person_query_all(self):
        return self.initial_db_mock
    
    def test_success(self):
        for test in self.success_test_params:
            with patch('app.DB.session.add', self.mocked_db_session_add):
                with patch('app.DB.session.commit', self.mocked_db_session_commit):
                    # with patch('models.Person.query') as mocked_query:
                    #     mocked_query.all = self.mocked_person_query_all
    
                        #print(self.initial_db_mock)
                    actual_result = user_not_inDB(test[KEY_INPUT])
                    print('actual_result: ' , actual_result)
                    expected_result = test[KEY_EXPECTED]
                    #print(self.initial_db_mock)
                    print('expected_result' , expected_result)
                    
                    #self.assertEqual(len(actual_result), len(expected_result))
                    self.assertEqual(actual_result, expected_result[-1])
                    self.assertIn(actual_result, expected_result)
                    self.assertNotEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()