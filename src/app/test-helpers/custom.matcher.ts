import MatchersUtil = jasmine.MatchersUtil;
import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

export const CustomMatchers: CustomMatcherFactories = {
  toBeEqualWithMessage: function (util: MatchersUtil, customEqualityTester: CustomEqualityTester[]): CustomMatcher {
    return {
        compare: function (actual: any, expected: any): CustomMatcherResult {
            if (actual === expected) {
                return {
                    pass: true,
                    message: 'Expected ' + actual + ' to be ' + expected + ': test passed'
                };
            }
            else {
                return {
                    pass: false,
                    message: 'Expected ' + actual + ' to be ' + expected + ': test failed'
                };
            }
        }
    };
  }
};
