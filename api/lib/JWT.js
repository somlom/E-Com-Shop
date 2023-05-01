import {verify, sign} from 'jsonwebtoken';

export const verify_token = async (token = '') => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    if (decoded) {
      return {status: true, data: decoded};
    } else {
      return {status: false, data: 'Invalid token'};
    }
  } catch (error) {
    return {status: false, data: error};
  }
};

export const get_token = (data, expiresIn = '') => {
  const signed_token = sign(
    {payload: data},
    process.env.JWT_SECRET,
    expiresIn.length === 0 ? {expiresIn: '1h'} : {expiresIn: expiresIn}
  );
  return signed_token;
};
