export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
    shouldLogin: true,
  },

  locked: {
    username: "locked_out_user",
    password: "secret_sauce",
    shouldLogin: false,
    expectedErrorMessage: "Epic sadface: Sorry, this user has been locked out.",
  },

  problem: {
    username: "problem_user",
    password: "secret_sauce",
    shouldLogin: true,
  },

  performace_glitch: {
    username: "performance_glitch_user",
    password: "secret_sauce",
    shouldLogin: true,
  },

  erroruser: {
    username: "error_user",
    password: "secret_sauce",
    shouldLogin: true,
  },

  visual: {
    username: "visual_user",
    password: "secret_sauce",
    shouldLogin: true,
  },
};
