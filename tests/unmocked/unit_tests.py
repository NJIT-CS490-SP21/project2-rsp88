import unittest
import os
import sys

# This lets you import from the parent directory (one level up)
sys.path.append(os.path.abspath('../../'))
from app import on_result
import models

KEY_INPUT = "input"
KEY_EXPECTED = "expected"

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {'winner': 'Raj', 'loser': 'test'},
                KEY_EXPECTED: [102, 98]
            },
            {
                KEY_INPUT: {'winner': 'test', 'loser': 'test2'},
                KEY_EXPECTED: [99, 99]
            },
            {
                KEY_INPUT: {'winner': 'test2', 'loser': 'Raj'},
                KEY_EXPECTED: [99, 100]
            },
        ]

    def test_success(self):
        for test in self.success_test_params:
            actual_result = on_result(test[KEY_INPUT])
            print('actual_result: ', actual_result)
            expected_result = test[KEY_EXPECTED]
            print('expected_result ', expected_result)
            self.assertGreater(actual_result[0], expected_result[0])
            self.assertLess(actual_result[1], expected_result[1])

if __name__ == '__main__':
    unittest.main()