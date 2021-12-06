module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3a0c27174504048a85281438b0afafc0'),
  },
});
