import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
      'antfu/no-top-level-await': 'off',
    },
  },
)
