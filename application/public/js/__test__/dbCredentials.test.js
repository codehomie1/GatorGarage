require('dotenv').config();

describe('Environment Variable Credentials Test', () => {
  it('should have the correct DB_HOST', () => {
    expect(process.env.DB_HOST).toEqual("146.190.175.19");
  });

  it('should have the correct DB_USER', () => {
    expect(process.env.DB_USER).toEqual("team6user");
  });

  it('should have the correct DB_PASSWORD', () => {
    expect(process.env.DB_PASSWORD).toEqual("Team6#!@");
  });
});