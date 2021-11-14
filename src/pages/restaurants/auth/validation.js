const validation = {
  email: {
    /* presence: {
      message: '^Please enter an email address',
    }, */
    email: {
      message: '^Please enter a valid email address',
    },
  },

  password: {
    /* presence: {
      message: '^Please enter a valid password',
    }, */
    length: {
      minimum: 8,
      message: '^Please enter a valid password',
    },
  },
}

export default validation
