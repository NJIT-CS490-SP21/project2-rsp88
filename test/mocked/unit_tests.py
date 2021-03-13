import unittest 
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../'))
from app import on_join
import models

inputKey = "input"
expect = "expect"
name = "user"

class addUser(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                inputKey: 'Raj',
                expect: [name, 'Raj'],
            }    
        ]
        
    def testFix(self):
        for test in self.test_param:
            result = on_join(test[inputKey])
            expect_result = test[expect]
            
            self.assertEqual(len(result), len(expect_result))
            self.assertEqual(len(result[i], expect_result[i]))
        
    if __name__ == '__main__':
        unittest.main()